# Cheat Sheet — 面試前速查

> 這裡的每一條都來自你個人踩過的坑。面試前 30 分鐘掃一遍。

## Two Pointers

- **相向指標正確性論證：** 每次移動都排除一個不可能更優的配對，所以不會漏答案。
- **Trapping Rain Water 核心：** 每個位置的水量 = `min(leftMax, rightMax) - height[i]`。Two pointer 版本：**max 小的那邊水量已確定**（另一邊一定 ≥ 它），所以先處理小的那邊、移動指標。先移指標再更新 max，確保差值 ≥ 0。
- **讀寫指標口訣：** read 掃全部，write 只在該放東西時往前。兩者的差距就是被過濾掉的元素。
- **Floyd's Cycle Detection（LC 287）：** 把 `nums[i]` 當指標，array 變成 linked list，重複數字 = cycle 入口。Phase 1：slow 一步、fast 兩步，在 cycle 內相遇。Phase 2：新指標從起點出發，跟 slow 同速走，相遇點就是入口。**Phase 2 原理：** 設起點到入口距離 `a`，入口到相遇點 `b`，cycle 長 `c`。Phase 1 結束時 slow 走了 `a+b`，fast 走了 `a+b+c`，所以 `a+b+c = 2(a+b)` → `c = a+b` → `a = c-b`。從相遇點再走 `a` 步 = 從相遇點走 `c-b` 步 = 剛好回到入口。

## Sliding Window

- **Variable Window 標準結構：** `for right` expand → `while` shrink → 記錄答案。不要用 if/else 分離 expand 和 shrink，會在邊界漏記答案。
- **求最短 vs 求最長：** 求最短（LC 76）→ 答案在 while **裡面**記錄。求最長（LC 424）→ 答案在 while **外面**。
- **right 語意：** 用 for loop 的 `right` 代表當前加入的元素，窗口是 `[left, right]`，長度 `right - left + 1`。如果 right 先 `+=1` 再處理，窗口是 `[left, right)`，長度 `right - left`。選一種，不要混。
- **LC 76 counter trick：** 用單一 counter 取代每次掃 freq map。expand: `need[c] -= 1`，若 `>= 0` 則 counter -1。shrink: `need[c] += 1`，若 `> 0` 則 counter +1。`>= 0` 和 `> 0` 不對稱是刻意的。
- **LC 424 maxFreq：** 可以用 `max(freq.values())` O(26) 找真正的 maxFreq，面試夠用。進階 trick: maxFreq 只增不減，因為答案只在 maxFreq 增大時更新。

## Binary Search

- **只記一個模板：** `while left < right`，`condition(mid)` 成立 → `right = mid`，不成立 → `left = mid + 1`。結束時 `left == right` 就是答案。
- **找右邊界？** 不用另一個模板。反轉 condition，例如「最後一個 ≤ 3」=「第一個 > 3 的位置 - 1」。
- **口訣：** 誰不動（不 ±1）就往誰的反方向取整。`right = mid` → 向下取整。
- **Binary Search on Answer：** 搜尋空間是答案的值域，不是 array index。寫一個 `feasible(mid)` 判斷，套同一個模板。注意 `left` 通常是 `max(nums)` 而不是 0（每段至少要裝得下最大元素）。
- **整數 ceiling 技巧：** `(a + b - 1) // b` 等價於 `ceil(a / b)`，避免浮點數精度問題。面試時優先用這個。
- **Rotated Sorted Array 找最小值：** 跟 `nums[right]` 比。`nums[mid] > nums[right]` → 斷點（最小值）在右半，否則在左半（含 mid）。

## Binary Search on Answer

- **識別信號：** 「最小化最大值」或「最大化最小值」（minimax）→ 幾乎一定是 BS on Answer
- **思維轉換：** 最佳化問題 → 判定問題。「最佳答案是多少？」→「如果答案上限是 X，feasible 嗎？」
- **條件：** 答案空間有單調性（越大越容易 feasible），且 feasible 可以 O(n) greedy 驗證

## Dynamic Programming (2D / Interval)

- **兩字串比對：** `dp[i][j]` 依賴 `dp[i-1][j]`, `dp[i][j-1]`, `dp[i-1][j-1]`。Edit Distance 三方向對應 delete/insert/replace。
- **Regex `*` 三路轉移：** `dp[i][j-2]`（用 0 次）、`dp[i][j-1]`（用 1 次）、`dp[i-1][j]`（多吃一個，前提是字元匹配）。
- **區間 DP 核心：** 枚舉**最後一步**（最後戳的氣球、最後切的位置），這樣左右子問題才獨立。
- **區間 DP base case：** 空區間 `l > r` return 0。`l == r` 通常不需特判，讓 for loop 自然處理。
- **戳氣球鄰居：** `i` 是最後戳的 → 此時區間內其他都沒了 → 鄰居是 `nums[l-1]` 和 `nums[r+1]`，不是 1。
- **2D DP 降維：** 只依賴上一排 → 一個 1D array + 一個 `prev` 變數存左上角（因為從左到右填時 `dp[j-1]` 已被覆寫）。所有依賴左上的 2D DP 都通用。

## DFS + Memoization（Grid/DAG）

- **嚴格遞增路徑不需 visited：** 值嚴格遞增 → 不可能走回頭路 → 不需要 visited set。
- **`lru_cache` 就夠了：** 每個 cell 的答案固定，算過一次就記住。不需要手動 dp 陣列 + lru_cache 雙重 cache。

