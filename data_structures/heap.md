# Heap / Priority Queue

## 核心概念
一種完全二叉樹結構，保證根節點是最小（min-heap）或最大（max-heap）元素。支援 O(log n) 插入和 O(log n) 取出極值。

## 操作複雜度

| 操作 | 平均 | 最差 | 備註 |
|------|------|------|------|
| Insert (push) | O(log n) | O(log n) | sift up |
| Extract min/max (pop) | O(log n) | O(log n) | sift down |
| Peek | O(1) | O(1) | 只看不取 |
| Heapify (build) | O(n) | O(n) | 不是 O(n log n) |

## 什麼時候用
- 需要反覆取「目前最大/最小」的場景（Top-K, merge K sorted lists）
- 需要動態維護排序的場景（median finder）
- Dijkstra / Prim 等 greedy 算法

## 實作重點

```python
import heapq

# Python heapq 是 min-heap
nums = [3, 1, 4, 1, 5]
heapq.heapify(nums)          # in-place, O(n)
heapq.heappush(nums, 2)      # O(log n)
smallest = heapq.heappop(nums)  # O(log n)

# Max-heap: 取負值
max_heap = [-x for x in nums]
heapq.heapify(max_heap)
largest = -heapq.heappop(max_heap)

# Top-K smallest
k = 3
top_k = heapq.nsmallest(k, nums)  # O(n log k)
```

## 常見陷阱
- Python `heapq` 只有 min-heap，要 max-heap 必須取負
- `heapq.heappush` / `heappop` 不是 method，是 function（傳 list 進去）
- 自定義排序用 tuple: `heapq.heappush(heap, (priority, item))`

## 相關 Patterns
- Heap / Priority Queue pattern
- Merge K Sorted（用 min-heap merge）
- Sliding Window Maximum（用 deque 更好，但 heap 也能解）
