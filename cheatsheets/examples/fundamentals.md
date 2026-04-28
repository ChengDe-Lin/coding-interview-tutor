# Fundamentals — 經典題速查

## Two Pointers — 相向指標

### LC 167. Two Sum II - Input Array Is Sorted

給定一個**已排序**的整數陣列 `numbers` 和一個目標值 `target`，找出兩個數使其和等於 `target`。回傳 1-indexed 的位置。保證恰好有一組解。

**關鍵洞察**：排序保證了左右指標的單調性——和太大就縮右、和太小就推左，每步排除一行/列。

```python
def twoSum(numbers: list[int], target: int) -> list[int]:
    l, r = 0, len(numbers) - 1
    while l < r:
        s = numbers[l] + numbers[r]
        if s == target:
            return [l + 1, r + 1]
        elif s < target:
            l += 1
        else:
            r -= 1
```

---

## Two Pointers — 快慢指標

### LC 142. Linked List Cycle II

給定一個 linked list 的 head，判斷是否有 cycle。若有，回傳 cycle 開始的節點；若無，回傳 `None`。

**關鍵洞察**：Floyd 演算法分兩階段——Phase 1 快慢指標相遇確認有環，Phase 2 從 head 和相遇點同速前進，交會處即環入口（數學證明：head 到入口距離 = 相遇點到入口距離）。

```python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def detectCycle(head: ListNode) -> ListNode:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            slow = head
            while slow is not fast:
                slow = slow.next
                fast = fast.next
            return slow
    return None
```

---

## Two Pointers — 讀寫指標

### LC 283. Move Zeroes

給定一個整數陣列 `nums`，將所有 `0` 移到陣列末尾，同時保持非零元素的相對順序。必須 in-place 操作。

**關鍵洞察**：write 指標指向下一個非零值該放的位置，read 指標掃描全陣列。非零值寫到 write 位置後 write 前進，最後 write 之後全補零。

```python
def moveZeroes(nums: list[int]) -> None:
    w = 0
    for r in range(len(nums)):
        if nums[r] != 0:
            nums[w] = nums[r]
            w += 1
    for i in range(w, len(nums)):
        nums[i] = 0
```

---

## Binary Search

### LC 34. Find First and Last Position of Element in Sorted Array

給定一個**遞增排序**的整數陣列 `nums` 和目標值 `target`，找出 `target` 在陣列中的第一個和最後一個位置。若不存在回傳 `[-1, -1]`。要求 O(log n)。

**關鍵洞察**：兩次二分搜尋——bisect_left 找第一個 `>=target` 的位置，bisect_right 找第一個 `>target` 的位置。左閉右開區間讓邊界處理最乾淨。

```python
def searchRange(nums: list[int], target: int) -> list[int]:
    def bisect_left(nums, target):
        lo, hi = 0, len(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] < target:
                lo = mid + 1
            else:
                hi = mid
        return lo

    def bisect_right(nums, target):
        lo, hi = 0, len(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] <= target:
                lo = mid + 1
            else:
                hi = mid
        return lo

    left = bisect_left(nums, target)
    right = bisect_right(nums, target)
    if left < len(nums) and nums[left] == target:
        return [left, right - 1]
    return [-1, -1]
```

---

## Binary Search on Answer

### LC 1011. Capacity To Ship Packages Within D Days

給定一個重量陣列 `weights` 和天數 `days`，貨物必須按順序裝船。求能在 `days` 天內運完所有貨物的**最小船載重量**。

**關鍵洞察**：答案具有單調性——載重越大，需要天數越少。在 `[max(weights), sum(weights)]` 上二分搜尋，用 greedy 驗證給定載重是否能在 `days` 天內運完。

```python
def shipWithinDays(weights: list[int], days: int) -> int:
    def feasible(cap):
        d, cur = 1, 0
        for w in weights:
            if cur + w > cap:
                d += 1
                cur = 0
            cur += w
        return d <= days

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if feasible(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
```

---

## Sliding Window

### LC 76. Minimum Window Substring

給定字串 `s` 和 `t`，找出 `s` 中包含 `t` 所有字元的**最短子字串**。若不存在回傳空字串。`t` 中可能有重複字元，窗口內必須涵蓋所有重複次數。

**關鍵洞察**：用 `need` 計數器追蹤缺少的字元數量，`missing` 記錄還差幾種字元未滿足。右端擴展直到 valid，左端收縮直到 invalid，過程中更新最小窗口。

```python
from collections import Counter

def minWindow(s: str, t: str) -> str:
    need = Counter(t)
    missing = len(need)
    l = 0
    best = (0, float('inf'))
    for r, c in enumerate(s):
        need[c] -= 1
        if need[c] == 0:
            missing -= 1
        while missing == 0:
            if r - l < best[1] - best[0]:
                best = (l, r)
            need[s[l]] += 1
            if need[s[l]] > 0:
                missing += 1
            l += 1
    return s[best[0]:best[1] + 1] if best[1] < float('inf') else ""
```

---

## Prefix Sum + Hash Map

### LC 560. Subarray Sum Equals K

給定一個整數陣列 `nums` 和整數 `k`，找出陣列中和等於 `k` 的**連續子陣列**的總數。陣列可能含負數。

**關鍵洞察**：這題同時是 **Prefix Sum** 和 **Hash Map** 的經典組合。若 `prefix[j] - prefix[i] == k`，則 `nums[i+1..j]` 的和為 `k`。用 hash map 記錄每個 prefix sum 出現的次數，掃描時查詢 `prefix - k` 出現幾次即可。O(n) 時間、O(n) 空間。**先查再更新**，避免用到自己。初始化 `{0: 1}`。

```python
from collections import defaultdict

def subarraySum(nums: list[int], k: int) -> int:
    count = defaultdict(int)
    count[0] = 1
    prefix = 0
    ans = 0
    for num in nums:
        prefix += num
        ans += count[prefix - k]  # 先查
        count[prefix] += 1         # 再更新
    return ans
```

---

## Hash Map — 配對問題

### LC 1. Two Sum

給定一個整數陣列 `nums` 和整數 `target`，找出**兩個**加起來等於 `target` 的元素的 index。保證只有一組解，同一元素不能用兩次。

**關鍵洞察**：一邊掃描一邊在 hash map 裡找 complement（`target - num`）。O(n) 時間。

```python
def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        comp = target - num
        if comp in seen:
            return [seen[comp], i]
        seen[num] = i
```
