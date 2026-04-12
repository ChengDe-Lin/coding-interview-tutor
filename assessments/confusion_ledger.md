# Confusion Ledger — 盲區追蹤

> 每次討論後自動更新。定期複習以強化修正。

| 日期 | 主題 | 我的盲區/錯誤認知 | 核心正解 | 狀態 | 複習建議 |
|------|------|-------------------|---------|------|---------|
| 2026-03-23 | Trapping Rain Water | 不知道怎麼從 prefix max 陣列解法進化到 two pointer O(1) space | max 小的那邊水量已經確定，不需要知道另一邊精確值，所以可以安全處理並移動 | 已修正 | 2026-03-26 驗收通過：能清楚解釋為何 right_max 非精確值仍安全 |
| 2026-03-24 | LCA (DFS) | DFS 遞迴忘記 base case `if not node: return None`，到 leaf children 時 crash | 任何遞迴第一行一定要處理 None/空節點 | 已修正 | 2026-03-26 驗收通過：能完整口述 LCA 遞迴邏輯含 base case 與回傳值語意 |
| 2026-03-25 | Sliding Window (LC 76) | right 語意混淆導致 off-by-one：right 已經 += 1 後窗口是 [left, right)，但用 right - left + 1 計算長度 | 決定好 right 是「下一個待處理」還是「窗口最後元素」，用 for loop right 代表當前元素最不易錯 | 已修正 | 2026-03-26 驗收通過：LC 209 正確使用 for loop right，無 off-by-one |
| 2026-03-25 | Sliding Window (LC 76) | 用 if/else 分離 expand 和 shrink，導致最後一個有效窗口漏記、shrink 過程中更小的有效窗口漏記 | 標準結構：永遠 expand → while 有效時 shrink + 記錄答案。不要發明 if/else 變體 | 已修正 | 2026-03-26 驗收通過：LC 209 直接用標準 expand → while shrink 結構 |
| 2026-03-25 | Sliding Window (LC 424) | 第一直覺想用 DP 而非 Sliding Window | 看到「連續子字串」+「最長/最短滿足條件」→ 優先想 Sliding Window | 已修正 | 2026-03-26 驗收通過：LC 209 直接辨識為 sliding window |
| 2026-03-25 | Python | 以為 `set.remove()` 找不到元素會靜默忽略 | `set.remove()` 找不到會拋 KeyError，要用 `set.discard()` 才會靜默忽略 | 已修正 | 2026-03-30 驗收通過（第二次） |
| 2026-03-26 | Binary Search (LC 34) | lower bound 的 right 初始值用 `len(nums)-1`，導致 target 大於所有元素時無法回傳 past-end index | 搜尋空間是 `[0, n]` 而非 `[0, n-1]`，right 初始值要用 `len(nums)` | 已修正 | 2026-03-30 驗收通過 |
| 2026-03-26 | Sliding Window (LC 567) | Fixed window 建完初始窗口後忘記檢查是否已匹配，直接開始滑動 | 初始窗口建完後要先檢查一次是否滿足條件，再開始滑 | 已修正 | 2026-03-30 驗收通過 |
| 2026-03-26 | Python (Counter/defaultdict) | 用 `defaultdict(int)` 比較時，值為 0 的 key 會影響 `==` 判斷 | `Counter` 比較時自動忽略 0 值 entry，freq map 比較優先用 `Counter` | 已修正 | 2026-03-30 驗收通過 |
| 2026-03-27 | Python (nonlocal) | 內層函式用 `ans = max(...)` 修改外層變數，以為 int 傳參能直接改外層 | Python int 是 immutable，要用 `nonlocal ans` 宣告才能修改外層函式的變數 | 已修正 | 2026-03-30 驗收通過 |
| 2026-03-27 | Monotonic Stack (LC 84) | pop 時 `count += 1` 沒累加被 pop 元素的 leftCount，導致左延伸長度短算 | `count += 1 + leftCount`，被 pop 元素的左延伸要傳遞給新元素 | 已修正 | 2026-03-30 驗收通過 |
| 2026-03-28 | LC 410 (Binary Search on Answer) | 只想到 DP 解法，沒想到可以用 BS on Answer 做到 O(n log S) | 看到「最小化最大值」或「最大化最小值」→ 第一反應想 BS on Answer。把最佳化問題轉成判定問題：「如果上限是 X，feasible 嗎？」 | 已修正 | 2026-03-31 驗收通過 |
| 2026-03-28 | DP (LC 91) | 兩位數解碼只檢查 ≤ 26，忘記檢查 ≥ 10，導致 leading zero（如 "02"）被當合法 | 兩位數合法範圍是 `10 <= x <= 26`，左邊界排除 leading zero | 已修正 | 2026-03-31 驗收通過 |
| 2026-03-28 | Contest (Combination + MOD) | 用 float 除法算 C(n,k) 導致精度錯誤，用 math.comb 大整數導致 TLE | 需要 mod 時用 factorial + inverse factorial 模板（Fermat's little theorem），全程在 mod 下運算 | 低優先級 | 面試不考，競賽才需要 |
| 2026-03-28 | Contest (DP + Prefix Sum) | 沒想到用 prefix sum 加速「所有 ≤ v 的狀態加總」的 DP 轉移 | 當 DP 轉移是 Σ dp[v'] for v' ≤ v 時，先對上一行做 prefix sum，查詢變 O(1) | 已修正 | 2026-03-31 驗收通過 |
| 2026-04-02 | 區間 DP (LC 312) | base case 想回傳 1 而非 0；搞混「最後戳的氣球鄰居是 1」vs「鄰居是區間外邊界」 | 枚舉最後戳的 `i`，此時區間內其他都沒了，鄰居是 `nums[l-1]` 和 `nums[r+1]`。空區間 `l > r` return 0，`l == r` 自然被 for loop 處理 | 已修正 | 2026-04-12 限時實作 LC 1039 通過 |
| 2026-04-03 | 2D DP (LC 10) | base case range 上界少了 +1；非 `*` 分支誤寫 `p[j-1] == "*"` 應為 `"."` | 仔細區分 `*` 和 `.` 的角色。base case `dp[0][j]` 的 range 要到 `len(p)+1` | 需複習 | 注意 typo 型 bug，寫完要 trace 一個 case |
| 2026-04-03 | Quickselect | 完全忘記 Quickselect 怎麼做，不知道怎麼判斷第 k 個在哪一半 | partition 後 pivot 在 index p，p==k 結束，p<k 遞迴右半，p>k 遞迴左半。只遞迴一邊所以 n+n/2+n/4+...=O(n) | 已修正 | 2026-04-09 驗收通過 |
| 2026-04-05 | 雙目標 DP（Contest） | 不知道 DP cell 可以存 tuple 處理「先最大化 A 再最小化 B」的雙目標 | 存 `(-count, ops)` tuple，利用 Python tuple lexicographic 比較直接取 `min`。任何有優先級的多目標 DP 都能用這個技巧 | 已修正 | 2026-04-09 驗收通過，能完整口述 DP 結構和 tuple 比較技巧 |
| 2026-04-08 | 0/1 Knapsack (LC 416) | 第一反應用 backtracking，沒想到用 set 追蹤可達 sum 做到 O(n*target) | 「能不能湊出某個 sum」→ 0/1 knapsack。用 set 或 boolean DP array 追蹤所有可達值，每個元素選或不選 | 已修正 | 2026-04-12 驗收通過 |
| 2026-04-09 | 0/1 Knapsack (LC 494) | 用 shift array 做時搞混掃描方向和轉移邏輯；數學轉換 P=(total+target)/2 面試時不確定能想到 | 兩種做法：(1) dict 每輪建 newCounts 天然隔離上一輪 (2) 數學轉換成標準 knapsack + 倒著掃。記住：`(total+target)` 是奇數要直接 return 0 | 已修正 | 2026-04-12 驗收通過 |
| 2026-04-09 | Bit Manipulation (LC 137) | XOR 不夠用時想不到「一 bit 一 bit 看 + mod k」的通用思路；Python 負數處理坑：`num // 2` 會無窮迴圈、`int` 無限長 | (1) 遇到「每個數出現 k 次、找出現 1 次的」→ 每 bit 累加 mod k (2) Python bit op 處理負數：mask 成 32-bit unsigned (`(num >> i) & 1`)，最後若 `ans >= 2^31` 就 `-= 2^32` 轉回 signed | 需複習 | 再出一題類似結構驗收 |
| 2026-04-11 | Bitmask DP 識別 | 不確定什麼時候該想到 bitmask DP | 識別信號：(1) n ≤ 20 (2)「選了哪些」影響決策，不只是數量 (3) backtracking 有重複子問題 (4) TSP 型或分配型問題。跟 bitmask BFS 的差別：BFS 求最短路徑，DP 求最優值/方法數 | 已修正 | 2026-04-12 驗收通過 |
| 2026-04-11 | Array O(1) 刪除 (LC 380) | 不知道 array 中間刪除可以 O(1)：跟最後一個元素交換再 pop | 需要 O(1) 刪除 array 元素時：swap with last + pop。配合 dict 記錄每個值的 index，swap 後要更新 dict | 已修正 | 2026-04-12 驗收通過 |
| 2026-04-12 | LC 1235 Job Scheduling | 待驗收——不要提示 pattern，限時獨立解 | DP + Binary Search 組合題 | 需複習 | 下次 session 出題，不提示做法 |