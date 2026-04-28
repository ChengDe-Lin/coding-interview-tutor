# Pattern 識別速查

> 下面的速查表 30 秒掃完。詳細卡片在後面。

## 速查表 — 看到什麼 → 想什麼

| 看到什麼 | 想什麼 Pattern | 例 |
|---------|---------------|-----|
| Sorted array + 找 pair / 比兩端 | **Two Pointers — 相向** | LC 167 |
| Linked list cycle / 找中點 | **Two Pointers — 快慢** | LC 142 |
| In-place 改 array、O(1) space | **Two Pointers — 讀寫** | LC 283 |
| Sorted array 找值/邊界 | **Binary Search** | LC 34 |
| 「最小化最大值」/「最大化最小值」 | **BS on Answer** | LC 1011 |
| 連續子串 + 最長/最短/滿足條件 | **Sliding Window** | LC 76 |
| 連續子陣列 sum（可含負數） | **Prefix Sum + Hash Map** | LC 560 |
| 找 complement / 配對 / 頻率統計 | **Hash Map** | LC 1, 49 |
| 最短路徑 / 最少步數（unweighted） | **BFS** | LC 200 |
| 子樹資訊 / 所有可能 / 連通性 | **DFS** | LC 200 |
| 前/後第一個比我大（小）的元素 | **Monotonic Stack** | LC 84 |
| Monotonic Stack + 滑窗/過期淘汰 | **Monotonic Deque** | LC 239, 862 |
| 反覆取最大/最小、merge K sorted | **Heap / PQ** | LC 23 |
| 窮舉所有排列/組合/子集 | **Backtracking** | LC 46 |
| Interval merge / 排序後 greedy | **Sorting + Greedy** | LC 56 |
| 最少/最多/方法數 + 最佳子結構 | **DP 1D** | LC 300 |
| 兩字串比對 / Grid 路徑 / 區間最佳化 | **DP 2D / Interval** | LC 72, 312 |
| 兩組東西配對 + 一維順序 + capacity | **線性指派 DP** | LC 1478 |
| 能不能湊出 target / 背包 | **0/1 Knapsack** | LC 416 |
| 動態合併 + 反覆查連通 | **Union Find** | LC 684 |
| Prefix matching / autocomplete | **Trie** | LC 208 |
| DAG + 依賴順序 / cycle detection | **Topological Sort** | LC 210 |
| Range query + point update 反覆 | **Segment Tree / BIT** | LC 307 |
| 切一半 + merge、count inversions | **Divide and Conquer** | LC 315 |
| 加權圖最短距離 | **Shortest Path** | LC 743 |
| 兩人輪流、先手必勝？ | **Game Theory** | LC 486 |
| 所有 subarray 的 XX 總和 | **Contribution Counting** | LC 907 |
| N ≤ 40 + 子集搜索 | **Meet in the Middle** | LC 1755 |
| 2D 平面事件 / 天際線 | **Line Sweep** | LC 218 |
| 狀態空間搜索（沒給圖） | **Implicit Graph + BFS** | LC 752 |
| 子字串匹配 / 重複子串 | **Rolling Hash** | LC 187, 1044 |
| 多次區間加值 + 最後查一次 | **差分陣列** | LC 1109 |
| 值域 10^9 但元素少 | **Coordinate Compression** | — |
| 正面太難 → 反面算 | **取補集** | — |
| Linked list 操作（merge / reverse / copy） | **Linked List Techniques** | LC 21, 206, 25 |
| Design class, O(1) 操作 | **設計題技巧** | LC 146, 895 |

---

> 以下是每個 pattern 的詳細卡片（Trigger、自問、易混淆）。

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

## 線性指派 DP

**Trigger：**
- 兩組東西要一對一或多對一配對（robot ↔ factory、task ↔ worker、球 ↔ 籃子）
- 每個實體的位置/順序可以映射到一維
- 有 capacity / 容量限制（一個 slot 可以吃多個）
- brute force 是 `k^n` 或 `n!` 量級

**自問：**
1. 「兩邊都 sort 之後，最佳解會不會交叉？」→ 用 exchange argument 證明 non-crossing
2. 「state 能不能用『前 i 個 A、前 j 個 B』？」
3. 「每個 B_j 可以吃多少 A？要不要枚舉 k？」

**反面警訊：** 看到這種題第一反應想 greedy 往往會爆（capacity 限制讓 greedy 失效）。

## Prefix Sum

