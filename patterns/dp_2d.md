---
last_updated: 2026-04-01
status: 學習中
tier: 2
---

# Dynamic Programming (2D / Interval)

## 核心觀念

狀態有兩個維度。常見：
- `dp[i][j]` = grid 位置 (i,j) 的最佳結果
- `dp[i][j]` = 字串 s1[:i] vs s2[:j] 的最佳結果
- `dp[i][j]` = 區間 [i..j] 的最佳結果

## 識別信號

- 兩個字串/序列的比對（LCS、Edit Distance）
- Grid 上的路徑問題
- 區間上的最佳化（戳氣球、矩陣鏈乘法）

## 常見子模式

### Grid Path
- `dp[i][j] = f(dp[i-1][j], dp[i][j-1])`
- 從上或左來

### 兩字串比對
- `dp[i][j]` 依賴 `dp[i-1][j]`, `dp[i][j-1]`, `dp[i-1][j-1]`
- 經典：LCS、Edit Distance

### 區間 DP
- 外層迴圈是區間長度，內層是起點
- `dp[i][j] = min/max over k in [i,j] of (dp[i][k] + dp[k][j] + cost)`

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 1143 Longest Common Subsequence | Medium | 兩字串 LCS | 未做 |
| LC 72 Edit Distance | Medium | 三種操作對應三個方向 | ✅ 已解 |
| LC 10 Regular Expression Matching | Hard | 兩字串比對，`*` 的三路轉移 | ✅ 已解 |
| LC 62 Unique Paths | Medium | Grid path 基礎 | 未做 |
| LC 312 Burst Balloons | Hard | 區間 DP，枚舉「最後戳的」讓子問題獨立 | ✅ 已解 |
