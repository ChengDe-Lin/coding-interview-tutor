---
last_updated: 2026-03-28
status: 學習中
tier: 1
---

# Hash Map Patterns

## 核心觀念

Hash Map 提供 O(1) 查找，在演算法題中通常不是主角而是輔助——用來加速其他 pattern 的查找步驟。

## 識別信號

- 需要 O(1) 查找/計數
- 「找兩個元素滿足某條件」→ 遍歷時存 complement
- 「分組」「歸類」→ 用共同特徵當 key
- Prefix sum 系列 → hash map 存已見過的 prefix sum

## 常見子模式

### 1. Complement Lookup
遍歷時把「我需要的東西」或「我見過的東西」存進 map。
- LC 1 Two Sum
- LC 167 Two Sum II（sorted → two pointers 更好）

### 2. Frequency Count / Grouping
- LC 49 Group Anagrams：`tuple(sorted(word))` 當 key
- LC 347 Top K Frequent：freq map + heap 或 bucket sort

### 3. Prefix Sum + Hash Map
`prefix[j] - prefix[i] = k` → 查 `prefix[j] - k` 是否在 map 裡。
- LC 560 Subarray Sum Equals K
- LC 523 Continuous Subarray Sum（mod k）

### 4. Index / State Tracking
記住某個值上次出現的位置或狀態。
- LC 3 Longest Substring Without Repeating Characters
- LC 76 Minimum Window Substring

## 複雜度

| 操作 | 平均 | 最差 |
|------|------|------|
| 查找/插入/刪除 | O(1) | O(n) (hash collision) |
| 空間 | O(n) | O(n) |

## 常見陷阱

- Python `dict` 的 key 必須是 hashable（list 不行，要轉 tuple）
- `defaultdict` vs `Counter` 比較行為不同（Counter 忽略 0 值）
- Prefix sum 系列初始值 `{0: 1}` 容易忘

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 1 Two Sum | Easy | Complement lookup | 已掌握 |
| LC 49 Group Anagrams | Medium | Grouping by sorted key | 未做 |
| LC 560 Subarray Sum Equals K | Medium | Prefix sum + hash map | 已掌握 |
| LC 146 LRU Cache | Medium | Hash map + doubly linked list | 已掌握 |
