---
last_updated: 2026-04-14
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

### 線性指派 DP（with capacity）
- **場景：** 兩組實體配對，都在一維順序上，有容量限制
- **關鍵前置：** 兩邊都 sort，最佳解 non-crossing（exchange argument 證明）
- **state：** `dp[i][j]` = 前 i 個 A 配前 j 個 B 的最小成本
- **transition：** 枚舉 B_j 吃 k 個：
  ```
  dp[i][j] = min over k in [0, min(cap_j, i)] of:
             dp[i-k][j-1] + cost(A[i-k:i] -> B_j)
  ```
- **Base case：** `dp[0][j] = 0`, `dp[i][0] = inf` (i > 0)
- **複雜度：** O(n² · m)
- **陷阱：** transition 只寫 `dp[i-1][j]` / `dp[i][j-1]` 會漏掉 k ≥ 2 的情況
- **代表題：** LC 2463 Minimum Total Distance Traveled

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 1143 Longest Common Subsequence | Medium | 兩字串 LCS | 未做 |
| LC 72 Edit Distance | Medium | 三種操作對應三個方向 | ✅ 已解 |
| LC 10 Regular Expression Matching | Hard | 兩字串比對，`*` 的三路轉移 | ✅ 已解 |
| LC 62 Unique Paths | Medium | Grid path 基礎 | 未做 |
| LC 312 Burst Balloons | Hard | 區間 DP，枚舉「最後戳的」讓子問題獨立 | ✅ 已解 |
| LC 2463 Minimum Total Distance Traveled | Hard | 線性指派 + non-crossing + 枚舉 k | 🕐 已學觀念，回家獨立寫 |
