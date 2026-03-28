---
last_updated: 2026-03-24
status: 學習中
tier: 1
---

# Binary Search

## 核心觀念

在一個具有**單調性**的搜尋空間中，每次用中間值判斷，排除一半，O(log n) 找到答案。不只是「sorted array 找值」——任何能定義出 `condition(mid)` 且結果呈現 `FFFFTTTTT` 分界的問題都能用。

## 識別信號

- Sorted array 找值、找邊界
- 題目問「最小的滿足 X」或「最大的滿足 X」→ Binary Search on Answer
- 搜尋空間巨大但有單調性（答案越大越容易滿足、或越小越容易滿足）

## 程式模板

**只記這一個（找第一個滿足條件的位置）：**

```python
# 找第一個使 condition(mid) 為 True 的位置
# 搜尋空間呈現 [F, F, F, ..., T, T, T]，找第一個 T
while left < right:
    mid = (left + right) // 2
    if condition(mid):
        right = mid       # mid 可能是答案，保留
    else:
        left = mid + 1    # mid 一定不是答案
# 結束時 left == right，就是答案
```

**找右邊界不需要另一個模板** — 反轉 condition 就好。
例如「最後一個 ≤ 3」等價於「第一個 > 3 的位置 - 1」。

**口訣：** 誰不動（不 ±1）就往誰的反方向取整。`right = mid` → 向下取整。

## 複雜度

| 面向 | 複雜度 | 說明 |
|------|--------|------|
| 時間 | O(log n) | 每次砍半搜尋空間 |
| 空間 | O(1) | 只用幾個變數 |

## 常見陷阱

- `while left < right`（不是 `<=`），用模板 B 時迴圈結束時 `left == right` 就是答案
- 找右邊界如果用 `left = mid`，必須向上取整 `(left+right+1)//2`，否則死迴圈
- 不要忘記處理「答案不存在」的邊界情況（迴圈結束後驗證一下）
- Binary Search on Answer 時，要想清楚搜尋空間的 left 和 right 初始值

## 變體

- **Classic：** sorted array 找確切值（模板 A，但模板 B 也能做）
- **左邊界 / 右邊界：** 找第一個或最後一個滿足條件的位置
- **Binary Search on Answer：** 搜尋空間不是 array index 而是答案本身的值域，配合一個 `feasible(mid)` 函式判斷

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 704 Binary Search | Easy | 基本搜尋 | 已掌握 |
| LC 34 Find First and Last Position | Medium | 左右邊界，right 初始值要 len(nums) 不是 len(nums)-1 | 已掌握 |
| LC 875 Koko Eating Bananas | Medium | Binary Search on Answer，搜尋空間 [1, max(piles)] | 已掌握 |
| LC 153 Find Minimum in Rotated Sorted Array | Medium | `nums[mid] > nums[right]` → 最小值在右邊，否則在左邊（含 mid） | 已掌握 |
