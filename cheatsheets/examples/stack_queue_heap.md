# Stack / Queue / Heap — 經典題速查

## Monotonic Stack

### LC 84 Largest Rectangle in Histogram

給定一個整數陣列 `heights`，每個元素代表直方圖中一根柱子的高度（寬度皆為 1）。
求直方圖中能構成的最大矩形面積。

**關鍵洞察**：用遞增 stack 維護「還沒算出右邊界」的柱子。當遇到更矮的柱子時，stack 頂端的柱子就確定了右邊界，同時 stack 次頂就是左邊界。前後各加一個 0 作為哨兵，省去結尾清空邏輯。

```python
def largestRectangleArea(heights: list[int]) -> int:
    heights = [0] + heights + [0]
    stack = []
    max_area = 0
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    return max_area
```

---

## Monotonic Deque

### LC 239 Sliding Window Maximum

給定整數陣列 `nums` 與視窗大小 `k`，回傳每個滑動視窗中的最大值。
輸出長度為 `n - k + 1`。

**關鍵洞察**：維護一個遞減 deque（存 index）。右端：新元素進來時，彈掉所有比它小的（它們不可能再當最大值）。左端：檢查 deque 頭是否超出視窗範圍。deque[0] 永遠是當前視窗的最大值 index。

```python
from collections import deque

def maxSlidingWindow(nums: list[int], k: int) -> list[int]:
    dq = deque()  # stores indices, decreasing order of values
    result = []
    for i, num in enumerate(nums):
        while dq and nums[dq[-1]] <= num:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result
```

---

## Heap / Priority Queue

### LC 23 Merge K Sorted Lists

給定 `k` 個已排序的 linked list，將它們合併成一個排序的 linked list。

**關鍵洞察**：用 min-heap 維護每條 list 的當前最小節點。每次 pop 最小的接到結果尾端，再把該節點的 next push 進 heap。用 `(val, index, node)` 避免節點間比較。

```python
import heapq
from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeKLists(lists: list[Optional[ListNode]]) -> Optional[ListNode]:
    heap = []
    counter = 0  # 用遞增 counter 避免 node 比較（ListNode 沒有 __lt__）
    for node in lists:
        if node:
            heapq.heappush(heap, (node.val, counter, node))
            counter += 1
    dummy = cur = ListNode()
    while heap:
        val, _, node = heapq.heappop(heap)
        cur.next = node
        cur = cur.next
        if node.next:
            heapq.heappush(heap, (node.next.val, counter, node.next))
            counter += 1
    return dummy.next
```

---

## 設計題

### LC 146 LRU Cache

設計一個 LRU Cache，支援 `get(key)` 與 `put(key, value)`，兩者皆 O(1)。
容量滿時淘汰最久未使用的 key。

**關鍵洞察**：`OrderedDict` 同時提供 O(1) 查找與順序維護。每次存取用 `move_to_end` 移到尾端，淘汰時用 `popitem(last=False)` 移除頭端（最久未用）。

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)
```

---

## 設計題 — Frequency Stack

### LC 895 Maximum Frequency Stack

設計一個 stack，`push(val)` 推入元素，`pop()` 移除出現頻率最高的元素（頻率相同時移除最近 push 的）。
兩個操作皆 O(1)。

**關鍵洞察**：用 `freq_to_stack` dict 讓同一個元素同時存在於多個頻率層。push 時頻率 +1 並放入對應層；pop 時從 `maxFreq` 層彈出，若該層空了就 `maxFreq -= 1`。不需要刪除低頻層的舊副本——它們自然會在後續 pop 中被處理。

```python
from collections import defaultdict

class FreqStack:
    def __init__(self):
        self.freq = defaultdict(int)
        self.freq_to_stack = defaultdict(list)
        self.max_freq = 0

    def push(self, val: int) -> None:
        self.freq[val] += 1
        f = self.freq[val]
        self.freq_to_stack[f].append(val)
        self.max_freq = max(self.max_freq, f)

    def pop(self) -> int:
        val = self.freq_to_stack[self.max_freq].pop()
        self.freq[val] -= 1
        if not self.freq_to_stack[self.max_freq]:
            self.max_freq -= 1
        return val
```
