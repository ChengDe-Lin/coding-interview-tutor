---
last_updated: 2026-04-06
status: 學習中
tier: 2
---

# Segment Tree / BIT

## 核心觀念

解決「區間查詢 + 動態更新」問題，兩者都 O(log n)。比 prefix sum 強在支援更新。

## 識別信號

- 需要反覆查詢某區間的 sum / min / max
- 同時有單點或區間更新
- Prefix sum 會因為更新變 O(n) 而不夠快

## 程式模板（Iterative Range Sum）

```python
class SegmentTree:
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (2 * self.n)
        # 葉節點：tree[n..2n-1]
        for i in range(self.n):
            self.tree[self.n + i] = nums[i]
        # 內部節點 bottom-up
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[2 * i] + self.tree[2 * i + 1]

    def update(self, idx, val):
        idx += self.n
        self.tree[idx] = val
        while idx > 1:
            idx //= 2
            self.tree[idx] = self.tree[2 * idx] + self.tree[2 * idx + 1]

    def query(self, l, r):  # inclusive [l, r]
        res = 0
        l += self.n
        r += self.n + 1  # 轉半開 [l, r)
        while l < r:
            if l & 1:
                res += self.tree[l]
                l += 1
            if r & 1:
                r -= 1
                res += self.tree[r]
            l //= 2
            r //= 2
        return res
```

## 複雜度

| 操作 | 時間 | 空間 |
|------|------|------|
| Build | O(n) | O(n) |
| Update | O(log n) | — |
| Query | O(log n) | — |

## 常見陷阱

- Python `/` 回傳 float，要用 `//` 整數除法
- Query 用半開區間 [l, r)：`r` 是 exclusive，奇數時**先 `r -= 1` 再收割**
- Update 的 while 裡面要有 `idx //= 2`，不然無限迴圈

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 307 Range Sum Query - Mutable | Medium | 基本模板 | ✅ 已解 |
| LC 315 Count of Smaller Numbers After Self | Hard | 值域當 index + 從右往左掃 | ✅ 已解 |
