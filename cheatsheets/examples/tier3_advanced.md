# Tier 3 — 睡前故事

> 面試不太會考完整實作，但知道它們存在、能說出核心概念，就是加分項。
> 目標：聽到關鍵字 → 腦中浮現演算法名稱 + 一句話解釋 + 複雜度。

---

## KMP (Knuth-Morris-Pratt)

**什麼時候提到它：**
字串匹配問題 — pattern 在 text 中出現幾次、出現在哪些位置。當 `n * m` 太慢時，需要線性解法。

**核心概念：**
預處理 pattern 建出 failure function（部分匹配表），`fail[i]` 代表 `pattern[:i+1]` 中最長的「proper prefix = suffix」長度。匹配失敗時，pattern 指標跳到 `fail` 指示的位置，text 指標永遠不回頭。整體 O(n + m)。

```python
def build_failure(pattern):
    m = len(pattern)
    fail = [0] * m
    j = 0
    for i in range(1, m):
        while j > 0 and pattern[i] != pattern[j]:
            j = fail[j - 1]
        if pattern[i] == pattern[j]:
            j += 1
        fail[i] = j
    return fail

def kmp_search(text, pattern):
    fail = build_failure(pattern)
    j = 0
    for i in range(len(text)):
        while j > 0 and text[i] != pattern[j]:
            j = fail[j - 1]
        if text[i] == pattern[j]:
            j += 1
        if j == len(pattern):
            yield i - j + 1  # match at this index
            j = fail[j - 1]
```

**面試怎麼用：**
"This is a classic string matching problem, I'd use KMP for O(n+m) — shall I implement it or use Python's built-in `in`/`find`?"

---

## Z-Algorithm

**什麼時候提到它：**
跟 KMP 同場景（字串匹配），但 Z-Algorithm 更直覺、更容易現場寫對。也常用在字串週期性分析。

**核心概念：**
`Z[i]` = 從位置 `i` 開始的子字串與整個字串的最長公共前綴長度。維護一個 `[l, r]` 窗口（目前匹配最右的區間），新位置如果在窗口內就可以利用之前算過的值跳過比較。O(n) 建構。匹配時把 `pattern + "$" + text` 串起來算 Z array，`Z[i] == len(pattern)` 的位置就是匹配點。

```python
def z_function(s):
    n = len(s)
    z = [0] * n
    z[0] = n
    l, r = 0, 0
    for i in range(1, n):
        if i < r:
            z[i] = min(r - i, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] > r:
            l, r = i, i + z[i]
    return z

# 用法：找 pattern 在 text 中的所有出現位置
# z = z_function(pattern + "$" + text)
# matches = [i - len(pattern) - 1 for i in range(len(pattern)+1, len(z)) if z[i] == len(pattern)]
```

**面試怎麼用：**
"Z-algorithm gives the same O(n+m) bound as KMP but is simpler to implement."

---

## Rabin-Karp (進階版)

**什麼時候提到它：**
多 pattern 同時匹配、最長重複子字串（搭配 binary search）、需要快速比較大量子字串的場景。LC 1044 Longest Duplicate Substring 是經典應用。

**核心概念：**
用 rolling hash 把長度為 `k` 的子字串壓縮成一個整數，滑動視窗 O(1) 更新 hash 值。搭配大質數取 mod 控制碰撞率。需要找最長重複子字串時，binary search 長度 + rolling hash 檢查，整體 O(n log n)。

```python
def has_duplicate_of_length(s, length):
    """Check if s has a duplicate substring of given length using rolling hash."""
    base, mod = 31, (1 << 61) - 1  # Mersenne prime
    h, power = 0, 1
    for i in range(length):
        h = (h * base + ord(s[i])) % mod
        if i < length - 1:
            power = power * base % mod
    
    seen = {h}
    for i in range(length, len(s)):
        h = (h - ord(s[i - length]) * power) % mod
        h = (h * base + ord(s[i])) % mod
        if h in seen:
            return True  # 實際應用要二次驗證避免 hash collision
        seen.add(h)
    return False

# Binary search on length to find longest duplicate substring
```

**面試怎麼用：**
"For multiple pattern matching or longest duplicate substring, rolling hash with binary search gives O(n log n)."

---

## Manacher's Algorithm

**什麼時候提到它：**
最長回文子字串，需要嚴格 O(n)。雖然 expand-around-center 的 O(n²) 通常夠用，但知道 Manacher 存在是加分。

**核心概念：**
在字元間插入 `#` 統一奇偶長度處理。維護「目前能延伸最右的回文」的中心 `c` 和右邊界 `r`。對於新位置 `i`，利用對稱性從 `mirror = 2*c - i` 的值開始，跳過已知的部分。每個字元最多被擴展一次，所以是 O(n)。