**Trigger：**
- 連續子陣列的 sum / 平均值 / 差值
- 「subarray sum ≥ k」「subarray sum = k」「subarray sum 最大/最小」
- Range query（區間和）

**自問：** 「這是不是可以轉成兩個 prefix sum 的差？`sum(l..r) = prefix[r+1] - prefix[l]`」

## Monotonic Stack

**Trigger：**
- 找**前/後第一個比我大（或小）的元素**
- 矩形面積（LC 84）、可見人數、溫度等「被擋住」的概念
- 需要 O(n) 掃一遍，每個元素跟「附近的某個極值」互動

**自問：** 「每個元素需要跟它左邊或右邊的某個 nearest greater/smaller 互動嗎？」

**設計原則：** Stack 先只存 index，用 ans array 當累加器。不夠再加東西。不要一開始就塞 tuple。

## Monotonic Deque（雙端操作）

**Trigger：**
- Monotonic stack 的基礎上，還需要**從左端移除元素**（滑動窗口、過期淘汰）
- 「最短 subarray 滿足某條件」+ 有負數（純 sliding window 不適用）
- Prefix sum 上找「最近的值 ≤ threshold」

**自問：**
1. 「右端 pop 維護單調性」（標準操作）
2. 「左端 pop 找答案或淘汰過期」— 用過的 index 未來只會更差嗎？如果是，左端 pop

**關鍵區分：** 右端 pop 是維護結構，左端 pop 是找答案。這是兩個獨立操作，不能混在一起。

**進階選項：** 如果不能左端 pop（需要保留元素），monotonic 結構上做 binary search 也行，O(n log n)。

## Sliding Window

**Trigger：**
- Contiguous subarray/substring + 最長/最短/剛好滿足某條件
- 「at most K distinct」「最多包含 K 個不同字元」
- Fixed size window → 直接滑；Variable size → while 縮左邊界

**自問：** 「答案一定是連續子序列嗎？往右 expand 時條件只會往一個方向變嗎？（單調性）」

**易混淆：** subarray sum 含**負數** → sliding window 失效（expand 不保證 sum 增加），改用 prefix sum + hash map 或 monotonic deque

## Dynamic Programming 1D

**Trigger：**
- 「最少/最多/方法數」+ 每步有有限選擇 + 最佳子結構
- 「能不能達成」(feasibility)、「湊出 target 有幾種方式」
- 經典子型：LIS、House Robber（相鄰限制）、Coin Change（完全背包）

**自問：** 「前 i 個元素的最優解能從 i-1 或 i-2 推出嗎？」

**易混淆：** Greedy 也求最優但不需回看歷史。想不到 greedy 的反例 → 用 greedy；想得到 → DP

## Hash Map

**Trigger：**
- O(1) lookup；配對問題（two sum = complement lookup）
- subarray sum = k → prefix sum + `count[prefix]`
- 頻率統計、anagram 分組

**三大子型：**
1. **配對**：找 complement（two sum）
2. **前綴差**：prefix sum 存 hash，`sum(l..r) = prefix[r] - prefix[l]`
3. **頻率**：grouping、counting、anagram detection

**自問：** 「我是不是在找某個 complement 或之前見過的值？」

**陷阱：** prefix sum 計數要**先查再更新**（避免用到自己）；初始化 `{0: 1}`

## Heap / Priority Queue

**Trigger：**
- 「第 K 大/小」、merge K sorted lists、動態維護 top-K
- Scheduling / 每次取最優先的任務
- 需要反覆從一堆東西裡拿最大/最小

**自問：** 「我需要反覆從一堆東西裡拿最大/最小的嗎？」

**易混淆：** 只需排序一次 → 直接 sort，不需 heap。Median → 雙 heap

**陷阱：** Python `heapq` 只有 min-heap，max-heap 要 negate

## Backtracking

**Trigger：**
- 「列舉所有可能」、permutations、combinations、subsets
- Constraint satisfaction（N-Queens、Sudoku）
- 答案是一組序列/集合，需要窮舉

**自問：** 「需要窮舉所有可能嗎？有沒有明確 constraint 可以剪枝？」

**易混淆：** 只要計數不要列舉 → DP 更快。有 greedy 結構 → 不需回溯

**陷阱：** permutation vs combination 去重邏輯不同（排序 + `if i > start and nums[i] == nums[i-1]: skip`）；記得 undo 選擇

## Sorting + Greedy

