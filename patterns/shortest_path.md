---
last_updated: 2026-03-30
status: 學習中
tier: 3
---

# Shortest Path (Dijkstra, Bellman-Ford)

## 核心觀念

- **Dijkstra**：non-negative weights，用 min heap 每次取最短的未訪問節點。O((V+E) log V)
- **Bellman-Ford**：可以處理負權，relaxe 所有邊 V-1 次。O(VE)
- 面試 90% 的情況用 Dijkstra 就夠

## 識別信號

- weighted graph + 最短路徑 / 最短時間
- 「所有節點的最短距離」（single source shortest path）
- 權重非負 → Dijkstra，有負權 → Bellman-Ford

## Dijkstra 模板

```python
import heapq
from collections import defaultdict

def dijkstra(graph, n, start):
    visited = [False] * (n + 1)
    heap = [(0, start)]
    dist = [float('inf')] * (n + 1)
    dist[start] = 0
    while heap:
        d, u = heapq.heappop(heap)
        if visited[u]:
            continue
        visited[u] = True
        dist[u] = d
        for v, w in graph[u]:
            if not visited[v]:
                heapq.heappush(heap, (d + w, v))
    return dist
```

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 743 Network Delay Time | Medium | 標準 Dijkstra | 已掌握 |
| LC 787 Cheapest Flights Within K Stops | Medium | Dijkstra 變體 / Bellman-Ford | 未做 |