```python
def manacher(s):
    # 插入 '#' 統一奇偶：'abc' -> '#a#b#c#'
    t = '#' + '#'.join(s) + '#'
    n = len(t)
    p = [0] * n  # p[i] = 以 t[i] 為中心的回文半徑
    c = r = 0    # 目前最右回文的中心與右邊界
    
    for i in range(n):
        mirror = 2 * c - i
        if i < r:
            p[i] = min(r - i, p[mirror])
        # 嘗試擴展
        while i + p[i] + 1 < n and i - p[i] - 1 >= 0 and t[i + p[i] + 1] == t[i - p[i] - 1]:
            p[i] += 1
        # 更新最右回文
        if i + p[i] > r:
            c, r = i, i + p[i]
    
    # 最長回文：max(p) 就是原字串中的回文長度
    max_len = max(p)
    center = p.index(max_len)
    start = (center - max_len) // 2
    return s[start:start + max_len]
```

**面試怎麼用：**
"Manacher's gives O(n) for longest palindromic substring — but expand-around-center O(n²) is usually fine for interview constraints."

---

## Euler Path / Hierholzer's Algorithm

**什麼時候提到它：**
需要用完所有邊恰好一次的路徑或迴路。經典題：LC 332 Reconstruct Itinerary、LC 753 Cracking the Safe。識別信號：「每條邊走一次」、「用完所有票」。

**核心概念：**
DFS 走到走不動（死路）時，把節點加入結果（post-order）。走得動就繼續走。最後把結果 reverse 就是 Euler path。關鍵洞察：死路一定是終點，所以從死路開始往回收集就是正確順序。前提：Euler path 存在的條件是最多兩個節點的度數為奇數。

```python
def find_itinerary(tickets):
    from collections import defaultdict
    graph = defaultdict(list)
    for src, dst in sorted(tickets, reverse=True):  # reverse sort 方便 pop
        graph[src].append(dst)
    
    route = []
    def dfs(node):
        while graph[node]:
            next_node = graph[node].pop()
            dfs(next_node)
        route.append(node)  # post-order：走到死路才加入
    
    dfs("JFK")
    return route[::-1]  # reverse 得到正確順序
```

**面試怎麼用：**
"This is an Euler path problem — Hierholzer's algorithm finds it in O(E log E)."

---

## Tarjan's SCC / Bridge Finding

**什麼時候提到它：**
找強連通分量（SCC）、找割邊（bridge）、找割點（articulation point）。圖論進階題，如 LC 1192 Critical Connections in a Network。

**核心概念：**
DFS 時記錄每個節點的 discovery time（`disc`）和能回溯到的最早時間（`low`）。`low[v] > disc[u]` 代表 `u-v` 是 bridge（切掉這條邊圖就不連通了）。`low[v] >= disc[u]` 代表 `u` 是 articulation point。SCC 版本則是用 stack 收集，當 `low[u] == disc[u]` 時 pop 出一個完整的強連通分量。

```python
def find_bridges(n, edges):
    from collections import defaultdict
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    
    disc = [-1] * n
    low = [0] * n
    bridges = []
    timer = [0]
    
    def dfs(u, parent):
        disc[u] = low[u] = timer[0]
        timer[0] += 1
        for v in graph[u]:
            if disc[v] == -1:  # 未訪問
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > disc[u]:  # bridge!
                    bridges.append((u, v))
            elif v != parent:  # back edge
                low[u] = min(low[u], disc[v])
    
    for i in range(n):
        if disc[i] == -1:
            dfs(i, -1)
    return bridges
```

**面試怎麼用：**
"I'd use Tarjan's algorithm to find bridges/articulation points in O(V+E)."

---

## A* Search

**什麼時候提到它：**
有 heuristic 資訊的最短路問題，例如 grid 上知道終點座標、或有明確的距離下界估計。比 Dijkstra 更快收斂。

**核心概念：**
`f(n) = g(n) + h(n)`，其中 `g` 是起點到 `n` 的實際成本，`h` 是啟發式估計（到終點的預估成本）。`h` 必須是 admissible（不高估真實距離），才保證找到最短路。常用 heuristic：grid 上用 Manhattan distance 或 Euclidean distance。本質上就是 Dijkstra，但 priority queue 的排序依據從 `g` 變成 `f = g + h`。

```python
import heapq

def a_star(grid, start, goal):
    def heuristic(a, b):
        return abs(a[0] - b[0]) + abs(a[1] - b[1])  # Manhattan distance
    
    pq = [(heuristic(start, goal), 0, start)]  # (f, g, node)
    best = {start: 0}
    
    while pq:
        f, g, node = heapq.heappop(pq)
        if node == goal:
            return g
        if g > best.get(node, float('inf')):
            continue
        for dx, dy in [(0,1),(0,-1),(1,0),(-1,0)]:
            nx, ny = node[0]+dx, node[1]+dy
            if 0 <= nx < len(grid) and 0 <= ny < len(grid[0]):
                ng = g + grid[nx][ny]
                if ng < best.get((nx,ny), float('inf')):
                    best[(nx,ny)] = ng
                    heapq.heappush(pq, (ng + heuristic((nx,ny), goal), ng, (nx,ny)))
    return -1
```