**Trigger：**
- Interval scheduling / merge intervals
- 「最少幾個 XX 覆蓋 / 最多幾個不重疊」
- 按某維度排序後 locally optimal = globally optimal

**自問：** 「排序後，greedy 選擇有沒有反例？」→ 想不到反例才用 greedy

**易混淆：** 加了 weight/profit → greedy 失效，改 DP（如 weighted job scheduling）

**陷阱：** 排序 key 很關鍵 — 按 end time 排 → 最多不重疊；按 start 排 → merge intervals

## Union Find

**Trigger：**
- Connected components **動態合併**；反覆查詢「是否連通」
- Redundant edge detection；grid 連通問題（替代 BFS/DFS 的選項）
- 離線處理：倒著加邊比正著刪邊容易

**自問：** 「問題核心是分組/連通性，且有合併操作嗎？」

**易混淆：** 靜態連通（只需跑一次）→ BFS/DFS 就夠。Union Find 優勢在**動態加邊 + 多次查詢**

**陷阱：** `union` 第一步永遠是 `find(u)` 和 `find(v)`，不是直接用 `parent[u]`

## Trie

**Trigger：**
- Prefix matching（autocomplete、prefix count）
- Word search in grid **with dictionary**（多字串同時匹配）
- 多字串共同前綴

**自問：** 「我需要高效做 prefix query 或一次建表多次查前綴嗎？」

**易混淆：** 只需 exact match → Hash Set 更快更簡單。Trie 的優勢在 **prefix 操作**

**陷阱：** `is_end` flag 不能省（否則 "app" 會被 "apple" 覆蓋）

## Topological Sort

**Trigger：**
- DAG + 依賴關係 / 先後順序
- 「能不能完成所有課程」「build order」
- Directed graph cycle detection

**自問：** 「問題有明確的『先做 A 才能做 B』的結構嗎？」

