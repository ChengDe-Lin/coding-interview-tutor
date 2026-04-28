# Advanced Techniques — 經典題速查

## Backtracking

### LC 46 Permutations

給定一個不含重複元素的整數陣列，回傳所有可能的排列。
- 輸入：`nums: List[int]`（元素不重複）
- 輸出：所有排列的 list
- 約束：`1 <= len(nums) <= 6`

**關鍵洞察**：用 swap-based 回溯，對每個位置 `i`，依次把 `i` 之後的每個元素換到位置 `i`，遞迴處理下一個位置，再換回來。不需要額外 visited set。

```python
def permute(nums: list[int]) -> list[list[int]]:
    res = []
    def backtrack(start):
        if start == len(nums):
            res.append(nums[:])
            return
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start]
    backtrack(0)
    return res
```

---

## Sorting + Greedy

### LC 56 Merge Intervals

給定一組區間，合併所有重疊的區間。
- 輸入：`intervals: List[List[int]]`，每個元素 `[start, end]`
- 輸出：合併後的區間 list
- 約束：`1 <= len(intervals) <= 10^4`

**關鍵洞察**：先依 `start` 排序，掃描時只需比較當前區間的 `start` 是否 <= 前一個區間的 `end`，是則合併（更新 `end` 取 max），否則開新區間。

```python
def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort()
    res = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= res[-1][1]:
            res[-1][1] = max(res[-1][1], end)
        else:
            res.append([start, end])
    return res
```

---

## Divide and Conquer

### LC 315 Count of Smaller Numbers After Self

給定整數陣列，對每個元素計算其右側有多少個比它小的元素。
- 輸入：`nums: List[int]`
- 輸出：`List[int]`，`counts[i]` = `nums[i]` 右邊比它小的元素數量
- 約束：`1 <= len(nums) <= 10^5`

**關鍵洞察**：Merge sort 過程中，當右半邊元素先被放入時，它比左半邊所有尚未放入的元素都小。累計右半邊已放入的個數即為左半邊當前元素的逆序對貢獻。

```python
def countSmaller(nums: list[int]) -> list[int]:
    n = len(nums)
    counts = [0] * n
    indices = list(range(n))

    def merge_sort(lo, hi):
        if hi - lo <= 1:
            return
        mid = (lo + hi) // 2
        merge_sort(lo, mid)
        merge_sort(mid, hi)
        temp = []
        i, j = lo, mid
        while i < mid and j < hi:
            if nums[indices[j]] < nums[indices[i]]:
                temp.append(indices[j])
                j += 1
            else:
                counts[indices[i]] += j - mid
                temp.append(indices[i])
                i += 1
        while i < mid:
            counts[indices[i]] += j - mid
            temp.append(indices[i])
            i += 1
        while j < hi:
            temp.append(indices[j])
            j += 1
        indices[lo:hi] = temp

    merge_sort(0, n)
    return counts
```

---

## Contribution Counting（貢獻法）

### LC 907 Sum of Subarray Minimums

給定整數陣列，求所有子陣列最小值的總和，答案取模 `10^9 + 7`。
- 輸入：`arr: List[int]`
- 輸出：整數（所有子陣列最小值之和 mod `10^9+7`）
- 約束：`1 <= len(arr) <= 3 * 10^4`

**關鍵洞察**：對每個元素，用 monotonic stack 找出它作為最小值的子陣列數量。左邊界用嚴格小於（`<`），右邊界用小於等於（`<=`），一嚴一寬避免重複計算。貢獻 = `val * left * right`。

```python
def sumSubarrayMins(arr: list[int]) -> int:
    MOD = 10**9 + 7
    n = len(arr)
    left = [0] * n   # 左邊第一個 < arr[i] 的距離
    right = [0] * n   # 右邊第一個 <= arr[i] 的距離
    stack = []
    for i in range(n):
        while stack and arr[stack[-1]] >= arr[i]:
            stack.pop()
        left[i] = i - stack[-1] if stack else i + 1
        stack.append(i)
    stack = []
    for i in range(n - 1, -1, -1):
        while stack and arr[stack[-1]] > arr[i]:
            stack.pop()
        right[i] = stack[-1] - i if stack else n - i
        stack.append(i)
    return sum(arr[i] * left[i] * right[i] for i in range(n)) % MOD
```

---

## Meet in the Middle

### LC 1755 Closest Subsequence Sum

給定長度 ≤ 40 的整數陣列和目標值 `goal`，找一個子序列使其和最接近 `goal`。
- 輸入：`nums: List[int]`, `goal: int`
- 輸出：最小的 `abs(subsequence_sum - goal)`
- 約束：`1 <= len(nums) <= 40`（暴力 2^40 不可行）

**關鍵洞察**：將陣列分成兩半，各自枚舉所有子集和（2^20 ≈ 10^6）。排序其中一半，對另一半的每個 sum 用 binary search 在排序半中找最接近 `goal - sum` 的值。

```python
from bisect import bisect_left

def minAbsDifference(nums: list[int], goal: int) -> int:
    def all_sums(arr):
        sums = {0}
        for x in arr:
            sums = sums | {s + x for s in sums}
        return sorted(sums)

    mid = len(nums) // 2
    left = all_sums(nums[:mid])
    right = all_sums(nums[mid:])
    ans = float('inf')
    for s in left:
        target = goal - s
        idx = bisect_left(right, target)
        if idx < len(right):
            ans = min(ans, abs(right[idx] - target))
        if idx > 0:
            ans = min(ans, abs(right[idx - 1] - target))
    return ans
```