**面試怎麼用：**
"With a good heuristic, A* explores far fewer nodes than plain BFS/Dijkstra."

---

## Suffix Array / Suffix Tree

**什麼時候提到它：**
需要多次查詢子字串、找最長重複子字串、最長公共子串（兩個字串拼起來建 suffix array）。字串問題的終極武器。

**核心概念：**
把字串的所有 suffix 排序，得到 suffix array。排序後相鄰 suffix 的 LCP（Longest Common Prefix）就包含了重複子字串的資訊。Suffix array 可以 O(n log n) 或 O(n log²n) 建構，LCP array 可以 O(n) 用 Kasai's algorithm 建構。面試中通常不會要求 O(n) 建構，知道概念和應用場景即可。

```python
def build_suffix_array(s):
    """O(n log²n) 建構，面試夠用"""
    n = len(s)
    suffixes = sorted(range(n), key=lambda i: s[i:])
    return suffixes

def build_lcp_array(s, sa):
    """Kasai's algorithm O(n)"""
    n = len(s)
    rank = [0] * n
    for i, suffix_idx in enumerate(sa):
        rank[suffix_idx] = i
    
    lcp = [0] * n
    k = 0
    for i in range(n):
        if rank[i] == 0:
            k = 0
            continue
        j = sa[rank[i] - 1]
        while i + k < n and j + k < n and s[i + k] == s[j + k]:
            k += 1
        lcp[rank[i]] = k
        k = max(k - 1, 0)
    return lcp

# 最長重複子字串 = max(lcp)
```

**面試怎麼用：**
"Suffix array with LCP array can solve this in O(n log n) — in practice I'd use rolling hash for interviews."

---

## Heavy-Light Decomposition (HLD)

**什麼時候提到它：**
樹上路徑查詢（路徑和、路徑最大值、路徑修改）需要比 O(n) 更快的做法。通常出現在需要大量樹上路徑操作的場景。

**核心概念：**
把樹拆成若干「重鏈」（heavy chain）和「輕邊」（light edge）。重鏈 = 每次走向子樹最大的兒子。任意一條根到葉的路徑最多經過 O(log n) 條輕邊，也就是最多跨 O(log n) 條重鏈。每條重鏈上的節點在 DFS 序中是連續的，所以可以用 Segment Tree 維護。單次路徑查詢 = O(log²n)（跨 log n 條鏈 × 每條鏈 Segment Tree 查詢 log n）。

```python
# 概念示意，完整實作太長（面試不會考）
class HLD:
    def __init__(self, n, adj):
        self.parent = [-1] * n
        self.depth = [0] * n
        self.heavy = [-1] * n   # heavy child
        self.head = [0] * n     # 所在重鏈的鏈頭
        self.pos = [0] * n      # DFS 序中的位置
        # 1) DFS 求 subtree size，找每個節點的 heavy child
        # 2) 第二次 DFS 分配 pos（優先走 heavy child 保證連續）
        # 3) 建 Segment Tree，index = pos[node]
    
    def path_query(self, u, v):
        """查詢 u-v 路徑上的聚合值"""
        res = 0
        while self.head[u] != self.head[v]:
            # 把較深的那條鏈往上跳
            if self.depth[self.head[u]] < self.depth[self.head[v]]:
                u, v = v, u
            res += self.seg_tree.query(self.pos[self.head[u]], self.pos[u])
            u = self.parent[self.head[u]]  # 跳到鏈頭的 parent
        # 同一條鏈上了
        if self.depth[u] > self.depth[v]:
            u, v = v, u
        res += self.seg_tree.query(self.pos[u], self.pos[v])
        return res
```

**面試怎麼用：**
"HLD reduces tree path queries to O(log²n) segment tree queries — but for interview constraints, simpler approaches usually suffice."

---

## 速查表

| 演算法 | 時間複雜度 | 核心用途 | 面試出現率 |
|--------|-----------|---------|-----------|
| KMP | O(n+m) | 字串匹配 | ★★☆ |
| Z-Algorithm | O(n+m) | 字串匹配（更好寫） | ★★☆ |
| Rabin-Karp | O(n) avg | 多 pattern / rolling hash | ★★★ |
| Manacher | O(n) | 最長回文子字串 | ★☆☆ |
| Hierholzer | O(E log E) | Euler path/circuit | ★★☆ |
| Tarjan | O(V+E) | SCC / bridge / articulation | ★★☆ |
| A* | O(E log V) | 有 heuristic 的最短路 | ★★☆ |
| Suffix Array | O(n log n) | 子字串查詢、LCP | ★☆☆ |
| HLD | O(log²n) per query | 樹上路徑查詢 | ★☆☆ |
