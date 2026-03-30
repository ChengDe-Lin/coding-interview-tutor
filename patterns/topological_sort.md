---
last_updated: 2026-03-30
status: 學習中
tier: 2
---

# Topological Sort

## 核心觀念

DAG（有向無環圖）上的線性排序：每個 node 出現在它的所有 dependency 之後。如果有 cycle 就不存在 topological order。

## 識別信號

- 「先修課」「依賴關係」「build order」
- 有向圖 + 判斷是否有 cycle
- 要求一個合法的執行順序

## 兩種實作

### DFS（三態標記）
- 0=未訪問、1=處理中、2=已完成
- 遇到 status 1 → cycle
- 完成時加入結果（reverse postorder）

### BFS（Kahn's Algorithm）
- 算每個 node 的 indegree
- indegree=0 的先入 queue
- 處理完一個 node，鄰居 indegree-1，變 0 就入 queue
- 最後看是否所有 node 都被處理了

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 207 Course Schedule | Medium | cycle detection（DFS 三態或 Kahn's） | 已掌握 |
| LC 210 Course Schedule II | Medium | 輸出 topological order | 未做 |
| LC 269 Alien Dictionary | Hard | 從字典序建圖 + topo sort | 未做 |
