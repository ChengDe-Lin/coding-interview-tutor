# Graph — 經典題速查

## BFS / DFS

### LC 200 Number of Islands

給定一個 2D grid，`'1'` 代表陸地、`'0'` 代表水域。
相鄰（上下左右）的 `'1'` 連成一座島。
回傳島嶼的總數量。

**關鍵洞察：** 遍歷 grid，遇到 `'1'` 就用 BFS flood fill 把整座島標記為 `'0'`，計數器 +1。每座島只會被計一次。

```python
from collections import deque

def numIslands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
    m, n = len(grid), len(grid[0])
    count = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                count += 1
                q = deque([(i, j)])
                grid[i][j] = '0'
                while q:
                    r, c = q.popleft()
                    for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == '1':
                            grid[nr][nc] = '0'
                            q.append((nr, nc))
    return count
```

---

## Union Find

### LC 684 Redundant Connection

給定 `n` 個節點的無向圖，以 edge list 形式提供 `n` 條邊。
原本是一棵樹（n-1 條邊），多了一條邊形成環。
回傳那條多餘的邊（若有多個答案，回傳最後出現的）。

**關鍵洞察：** 依序處理每條邊，用 Union-Find 合併。當 `find(u) == find(v)` 時，該邊就是冗餘邊。Path compression + union by rank 保證近 O(1)。

```python
def findRedundantConnection(edges: list[list[int]]) -> list[int]:
    n = len(edges)
    parent = list(range(n + 1))
    rank = [0] * (n + 1)

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True

    for u, v in edges:
        if not union(u, v):
            return [u, v]
```

---

## Trie

### LC 208 Implement Trie

實作一個 Trie（前綴樹），支援三個操作：
`insert(word)` 插入字串、`search(word)` 精確搜尋、`startsWith(prefix)` 前綴搜尋。

**關鍵洞察：** 每個 TrieNode 用 `children` dict 存子節點 + `is_end` 標記是否為完整單詞結尾。search 與 startsWith 差別只在是否檢查 `is_end`。

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self._find(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._find(prefix) is not None

    def _find(self, prefix: str) -> TrieNode | None:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node
```

---

## Topological Sort

### LC 210 Course Schedule II

給定 `numCourses` 門課與先修關係 `prerequisites`。
回傳一組修課順序使所有課都能完成；若有環（不可能完成），回傳空陣列。

**關鍵洞察：** Kahn's Algorithm — 建 indegree 陣列，indegree=0 的先入 queue。每次 pop 一門課，把相鄰課的 indegree -1，降到 0 就入 queue。最終 order 長度 != n 代表有環。

```python
from collections import deque

def findOrder(numCourses: int, prerequisites: list[list[int]]) -> list[int]:
    graph = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses
    for course, pre in prerequisites:
        graph[pre].append(course)
        indegree[course] += 1
    q = deque(i for i in range(numCourses) if indegree[i] == 0)
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for nei in graph[node]:
            indegree[nei] -= 1
            if indegree[nei] == 0:
                q.append(nei)
    return order if len(order) == numCourses else []
```

---

## Segment Tree / BIT

### LC 307 Range Sum Query - Mutable

給定整數陣列，支援兩種操作：
`update(index, val)` 將某位置改為新值、`sumRange(left, right)` 查詢區間和。
需要高效支援大量混合操作。

**關鍵洞察：** BIT（Binary Indexed Tree）以 1-based index 運作。update 往上走 `i += i & -i`，query 往下走 `i -= i & -i`。update 存的是差值 delta，不是新值本身。

```python
class NumArray:
    def __init__(self, nums: list[int]):
        self.n = len(nums)
        self.nums = nums[:]
        self.tree = [0] * (self.n + 1)
        for i, v in enumerate(nums):
            self._add(i + 1, v)

    def _add(self, i: int, delta: int):
        while i <= self.n:
            self.tree[i] += delta
            i += i & -i

    def _query(self, i: int) -> int:
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & -i
        return s

    def update(self, index: int, val: int) -> None:
        delta = val - self.nums[index]
        self.nums[index] = val
        self._add(index + 1, delta)

    def sumRange(self, left: int, right: int) -> int:
        return self._query(right + 1) - self._query(left)
```

---

## Shortest Path

### LC 743 Network Delay Time

給定有向加權圖（`times[i] = [u, v, w]`）和起點 `k`。
求從 `k` 發送訊號到所有節點的最短時間。
若有節點不可達，回傳 -1。

**關鍵洞察：** 經典 Dijkstra — min-heap 存 `(dist, node)`，每次取最小距離的節點做 relaxation。最終答案是 `max(dist)`；若有節點未被訪問則回傳 -1。

```python
import heapq
from collections import defaultdict

def networkDelayTime(times: list[list[int]], n: int, k: int) -> int:
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))
    dist = {}
    heap = [(0, k)]
    while heap:
        d, u = heapq.heappop(heap)
        if u in dist:
            continue
        dist[u] = d
        for v, w in graph[u]:
            if v not in dist:
                heapq.heappush(heap, (d + w, v))
    return max(dist.values()) if len(dist) == n else -1
```

---

## Implicit Graph

### LC 752 Open the Lock

四位數密碼鎖，每次可將一位數字 +1 或 -1（0 和 9 循環）。
給定 `deadends`（禁止狀態）和 `target`，求從 `"0000"` 到 `target` 的最少步數。
若無法到達回傳 -1。

**關鍵洞察：** 狀態空間上的 BFS — 每個狀態是 4 位字串，每步有 8 個鄰居（4 位 x 2 方向）。用 set 記錄 deadends + visited，標準 BFS 求最短路。

```python
from collections import deque

def openLock(deadends: list[str], target: str) -> int:
    dead = set(deadends)
    if "0000" in dead:
        return -1
    q = deque([("0000", 0)])
    visited = {"0000"}
    while q:
        state, steps = q.popleft()
        if state == target:
            return steps
        for i in range(4):
            d = int(state[i])
            for nd in ((d + 1) % 10, (d - 1) % 10):
                nxt = state[:i] + str(nd) + state[i+1:]
                if nxt not in visited and nxt not in dead:
                    visited.add(nxt)
                    q.append((nxt, steps + 1))
    return -1
```
