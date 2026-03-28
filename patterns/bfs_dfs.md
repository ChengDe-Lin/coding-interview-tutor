---
last_updated: 2026-03-24
status: 學習中
tier: 1
---

# BFS / DFS

## 核心觀念

兩種圖/樹的遍歷策略。BFS 一層一層擴散（用 queue），DFS 一條路走到底再回頭（用 recursion 或 stack）。選擇哪個取決於你要什麼資訊。

## 識別信號

- **用 BFS：** 要找最短路徑/最少步數（unweighted）、level-order 處理、多起點同時擴散
- **用 DFS：** 要窮舉所有可能、tree 路徑問題、判斷連通性、需要遞迴回傳值（高度、子樹資訊）
- **一句話：** 問「最短」→ BFS，問「所有」或「存不存在」→ DFS

## 程式模板

### DFS (Recursion)
```python
def dfs(node):
    if not node:
        return
    # 處理 node
    dfs(node.left)
    dfs(node.right)
```

### BFS (Level-order)
```python
from collections import deque

def bfs(root):
    queue = deque([root])
    while queue:
        for _ in range(len(queue)):  # 一次處理一整層
            node = queue.popleft()
            # 處理 node
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
```

### Grid DFS（Island 類型）
```python
def dfs(grid, i, j):
    if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]) or grid[i][j] == '0':
        return
    grid[i][j] = '0'  # 標記已訪問（沉島）
    for di, dj in [(1,0),(-1,0),(0,1),(0,-1)]:
        dfs(grid, i + di, j + dj)
```

## 複雜度

| 面向 | 複雜度 | 說明 |
|------|--------|------|
| 時間 | O(V + E) | 每個 node 和 edge 各走一次 |
| 空間 | O(V) | BFS: queue 最寬層，DFS: recursion depth |

## 常見陷阱

- Graph DFS 忘記 visited → 無窮迴圈
- Graph DFS vs Backtracking 搞混：一般遍歷 visited 加了不拿掉，backtracking 要還原
- Grid 問題忘記邊界檢查
- BFS 忘記在**加入 queue 時**就標記 visited（而不是 pop 時），會導致重複加入

## 變體

- **Multi-source BFS：** 把所有起點一開始就放進 queue（例如 01 Matrix）
- **DFS 帶回傳值：** 遞迴回傳子樹資訊讓 parent 做判斷（例如 LCA、Tree Diameter）
- **Topological Sort：** DAG 上的 BFS（Kahn's）或 DFS

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 200 Number of Islands | Medium | Grid DFS，沉島技巧 | 已掌握 |
| LC 236 Lowest Common Ancestor | Medium | DFS 回傳值設計，base case 別忘 | 學習中 |
| LC 102 Binary Tree Level Order Traversal | Medium | BFS 模板 | 已掌握 |
| LC 994 Rotting Oranges | Medium | Multi-source BFS，所有起點同時入 queue，enqueue 時標記 visited | 已掌握 |
| LC 199 Binary Tree Right Side View | Medium | BFS level-order，每層最後一個值 | 已掌握 |
| LC 695 Max Area of Island | Medium | Grid DFS + 沉島 + return count | 已掌握 |
| LC 124 Binary Tree Maximum Path Sum | Hard | DFS 回傳單臂最大值，nonlocal 追蹤跨子樹全域最大 | 已掌握 |
| LC 133 Clone Graph | Medium | BFS/DFS + hash map | 未做 |