---

## Line Sweep

### LC 218 The Skyline Problem

給定建築物列表 `[left, right, height]`，輸出天際線的關鍵轉折點。
- 輸入：`buildings: List[List[int]]`
- 輸出：`List[List[int]]`，天際線的關鍵點 `[x, height]`
- 約束：建築物數量 ≤ 10^4

**關鍵洞察**：拆成事件：建築開始 = 加入高度，建築結束 = 移除高度。按 x 排序，用 max-heap 維護當前活躍高度。每當最大高度改變時記錄一個關鍵點。

```python
import heapq

def getSkyline(buildings: list[list[int]]) -> list[list[int]]:
    events = []
    for l, r, h in buildings:
        events.append((l, -h, r))  # start: negative height for max-heap
        events.append((r, 0, 0))   # end
    events.sort()
    res = [[0, 0]]
    heap = [(0, float('inf'))]  # (neg_height, end_x)
    for x, neg_h, end in events:
        if neg_h != 0:
            heapq.heappush(heap, (neg_h, end))
        while heap[0][1] <= x:
            heapq.heappop(heap)
        max_h = -heap[0][0]
        if max_h != res[-1][1]:
            res.append([x, max_h])
    return res[1:]
```

---

## Rolling Hash

### LC 187 Repeated DNA Sequences

找出 DNA 字串中所有出現超過一次的長度為 10 的子序列。
- 輸入：`s: str`（只含 `A`, `C`, `G`, `T`）
- 輸出：所有出現 ≥ 2 次的 10 字母子串 list
- 約束：`1 <= len(s) <= 10^5`

**關鍵洞察**：Rolling hash 把長度 L 的子字串壓成一個整數，滑動窗口 O(1) 更新。DNA 只有 4 個字元，用 base=4 編碼。這題用 string slice + set 也能過，但 rolling hash 是更通用的技巧（如 LC 1044 Longest Duplicate Substring 就非用不可）。

```python
def findRepeatedDnaSequences(s: str) -> list[str]:
    if len(s) <= 10:
        return []
    char_to_val = {'A': 0, 'C': 1, 'G': 2, 'T': 3}
    BASE, L = 4, 10
    # 計算初始 hash
    h = 0
    for i in range(L):
        h = h * BASE + char_to_val[s[i]]
    seen, res = {h}, set()
    power = BASE ** L  # 用來移除最高位
    for i in range(1, len(s) - L + 1):
        h = h * BASE + char_to_val[s[i + L - 1]]  # 加入新字元
        h -= char_to_val[s[i - 1]] * power          # 移除舊字元
        if h in seen:
            res.add(s[i:i + L])
        seen.add(h)
    return list(res)
```

---

## 差分陣列

### LC 1109 Corporate Flight Bookings

給定 `n` 個航班和若干預訂 `[first, last, seats]`，回傳每個航班的總座位數。
- 輸入：`bookings: List[List[int]]`（1-indexed）, `n: int`
- 輸出：`List[int]`，長度為 `n`
- 約束：`1 <= n <= 2 * 10^4`

**關鍵洞察**：差分陣列技巧：對區間 `[first, last]` 加 `seats`，只需在 `diff[first-1] += seats`、`diff[last] -= seats`，最後做 prefix sum 還原。將 O(n*m) 降為 O(n+m)。

```python
def corpFlightBookings(bookings: list[list[int]], n: int) -> list[int]:
    diff = [0] * (n + 1)
    for first, last, seats in bookings:
        diff[first - 1] += seats
        diff[last] -= seats
    for i in range(1, n):
        diff[i] += diff[i - 1]
    return diff[:n]
```

---

## Coordinate Compression（座標壓縮）

### 通用技巧

當數值範圍巨大（如 10^9）但元素數量有限（如 10^5）時，將數值映射為排名。
- 用途：使 BIT / Segment Tree 等資料結構可以在壓縮後的範圍上操作
- 適用場景：離散化後配合樹狀陣列計算逆序對、區間查詢等

**關鍵洞察**：`sorted(set(arr))` 建立排名字典，將原始值映射到 `[0, k)` 的連續整數。後續所有操作都在壓縮後的索引上進行。

```python
def coordinate_compress(arr: list[int]) -> tuple[dict[int, int], list[int]]:
    sorted_unique = sorted(set(arr))
    rank = {v: i for i, v in enumerate(sorted_unique)}
    compressed = [rank[x] for x in arr]
    return rank, compressed
```

---

## Problem Transformation — 取補集

### LC 253 Meeting Rooms II

給定會議時間區間，找出同時需要的最少會議室數量。
- 輸入：`intervals: List[List[int]]`
- 輸出：整數（最少會議室數）
- 約束：`1 <= len(intervals) <= 10^4`

**關鍵洞察**：將每個區間拆成 `+1`（開始）和 `-1`（結束）事件，排序後掃描累加，追蹤最大併發數即為答案。這是「區間問題轉事件掃描線」的經典轉換。**Tie-breaking：** 同時間 end (-1) 排在 start (+1) 前面，代表 `[1,2]` 和 `[2,3]` 共用一間（標準 LeetCode 語意）。若面試官要求同時間也算重疊，改成 `(start, 1)` 和 `(end+1, -1)`。

```python
def minMeetingRooms(intervals: list[list[int]]) -> int:
    events = []
    for start, end in intervals:
        events.append((start, 1))
        events.append((end, -1))
    events.sort()
    cur = max_rooms = 0
    for _, delta in events:
        cur += delta
        max_rooms = max(max_rooms, cur)
    return max_rooms
```
