---
last_updated: 2026-03-28
status: 學習中
tier: 1
---

# Heap / Priority Queue

## 核心觀念

Heap 是底層資料結構（complete binary tree），PQ 是抽象介面。提供 O(log n) 插入/刪除、O(1) 取最值。

Python `heapq` 只有 min heap，max heap 存負值。

## 識別信號

- 「第 K 大 / 第 K 小」
- 「不斷取最大/最小 + 插入新元素」
- Merge K sorted things
- Dijkstra 最短路徑
- Lazy deletion（跟 sliding window 配合）

## 程式模板

```python
import heapq

# Min heap
heap = []
heapq.heappush(heap, val)
smallest = heapq.heappop(heap)
peek = heap[0]  # O(1) 看最小，不移除

# Max heap: 存負值
heapq.heappush(heap, -val)
largest = -heapq.heappop(heap)

# Heapify existing list: O(n)
heapq.heapify(nums)

# Top K smallest
heapq.nsmallest(k, nums)

# Top K largest
heapq.nlargest(k, nums)
```

## 複雜度

| 操作 | 複雜度 |
|------|--------|
| push | O(log n) |
| pop | O(log n) |
| peek (heap[0]) | O(1) |
| heapify | O(n) |

## 常見陷阱

- `heapq` 是 min heap，max heap 要自己存負值
- heap 不是 sorted array，只有 heap[0] 保證是最小
- Lazy deletion: pop 時檢查是否已過期，配合 dict 追蹤有效性
- Tuple 比較：`(priority, index, value)` 加 index 避免 value 無法比較

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 239 Sliding Window Maximum | Hard | Max heap + lazy deletion | 已掌握 |
| LC 215 Kth Largest Element | Medium | Min heap size k | 未做 |
| LC 295 Find Median from Data Stream | Hard | 兩個 heap（max + min）維護中位數 | 已掌握 |
| LC 23 Merge K Sorted Lists | Hard | Min heap 存 (val, index, node)，index 當 tiebreaker | 已掌握 |
| LC 347 Top K Frequent Elements | Medium | Freq map + heap 或 bucket sort | 未做 |
