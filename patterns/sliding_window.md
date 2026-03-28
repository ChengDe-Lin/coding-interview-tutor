---
last_updated: 2026-03-25
status: 學習中
tier: 1
---

# Sliding Window

## 核心觀念
在連續子陣列/子字串上維護一個窗口，透過 expand（右移右指標）和 shrink（右移左指標）動態調整範圍，避免重複計算窗口內的狀態。跟 Two Pointers 的差別：Sliding Window 關注的是兩個指標**之間的連續區間**，通常維護窗口內的某種狀態（sum、count、frequency map）。

## 識別信號
- 題目出現「連續子陣列」或「連續子字串」
- 要求「最長/最短滿足某條件」的區間
- 給定窗口大小 k，求某種窗口內的最值

## 程式模板

### Variable Window（面試主力）
```python
def variable_window(s):
    left = 0
    # 初始化窗口狀態（freq map、counter 等）
    ans = 0  # 或 float("inf")

    for right in range(len(s)):
        # 1. expand: 把 s[right] 加入窗口，更新狀態

        # 2. shrink while 窗口無效（或有效，取決於求最長還是最短）
        while 窗口無效:
            # 移除 s[left]，更新狀態
            left += 1

        # 3. 記錄答案
        ans = max(ans, right - left + 1)  # 最長
        # ans = min(ans, right - left + 1)  # 最短（放在 while 裡面）

    return ans
```

### Fixed Window
```python
def fixed_window(nums, k):
    window_sum = sum(nums[:k])
    ans = window_sum
    for right in range(k, len(nums)):
        window_sum += nums[right] - nums[right - k]
        ans = max(ans, window_sum)
    return ans
```

## 複雜度

| 面向 | 複雜度 | 說明 |
|------|--------|------|
| 時間 | O(n) | left 和 right 各自最多走 n 步 |
| 空間 | O(1) 或 O(k) | 取決於窗口狀態的資料結構（freq map 最多 O(26) 或 O(字元集大小）） |

## 常見陷阱
- **right 語意混淆**：right 是「下一個待處理位置」還是「窗口最後一個元素」？決定好就不要混用，直接影響 off-by-one。用 for loop 的 `right` 代表當前加入的元素最不容易錯。
- **if/else 分離 expand 和 shrink**：會導致邊界漏記答案。正確結構是「永遠 expand，然後嘗試 shrink」。
- **答案記錄位置**：求最短時，答案要在 shrink 的 while **裡面**記錄（每次 shrink 都可能產生更短的有效窗口）。求最長時在 while **外面**。
- **Minimum Window Substring 的 counter 方向**：expand 時 counter -1（滿足需求），shrink 時 counter +1（失去需求），方向不要搞反。

## 變體
- **Fixed Window**：窗口大小固定為 k，每次右移一步、左邊自動移出。較簡單。
- **Variable Window（求最長）**：shrink 條件是窗口無效，在 while 外記錄答案。
- **Variable Window（求最短）**：shrink 條件是窗口有效，在 while 裡記錄答案（如 LC 76）。
- **maxFreq 只增不減 trick**：LC 424 的優化。因為求最長，答案只在 maxFreq 增大時更新，過時的 maxFreq 只會讓窗口維持在舊的最大長度，不影響正確性。

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 3 Longest Substring Without Repeating Characters | Medium | set 追蹤窗口狀態，逐步 shrink 保持 set 一致 | 已掌握 |
| LC 76 Minimum Window Substring | Hard | freq map + counter，求最短要在 while 裡記答案 | 已掌握 |
| LC 424 Longest Repeating Character Replacement | Medium | 窗口長度 - maxFreq > k 時 shrink，maxFreq 可用 O(26) 或只增不減 | 已掌握 |
| LC 209 Minimum Size Subarray Sum | Medium | 求最短的 sum ≥ target 子陣列 | 已掌握 |
| LC 438 Find All Anagrams in a String | Medium | 類似 LC 76，fixed window 變體 | 未做 |
| LC 567 Permutation in String | Medium | Fixed window + Counter 比較，初始窗口要先檢查 | 已掌握 |
| LC 239 Sliding Window Maximum | Hard | Max heap + lazy deletion O(n log n) 或 monotonic deque O(n) | 已掌握 |
