---
topic: Interval DP — Burst Balloons
review_after: 2026-04-16
status: 需複習
---

# LC 312 Burst Balloons — 深度複習

## 為什麼這題值得反覆看

區間 DP 的觀念門檻在於「**枚舉最後一步**」而不是「枚舉第一步」。這是一個反直覺但通用的 pattern，第一次想到很難，看懂之後要反覆練到自動化。

## 題目核心

- n 顆氣球，戳破 i 得到 `nums[i-1] * nums[i] * nums[i+1]`
- 邊界外視為 1
- 求戳完所有氣球的最大 coins

## 關鍵洞察

**枚舉第一個戳的** ✗
- 戳完 i 之後，`nums[i-1]` 和 `nums[i+1]` 變成鄰居
- 之後剩下的子問題結構改變，沒辦法獨立算

**枚舉最後一個戳的** ✓
- 設 `dp(l, r)` = 戳完 `[l, r]` 所有氣球的最大 coins
- 枚舉 `i ∈ [l, r]` 是最後戳的
- 當 i 是最後戳的時，`[l, r]` 內其他氣球都已經戳破
- 所以 i 的鄰居必定是**區間外**的 `nums[l-1]` 和 `nums[r+1]`
- 左右子區間 `[l, i-1]` 和 `[i+1, r]` 彼此不影響 → 子問題獨立

## 轉移式

```
dp(l, r) = max over i in [l, r] of:
    nums[l-1] * nums[i] * nums[r+1] + dp(l, i-1) + dp(i+1, r)
```

Base case: `l > r` → return 0（空區間）。
`l == r` 不需要特判，for loop 跑一次自然處理。

## 實作技巧

在 `nums` 前後各補一個 1，這樣就不需要處理 `l = 0` 或 `r = n-1` 的邊界情況：

```python
nums = [1] + nums + [1]
return dp(1, len(nums) - 2)
```

## 完整解法

```python
from functools import lru_cache

def maxCoins(nums):
    nums = [1] + nums + [1]

    @lru_cache(None)
    def dp(l, r):
        if l > r:
            return 0
        res = 0
        for i in range(l, r + 1):
            coins = nums[l - 1] * nums[i] * nums[r + 1]
            res = max(res, coins + dp(l, i - 1) + dp(i + 1, r))
        return res

    return dp(1, len(nums) - 2)
```

## 複雜度

- 狀態數：O(n²)
- 每個狀態的轉移：O(n)
- 總計：**O(n³) 時間、O(n²) 空間**

## 常見陷阱（我踩過的）

1. **枚舉第一步 vs 最後一步搞混** — 這是最大的坑，反直覺
2. **鄰居搞錯** — 以為戳 i 時鄰居是 1，實際上是 `nums[l-1]` 和 `nums[r+1]`
3. **Base case** — 空區間 `l > r` return 0，不是 1

## 自我檢驗問題

複習時能獨立回答這三題就算通過：

1. 為什麼要枚舉「最後戳的」而不是「第一個戳的」？
2. 當 i 是 `[l, r]` 裡最後戳的時，它的鄰居是誰？為什麼？
3. base case 為什麼是 0 不是 1？

## 同系列題（通用區間 DP 技巧）

- LC 1039 Minimum Score Triangulation — 一模一樣的結構，枚舉最後切的頂點
- LC 664 Strange Printer — 枚舉最後打印的字元
- LC 87 Scramble String — 區間 DP 變形
