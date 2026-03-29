---
last_updated: 2026-03-28
status: 學習中
tier: 2
---

# Union Find (Disjoint Set Union)

## 核心觀念

維護一堆不相交的集合，支援合併和查詢。用 tree 表示每個集合，root 是代表人。

**Graph 是真實的關係，Tree 只是查詢工具。** Tree 的邊和 graph 的邊是兩回事。

## 識別信號

- 動態合併 + 查連通性
- 邊一條一條加入 + 判斷是否形成 cycle
- 帶權重的等價關係（parity、距離）

## 程式模板

### 基本版
```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, u):
        if self.parent[u] != u:
            self.parent[u] = self.find(self.parent[u])  # path compression
        return self.parent[u]

    def union(self, u, v):
        pu, pv = self.find(u), self.find(v)
        if pu == pv: return False
        self.parent[pv] = pu
        return True
```

### Weighted 版（帶 parity）
```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.parity = [0] * n  # 到 parent 那一段的 parity

    def find(self, u):
        if self.parent[u] != u:
            root = self.find(self.parent[u])
            self.parity[u] ^= self.parity[self.parent[u]]  # 累加到 root
            self.parent[u] = root
        return self.parent[u]

    def union(self, u, v, w):
        pu, pv = self.find(u), self.find(v)
        if pu == pv:
            return (self.parity[u] ^ self.parity[v] ^ w) == 0
        self.parent[pv] = pu
        self.parity[pv] = self.parity[u] ^ self.parity[v] ^ w  # 用 u, v 不是 pu, pv！
        return True
```

## 複雜度

| 操作 | 複雜度 | 說明 |
|------|--------|------|
| find | O(α(n)) ≈ O(1) | path compression，amortized |
| union | O(α(n)) ≈ O(1) | 依賴 find |

## 常見陷阱

- **Weighted union 用 u, v 不是 root**：`parity[pv] = parity[u] ^ parity[v] ^ w`，root 的 parity 是 0 沒有資訊
- **find 時 parity 更新順序**：先遞迴壓縮 parent，再 XOR parent 的 parity，最後改 parent 指向 root
- **Python recursion limit**：n 大時 find 遞迴可能爆，加 `sys.setrecursionlimit`

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 200 Number of Islands (UF 解法) | Medium | 基本 union find | 未做 |
| LC 547 Number of Provinces | Medium | 基本 union find | 未做 |
| Contest: Even Cycle Edges | Hard | Weighted UF，parity 判斷 cycle 奇偶 | 學習中 |
