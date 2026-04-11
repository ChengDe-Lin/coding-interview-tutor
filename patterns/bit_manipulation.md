---
last_updated: 2026-04-11
status: 學習中
tier: 2
---

# Bit Manipulation

## 核心觀念

用 bit 操作取代集合/算術操作，達到 O(1) 的常數級運算。

## 識別信號

- 每個元素出現 k 次、找出現 1 次的 → 每 bit 加總 mod k
- n ≤ 20 + 需要追蹤「哪些被選過」 → Bitmask DP / BFS
- 要求 O(1) space + 不能用 hash → XOR / bit 操作

## 常用操作

- 取得第 i 位：`(x >> i) & 1`
- 設第 i 位為 1：`x | (1 << i)`
- 設第 i 位為 0：`x & ~(1 << i)`
- 清掉最低位的 1：`x & (x - 1)`
- 取出最低位的 1：`x & -x`
- 判斷 2 的冪次：`x & (x - 1) == 0 and x > 0`

## Bitmask 常用操作（集合壓縮）

- 檢查元素 i 在不在：`(mask >> i) & 1`
- 加入元素 i：`mask | (1 << i)`
- 移除元素 i：`mask & ~(1 << i)`
- 集合是否滿：`mask == (1 << n) - 1`

## 常見陷阱

- Python 負數：int 無限長，`>>` 是算術右移（填 1）。處理 32-bit signed 時要 mask 成 unsigned，最後若 `ans >= 2^31` 就 `-= 2^32`
- Python `/` 回傳 float：bit 操作中用 `//` 不用 `/`

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 136 Single Number | Easy | XOR 全部抵消 | ✅ 口述 |
| LC 137 Single Number II | Medium | 每 bit 加總 mod 3 + Python 負數處理 | ✅ 已解 |
| LC 338 Counting Bits | Easy | DP + `x & (x-1)` 或 `x >> 1` | ✅ 口述 |
| LC 847 Shortest Path Visiting All Nodes | Hard | BFS + bitmask state 壓縮 visited | ✅ 已解 |
| LC 698 Partition to K Equal Sum Subsets | Medium | Bitmask DP，curSum 可從 mask 推導 | ✅ 已解 |
