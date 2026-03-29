---
last_updated: 2026-03-28
status: 學習中
tier: 1
---

# Backtracking

## 核心觀念

試了再撤回。做選擇 → 遞迴 → 撤銷選擇 → 試下一個。窮舉所有可能方案的系統化方法。

跟 DFS 的差別：DFS visited 加了不拿，Backtracking 會撤銷。

## 識別信號

- 「列出所有 XX」（組合、排列、子集、路徑）
- 「所有可能的方案數」（但如果只要數量不要列舉，DP 可能更快）
- 搜尋空間是決策樹

## 程式模板

```python
def backtrack(path, start):
    if 滿足條件:
        result.append(path[:])  # 收集答案（要 copy！）
        return
    for i in range(start, len(choices)):
        path.append(choices[i])   # 做選擇
        backtrack(path, i + 1)    # 往下（i+1 避免重複）
        path.pop()                # 撤銷
```

## 三大經典問題

| 問題 | choices | start 規則 | 收集時機 |
|------|---------|-----------|---------|
| Subsets | 選或不選 | i+1 | 每個節點都收集 |
| Combinations | 從 start 開始選 | i+1 | path 長度 = k 時 |
| Permutations | 所有未用過的 | 用 used set | path 長度 = n 時 |

## 剪枝

Backtracking 的效率靠剪枝：提前排除不可能的分支。
- 排序後跳過重複元素
- 剩餘元素不夠時提前 return
- 當前 path 已經不合法時提前 return

## 複雜度

通常是指數級 O(2^n) 或 O(n!)，但剪枝可以大幅減少實際搜尋量。

## 常見陷阱

- 收集答案時忘記 copy：`result.append(path[:])` 不是 `result.append(path)`
- Permutations 用 used set，Combinations/Subsets 用 start index
- 有重複元素時要排序 + `if i > start and nums[i] == nums[i-1]: continue`

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 78 Subsets | Medium | 基本 backtracking | 未做 |
| LC 46 Permutations | Medium | used set | 未做 |
| LC 39 Combination Sum | Medium | 可重複選，start = i 不是 i+1 | 已掌握 |
| LC 51 N-Queens | Hard | 行/列/對角線剪枝 | 已掌握 |
