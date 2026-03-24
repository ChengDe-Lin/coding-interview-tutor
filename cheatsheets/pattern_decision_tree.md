# Pattern 識別速查

> 每個 pattern 獨立一張卡片，列出「看到什麼 → 想到它」的信號。
> 不用背樹狀結構，只要記住每個 pattern 的 trigger。

---

## Two Pointers

### 相向指標 (Opposite)
**Trigger：** sorted array + 找 pair／比較兩端
**自問：** 「我能透過比較兩端，安全排除一側嗎？」

### 快慢指標 (Fast/Slow)
**Trigger：** linked list cycle／找中點／值域 = index 範圍的重複問題
**自問：** 「這裡有 cycle 嗎？需要兩個不同速度的探針嗎？」

### 讀寫指標 (Read/Write)
**Trigger：** in-place 修改 array、O(1) space、移動或去重元素
**自問：** 「能不能一個指標讀、一個指標寫，一趟搞定？」

## Binary Search

**Trigger：**
- Sorted array 找值／邊界
- 題目問「最小的能滿足 X」或「最大的能滿足 X」
- 看到「最小化最大值」或「最大化最小值」→ 幾乎一定是 Binary Search on Answer
- 搜尋空間超大（如 `[1, 10^9]`）但答案有方向性

**自問：** 「答案空間有沒有單調性？某個值滿足條件，比它大（或小）的是不是也一定滿足？」

## BFS / DFS

**Trigger：**
- Tree / Graph 遍歷、Grid 搜尋
- 問「最短路徑 / 最少步數」→ BFS
- 問「所有可能」「存不存在路徑」「連通性」→ DFS
- 需要 level-order 或多起點同時擴散 → BFS
- 需要遞迴回傳子樹資訊 → DFS

**自問：** 「我需要的是最短距離（BFS），還是窮舉/路徑/子樹資訊（DFS）？」

---

*Last updated: 2026-03-24*
