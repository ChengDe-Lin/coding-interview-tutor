---
last_updated: 2026-03-23
status: 需複習
tier: 1
---

# Two Pointers

## 核心觀念
利用兩個指標在已排序（或有特定結構）的序列上同時移動，避免暴力雙層迴圈，將 O(n^2) 降為 O(n)。

## 識別信號
- 題目給的是 sorted array 或可以先排序
- 要找兩個元素滿足某種條件（sum, difference）
- 需要 in-place 操作（remove duplicates, partition）

## 程式模板

```python
def two_sum_sorted(nums: list[int], target: int) -> list[int]:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        s = nums[lo] + nums[hi]
        if s == target:
            return [lo, hi]
        elif s < target:
            lo += 1
        else:
            hi -= 1
    return []
```

## 複雜度
- Time: O(n) — 每個指標最多走 n 步
- Space: O(1) — 只用兩個變數

## 常見陷阱
- 忘記處理 duplicate elements（跳過重複值）
- while 條件用 `lo <= hi` 還是 `lo < hi` 要看具體問題

## 變體
- **Same direction**: fast/slow pointer（linked list cycle detection）
- **Opposite direction**: 從兩端往中間（上面的模板）
- **三指標**: 3Sum 問題，固定一個 + two pointers

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 1 Two Sum | Easy | Hash map 更快，但 sorted 版用 two pointers | 已掌握 |
| LC 15 3Sum | Medium | 去重 + 排序 + two pointers | 需複習 |
| LC 283 Move Zeroes | Easy | 讀寫指標，一趟掃完 | 已掌握 |
| LC 75 Sort Colors | Medium | 三指標 partition (Dutch National Flag) | 已掌握 |
| LC 11 Container With Most Water | Medium | 移動較短的那邊 | 已掌握 |
| LC 42 Trapping Rain Water | Hard | 兩端夾，小 max 那邊先處理，水量已確定 | 已掌握 |
