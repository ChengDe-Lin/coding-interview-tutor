---
last_updated: 2026-03-27
status: 學習中
tier: 1
---

# Dynamic Programming (1D)

## 核心觀念

用空間換時間：把子問題的結果存起來，避免重複計算。1D DP 的狀態只有一個維度（通常是 index 或某個累積量）。

兩種實作：
- **Top-down**：recursion + memoization（`@lru_cache`）
- **Bottom-up**：iterative，從小問題往上建 dp 陣列

## 識別信號

- 「最多/最少/方法數」+ 每步有選擇（選或不選）
- 問題可以用 `dp[i] = f(dp[i-1], dp[i-2], ...)` 表達
- Greedy 行不通（局部最優 ≠ 全域最優），但 brute force 太慢
- 子問題有重疊（overlapping subproblems）

## 解題三步驟

1. **定義狀態**：`dp[i]` 代表什麼？
2. **轉移方程**：`dp[i]` 怎麼從之前的狀態算出來？
3. **Base case**：`dp[0]` 是什麼？

## 程式模板

### Bottom-up
```python
def solve(nums):
    n = len(nums)
    dp = [0] * n
    dp[0] = base_case
    for i in range(1, n):
        dp[i] = transition(dp[i-1], dp[i-2], ...)
    return dp[n-1]
```

### Top-down
```python
from functools import lru_cache

def solve(nums):
    @lru_cache(maxsize=None)
    def dp(i):
        if i == 0:
            return base_case
        return transition(dp(i-1), dp(i-2), ...)
    return dp(n-1)
```

### 空間優化（只依賴前 1-2 個狀態時）
```python
prev2, prev1 = base0, base1
for i in range(2, n):
    curr = transition(prev1, prev2)
    prev2, prev1 = prev1, curr
return prev1
```

## 複雜度

| 面向 | 複雜度 | 說明 |
|------|--------|------|
| 時間 | O(n) 或 O(n²) | 取決於轉移方程是否需要內層迴圈 |
| 空間 | O(n) 或 O(1) | 可優化為只存前幾個狀態 |

## 常見陷阱

- dp[i] 的定義不清楚，導致轉移方程寫不出來
- 忘記 base case 或 base case 設錯
- 空間優化時搞混 prev1 和 prev2 的更新順序
- LIS 的 O(n log n) 解法用 binary search，不是純 DP

## 1D DP 常見模式

| 模式 | dp[i] 意義 | 轉移 | 經典題 |
|------|-----------|------|--------|
| Fibonacci 式 | 到第 i 的方法數 | dp[i] = dp[i-1] + dp[i-2] | LC 70 Climbing Stairs |
| 選或不選 | 前 i 個的最佳結果 | dp[i] = max(dp[i-1], dp[i-2] + val[i]) | LC 198 House Robber |
| LIS | 以 i 結尾的最長遞增子序列 | dp[i] = max(dp[j]+1) for j < i where nums[j] < nums[i] | LC 300 LIS |
| Kadane | 以 i 結尾的最大子陣列和 | dp[i] = max(nums[i], dp[i-1] + nums[i]) | LC 53 Maximum Subarray |
| 完全背包 | 湊出金額 i 的方法數/最少硬幣 | dp[i] = min(dp[i-c]+1) for c in coins | LC 322 Coin Change |

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 198 House Robber | Medium | 選或不選 | 未做 |
| LC 300 Longest Increasing Subsequence | Medium | O(n²) DP + O(n log n) tails + bisect 優化 | 已掌握 |
| LC 322 Coin Change | Medium | 完全背包 | 未做 |
| LC 139 Word Break | Medium | 字串切割 DP，dp[i]=s[0:i] 可否被分割 | 已掌握 |
| LC 152 Maximum Product Subarray | Medium | 同時追蹤 max 和 min（負負得正） | 已掌握 |
| LC 91 Decode Ways | Medium | 類 Fibonacci，兩位數要檢查 10-26 不是只 ≤26 | 已掌握 |
| LC 410 Split Array Largest Sum | Hard | top-down DP O(k×n²)，也可 binary search on answer O(n log S) | 已掌握 |