**兩種寫法：** BFS (Kahn's, indegree) 較直觀且能偵測 cycle（最後 count ≠ n → 有 cycle）；DFS (post-order reverse)

**易混淆：** **Undirected** graph cycle detection → Union Find / DFS coloring，不是 topo sort

**陷阱：** 字典序要求 → 用 min-heap 替代 queue

## Segment Tree / BIT

**Trigger：**
- Range query + point update **反覆操作**（區間和、區間最值）
- 離線 + 座標壓縮常搭配

**自問：** 「我需要 O(log n) 同時做 update 和 range query 嗎？」

**BIT vs Segment Tree：** BIT 夠用就用 BIT（prefix sum + point update）；需要區間最值或 lazy propagation → Segment Tree

**易混淆：** 靜態不修改 → Prefix Sum 就夠。只有 point query → 不需要

## Divide and Conquer

**Trigger：**
- 問題可拆成兩個同構子問題 + merge 結果
- Merge sort 應用（count inversions、count smaller after self）
- Closest pair

**自問：** 「切一半後，答案只來自左半、右半、或跨中間？且跨中間能高效算？」

**易混淆：** 「分成子問題」不一定是分治，可能是 DP（分治**無重疊子問題**，DP 有）

## Shortest Path

**Trigger：** 加權圖求最短距離

**選擇：**
- 無權圖 → **BFS** O(V+E)
- 非負權 → **Dijkstra** O(E log V)
- 有負權無負環 → **Bellman-Ford** O(VE)
- 有限 K 步/K 次中轉 → Bellman-Ford（每輪用上一輪 copy，避免連鎖更新）
- 全點對 → **Floyd-Warshall** O(V³)

**自問：** 「邊權有沒有負數？有沒有步數限制？」→ 決定演算法

**易混淆：** 0-1 BFS（權重只有 0 和 1）→ 用 deque 就好，不需 Dijkstra

## Game Theory / Minimax

**Trigger：**
- 兩人輪流操作 +「先手必勝/必敗？」
- 「最優策略下的結果」；石子遊戲、Nim、Predict the Winner

**自問：** 「兩個玩家都最優時，先手能保證勝利嗎？」

**常見解法：** 小規模 → `dp[i][j]` = 當前玩家面對 `[i..j]` 能拿的最大差值；大規模 → 找數學規律（Nim: XOR = 0 → 後手贏）

**易混淆：** 不是所有「兩人遊戲」都需 minimax，有些有 O(1) 數學解

## 設計題常用技巧

**Trigger：** 題目要你 design 一個 class，支援多種操作，每種都要 O(1) 或 O(log n)

**常用 trick：**
- **Freq-indexed stacks**（LC 895）：同一個元素同時存在多個 freq 層。pop 從 maxFreq 層拿，不需要移除低層的 copy
- **Lazy deletion**：heap 裡留著過期 entry，pop 出來才檢查是否有效
- **Swap with last + pop**（LC 380）：array O(1) 刪除

---

# 進階技巧 & Cross-pattern 組合技

> 以下不是獨立 pattern，而是解題時常用的思維工具和組合技。

## Contribution Counting（貢獻法）

**Trigger：**
- 「所有 subarray / subset 的 XX 總和」
- 暴力需要枚舉所有子陣列 O(n²)，但直覺覺得應該能更快

**核心翻轉：** 不枚舉子陣列，反過來算**每個元素對多少子陣列有貢獻**。通常搭配 monotonic stack 找左右邊界。

**自問：** 「能不能換個角度，算每個元素被幾個子陣列包含？」

**代表題：** LC 907 Sum of Subarray Minimums、LC 2104

## Meet in the Middle（折半搜索）

**Trigger：**
- N ≤ 40 的搜索/子集問題
- 2^40 太大但 2^20 可以

**做法：** 分成兩半各搜 2^(N/2)，排序後合併結果（two pointers 或 binary search）

**自問：** 「N ≤ 40？能不能分兩半各搜 2^20 再合併？」

**死信號：** N ≤ 40 + 子集/搜索 = 幾乎一定是 meet in the middle

**代表題：** LC 1755 Closest Subsequence Sum、LC 805

## Line Sweep（掃描線）

**Trigger：**
- 2D 平面上的矩形面積/周長聯集
- 天際線問題（LC 218 The Skyline Problem）
- 需要追蹤「目前有哪些區間是 active」

**做法：** 事件排序（開始/結束），掃描時用 sorted container 或 heap 維護 active set

**自問：** 「能不能把 2D 問題用事件排序降成 1D？」

## Implicit Graph（隱式圖）

**Trigger：**
- 沒有明確給圖，但有狀態空間需要搜索
- 「最少操作次數」「能不能從 A 到 B」

**做法：** 把**狀態當節點、狀態轉移當邊**，用 BFS（最短）或 Dijkstra（加權）搜索

**自問：** 「狀態是什麼？每個狀態能轉移到哪些狀態？」

**代表題：** LC 752 Open the Lock、LC 773 Sliding Puzzle、LC 864 Shortest Path to Get All Keys

## Rolling Hash（Rabin-Karp）

**Trigger：**
- 子字串匹配（多模式或需要比暴力快）
- 最長重複子字串（搭配 binary search）

**做法：** O(1) 算子字串 hash，滑動窗口更新。搭配二分找最長重複。

**自問：** 「我需要快速比較多個子字串是否相等嗎？」

**代表題：** LC 1044 Longest Duplicate Substring、LC 187

## 差分陣列（Difference Array）

**Trigger：**
- 多次區間 `[l, r]` 加一個值 → 最後查詢整個陣列
- 「每次操作影響一個範圍」

**做法：** `diff[l] += val`、`diff[r+1] -= val`，最後做 prefix sum 還原

**自問：** 「有多次區間修改 + 最後一次查詢嗎？」

**易混淆：** 需要**每次修改後立刻查詢** → 差分不夠，要 Segment Tree with lazy propagation

## Coordinate Compression（座標壓縮）

**Trigger：**
- 值域很大（10^9）但元素數量少（10^5）
- 需要用 BIT/Segment Tree 做區間操作

**做法：** 排序去重 → 用 rank 替代原值 → 值域從 10^9 壓到 10^5

**自問：** 「我只在乎相對大小，不在乎絕對值嗎？」

## Problem Transformation Toolkit（思維轉換工具箱）

這些不是 pattern，是 **problem reduction** 的思維工具：

- **取補集：** 「至少 k 個」= 全部 - 「少於 k 個」→ 正面難算時反面算
- **正難則反：** 「最少刪幾個」=「最多留幾個」
- **圖染色 = Bipartite check：** 二部圖判定用 BFS/DFS 染色
- **矩陣旋轉：** 順時針 90° = transpose + reverse each row
- **區間問題 ↔ 事件問題：** 區間 `[s, e]` = 在 s 開始、在 e 結束兩個事件

**自問：** 「正面太難，反面會不會更簡單？能不能轉化成已知的 pattern？」

---

*Last updated: 2026-04-28*
