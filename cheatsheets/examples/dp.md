# Dynamic Programming — 經典題速查

---

## DP 1D

### LC 300 Longest Increasing Subsequence

給定一個未排序的整數陣列，找出最長嚴格遞增子序列的長度。

**關鍵洞察**：維護一個 `tails` 陣列，`tails[i]` 代表長度為 `i+1` 的遞增子序列的最小結尾值。對每個元素用 `bisect_left` 找插入位置——若在末尾則延長子序列，否則替換以維持最小結尾。

```python
from bisect import bisect_left

def lengthOfLIS(nums: list[int]) -> int:
    tails = []
    for x in nums:
        pos = bisect_left(tails, x)
        if pos == len(tails):
            tails.append(x)
        else:
            tails[pos] = x
    return len(tails)
```

---

## 0/1 Knapsack

### LC 416 Partition Equal Subset Sum

給定一個正整數陣列，判斷能否將其分成兩個子集，使兩者元素和相等。

**關鍵洞察**：轉化為 0/1 背包問題——目標為 `sum/2`，用一維 boolean DP。**必須反向迭代**，否則同一輪會重複使用同一個元素。

```python
def canPartition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2:
        return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for x in nums:
        for j in range(target, x - 1, -1):
            dp[j] = dp[j] or dp[j - x]
    return dp[target]
```

---

## 線性指派 DP

### LC 1478 Allocate Mailboxes

給定 `houses` 陣列（各房子在數線上的位置）和整數 `k`，放置 `k` 個信箱使所有房子到最近信箱的距離總和最小。

**關鍵洞察**：先排序 houses。一個信箱服務一段連續房子時，放在中位數位置可最小化絕對偏差總和。預計算任意區段 `cost[i][j]`，再用 `dp[i][j]` = 前 `i` 間房子分配 `j` 個信箱的最小成本，枚舉最後一個信箱服務的起點。

```python
def minDistance(houses: list[int], k: int) -> int:
    houses.sort()
    n = len(houses)
    cost = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(i, n):
            mid = houses[(i + j) // 2]
            cost[i][j] = sum(abs(houses[x] - mid) for x in range(i, j + 1))

    INF = float('inf')
    dp = [[INF] * (k + 1) for _ in range(n + 1)]
    dp[0][0] = 0
    for i in range(1, n + 1):
        for j in range(1, min(i, k) + 1):
            for s in range(j, i + 1):
                dp[i][j] = min(dp[i][j], dp[s - 1][j - 1] + cost[s - 1][i - 1])
    return dp[n][k]
```

---

## Game Theory / Minimax

### LC 486 Predict the Winner

兩個玩家輪流從陣列的左端或右端取數，取完後分數較高者獲勝。判斷先手是否能贏（或平手）。

**關鍵洞察**：區間 DP，`dp[i][j]` 定義為「當前玩家在 `nums[i..j]` 範圍內能取得的最大淨分差」。取左邊得 `nums[i] - dp[i+1][j]`，取右邊得 `nums[j] - dp[i][j-1]`，取 max。先手贏的條件是 `dp[0][n-1] >= 0`。

```python
def predictTheWinner(nums: list[int]) -> bool:
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    for i in range(n):
        dp[i][i] = nums[i]
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = max(nums[i] - dp[i + 1][j],
                           nums[j] - dp[i][j - 1])
    return dp[0][n - 1] >= 0
```

---

## 區間 DP

### LC 312 Burst Balloons

給定一列氣球各有分數，戳破氣球 `i` 可得 `nums[left] * nums[i] * nums[right]`（left/right 為相鄰未戳破的氣球）。求戳破所有氣球能獲得的最大硬幣數。

**關鍵洞察**：反向思考——枚舉區間內**最後**被戳破的氣球 `k`，這樣 `k` 左右兩邊的子問題就互相獨立（因為 `k` 在整個區間都存在）。邊界用虛擬氣球 `nums[-1] = nums[n] = 1`。

```python
def maxCoins(nums: list[int]) -> int:
    nums = [1] + nums + [1]
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n):
        for left in range(n - length):
            right = left + length
            for k in range(left + 1, right):
                dp[left][right] = max(
                    dp[left][right],
                    dp[left][k] + dp[k][right]
                    + nums[left] * nums[k] * nums[right]
                )
    return dp[0][n - 1]
```