## Heap / Priority Queue

- **找 Median（LC 295）：** maxHeap（較小半）+ minHeap（較大半）。新元素先加入 minHeap，pop 最小的給 maxHeap，不平衡就反向搬。`findMedian` 看兩個 heap top。
- **Top K 問題：** 找最小 k 個 → minHeap 全部放進去 pop k 次 O(n log n)，或用 maxHeap 維護大小 k 的窗口 O(n log k)。
- **Quickselect O(n)：** 選 pivot 分區（把 pivot 移到最後、用 boundary 指標把 <= pivot 的掃到左邊、最後 pivot 歸位），只遞迴包含第 k 個的那一半。平均 O(n)（n+n/2+n/4+...=2n），worst O(n²)。面試中 heap 解法通常就夠，但要能說出 Quickselect 作為 follow-up。

## Monotonic Deque

- **Sliding Window Maximum（LC 239）：** 維護遞減 deque（存 index）。右邊進來的 pop 掉所有比它小的；左邊超出窗口的從 deque 前端移除。deque[0] 永遠是當前窗口最大值。O(n)。

## Graph — Backtracking

- **用完所有邊（歐拉路徑，LC 332）：** visited 追蹤的是**邊**（票），不是**點**（機場）。排序鄰居 + 找到第一個解就 return，保證 lexicographic 最小。
- **Hierholzer's O(E log E)：** 面試中知道存在就好，backtracking + 排序 + 早停在面試規模下夠用。

## 雙目標 DP

- **「先最大化 A 再最小化 B」：** DP cell 存 tuple `(-A, B)`，比較直接用 `min()`。Python tuple 比較是 lexicographic，自動先比第一個再比第二個。
- **例：** 最大化 peak 數量、最小化操作數 → 存 `(-count, ops)`，取 `min` 就是最優解。

## Bit Manipulation

**基本 operator：** `&` AND、`|` OR、`^` XOR、`~` NOT、`<<` 左移、`>>` 右移

**3 個常用操作：**
- **取得第 i 位：** `(x >> i) & 1`
- **把第 i 位設為 1：** `x | (1 << i)`
- **把第 i 位設為 0：** `x & ~(1 << i)`

**3 個神技：**
- **`x & (x - 1)`：** 清掉 x **最低位的 1**。用途：數 1 的個數（Brian Kernighan's algorithm）、判斷 2 的冪次（`x & (x-1) == 0 且 x > 0`）
- **`x & -x`：** 取出 x **最低位的 1**（只留最低的那個 bit）。用途：Fenwick Tree (BIT) 的 `lowbit` 操作
- **XOR 性質：** `a ^ a = 0`、`a ^ 0 = a`、交換律+結合律成立。用途：找「只出現一次」的數字（全部 XOR 起來，重複的抵消）

**Bitmask DP：** 用一個整數的 bit 表示「狀態集合」（哪些元素被選）。常見於 TSP、State Compression DP，狀態數 `2^n`，n ≤ 20 時可用。

## DP + Prefix Sum 加速

- **場景：** DP 轉移是「前面所有 ≤ v 的狀態加總」→ 每步先對上一行做 prefix sum，查詢變 O(1)
- **2D → 1D：** 如果每行只依賴前一行，用兩個 1D array 交替即可
- **預算 valid set：** 如果某個維度的合法值是稀疏的（如特定 digit sum 的數字），先建表只遍歷合法值

## Combination / Modular Arithmetic

- **永遠不要用 float 除法算 C(n,k)**：中間值會超過 float64 精度，`int()` 截斷造成 off-by-one
- **小數字**：`math.comb(n, k)` 整數運算，精確
- **需要 mod**：預算 `fact[]` + `inv_fact[]`，用 Fermat's little theorem `pow(x, MOD-2, MOD)` 求逆元

## Python 實用提醒

- **`nonlocal`：** 內層函式要修改外層函式的變數（如 DFS 中更新全域最佳答案），必須宣告 `nonlocal`。不然 `ans = ...` 只會建立 local binding，外層看不到。`global` 是改 module-level 變數，面試中幾乎不會用。
- **`set.remove()` vs `set.discard()`：** `remove()` 找不到拋 KeyError，`discard()` 靜默忽略。
- **`Counter` vs `defaultdict(int)`：** 比較時 `Counter` 忽略 0 值 entry，`defaultdict` 不會。freq map 比較用 `Counter`。
- **`OrderedDict`：** `move_to_end(key)` O(1) 移到尾部，`popitem(last=False)` O(1) pop 頭部。LRU Cache 專用。

---

## 常用模板

### BFS (Level-order)
```python
from collections import deque
queue = deque([start])
visited = {start}
while queue:
    for _ in range(len(queue)):  # 一次一層
        node = queue.popleft()
        for nei in neighbors(node):
            if nei not in visited:
                visited.add(nei)
                queue.append(nei)
```

### Monotonic Stack（找 next greater）
```python
stack = []  # 存 index，對應值遞減
for i in range(len(nums)):
    while stack and nums[i] > nums[stack[-1]]:
        idx = stack.pop()
        result[idx] = i - idx
    stack.append(i)
```

### Binary Search（找第一個滿足條件的位置）
```python
while left < right:
    mid = (left + right) // 2
    if condition(mid):
        right = mid
    else:
        left = mid + 1
# left == right 就是答案
```
