# Confusion Ledger — 盲區追蹤

> 每次討論後自動更新。定期複習以強化修正。

| 日期 | 主題 | 我的盲區/錯誤認知 | 核心正解 | 狀態 | 複習建議 |
|------|------|-------------------|---------|------|---------|
| 2026-03-23 | Trapping Rain Water | 不知道怎麼從 prefix max 陣列解法進化到 two pointer O(1) space | max 小的那邊水量已經確定，不需要知道另一邊精確值，所以可以安全處理並移動 | 已修正 | 2026-03-26 驗收通過：能清楚解釋為何 right_max 非精確值仍安全 |
| 2026-03-24 | LCA (DFS) | DFS 遞迴忘記 base case `if not node: return None`，到 leaf children 時 crash | 任何遞迴第一行一定要處理 None/空節點 | 已修正 | 2026-03-26 驗收通過：能完整口述 LCA 遞迴邏輯含 base case 與回傳值語意 |
| 2026-03-25 | Sliding Window (LC 76) | right 語意混淆導致 off-by-one：right 已經 += 1 後窗口是 [left, right)，但用 right - left + 1 計算長度 | 決定好 right 是「下一個待處理」還是「窗口最後元素」，用 for loop right 代表當前元素最不易錯 | 已修正 | 2026-03-26 驗收通過：LC 209 正確使用 for loop right，無 off-by-one |
| 2026-03-25 | Sliding Window (LC 76) | 用 if/else 分離 expand 和 shrink，導致最後一個有效窗口漏記、shrink 過程中更小的有效窗口漏記 | 標準結構：永遠 expand → while 有效時 shrink + 記錄答案。不要發明 if/else 變體 | 已修正 | 2026-03-26 驗收通過：LC 209 直接用標準 expand → while shrink 結構 |
| 2026-03-25 | Sliding Window (LC 424) | 第一直覺想用 DP 而非 Sliding Window | 看到「連續子字串」+「最長/最短滿足條件」→ 優先想 Sliding Window | 已修正 | 2026-03-26 驗收通過：LC 209 直接辨識為 sliding window |
| 2026-03-25 | Python | 以為 `set.remove()` 找不到元素會靜默忽略 | `set.remove()` 找不到會拋 KeyError，要用 `set.discard()` 才會靜默忽略 | 需複習 | 需要安全移除時用 discard |
| 2026-03-26 | Binary Search (LC 34) | lower bound 的 right 初始值用 `len(nums)-1`，導致 target 大於所有元素時無法回傳 past-end index | 搜尋空間是 `[0, n]` 而非 `[0, n-1]`，right 初始值要用 `len(nums)` | 需複習 | 寫 binary search 時先想清楚搜尋空間是否需要包含 past-end |
| 2026-03-26 | Sliding Window (LC 567) | Fixed window 建完初始窗口後忘記檢查是否已匹配，直接開始滑動 | 初始窗口建完後要先檢查一次是否滿足條件，再開始滑 | 需複習 | Fixed window 題建完初始窗口後第一件事就是檢查 |
| 2026-03-26 | Python (Counter/defaultdict) | 用 `defaultdict(int)` 比較時，值為 0 的 key 會影響 `==` 判斷 | `Counter` 比較時自動忽略 0 值 entry，freq map 比較優先用 `Counter` | 需複習 | 需要比較 freq map 時用 Counter 而非 defaultdict |
| 2026-03-27 | Python (nonlocal) | 內層函式用 `ans = max(...)` 修改外層變數，以為 int 傳參能直接改外層 | Python int 是 immutable，要用 `nonlocal ans` 宣告才能修改外層函式的變數 | 需複習 | DFS 需要追蹤全域最佳值時，記得 nonlocal |
| 2026-03-27 | Monotonic Stack (LC 84) | pop 時 `count += 1` 沒累加被 pop 元素的 leftCount，導致左延伸長度短算 | `count += 1 + leftCount`，被 pop 元素的左延伸要傳遞給新元素 | 需複習 | Stack 裡存額外資訊時，pop 的時候想清楚該資訊要不要傳遞 |