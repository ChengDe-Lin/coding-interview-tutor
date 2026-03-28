---
last_updated: 2026-03-27
status: 學習中
tier: 1
---

# Stack / Monotonic Stack

## 核心觀念

Monotonic Stack 維護一個單調遞增或遞減的 stack，用來在 O(n) 內解決「對每個元素，找到左邊/右邊第一個比它大/小的元素」。每個元素最多 push 一次、pop 一次，所以總時間 O(n)。

## 識別信號

- Next Greater / Next Smaller Element
- 每個元素被「左右第一個比它高/低的東西」夾住（如直方圖最大矩形）
- 括號匹配、巢狀結構（普通 stack）

## 程式模板

### 找右邊第一個比它大的（遞減 stack）
```python
stack = []  # 存 index，對應值維持遞減
for i in range(len(nums)):
    while stack and nums[i] > nums[stack[-1]]:
        idx = stack.pop()
        # nums[i] 就是 nums[idx] 的 next greater element
        result[idx] = i - idx  # 或 nums[i]，看題目要什麼
    stack.append(i)
```

### 找右邊第一個比它小的（遞增 stack）
```python
stack = []  # 存 index，對應值維持遞增
for i in range(len(nums)):
    while stack and nums[i] < nums[stack[-1]]:
        idx = stack.pop()
        # nums[i] 就是 nums[idx] 的 next smaller element
    stack.append(i)
```

## 複雜度

| 面向 | 複雜度 | 說明 |
|------|--------|------|
| 時間 | O(n) | 每個元素最多 push/pop 各一次 |
| 空間 | O(n) | stack 最多存 n 個元素 |

## 常見陷阱

- Stack 裡存 index 而非 value，這樣才能同時拿到位置和值
- 遍歷結束後 stack 裡剩餘的元素代表「沒有 next greater/smaller」

## 變體

- **遞減 stack**：pop 掉比新元素小的 → 找 next greater
- **遞增 stack**：pop 掉比新元素大的 → 找 next smaller
- **Monotonic Deque**：本質是 monotonic stack + 左邊過期清理，用在 sliding window min/max

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 739 Daily Temperatures | Medium | 遞減 stack 找 next warmer day | 已掌握 |
| LC 84 Largest Rectangle in Histogram | Hard | 遞增 stack，pop 時算面積，leftCount 要累加傳遞 | 已掌握 |
| LC 496 Next Greater Element I | Easy | 基本 next greater + hash map | 未做 |
| LC 503 Next Greater Element II (Circular) | Medium | 遍歷兩次陣列處理 circular | 未做 |
| LC 42 Trapping Rain Water (stack 解法) | Hard | 遞減 stack，pop 時計算夾住的水 | 未做 |
