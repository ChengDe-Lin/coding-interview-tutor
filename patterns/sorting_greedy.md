---
last_updated: 2026-03-28
status: 學習中
tier: 1
---

# Sorting + Greedy

## 核心觀念

排序 + 掃一遍。先按某個維度排序，然後每步貪心地選當前最優，不回頭。

能用 Greedy 的前提：**局部最優 = 全域最優**。面試時要能用一句話解釋為什麼。

## 識別信號

- 區間問題（排程、合併、覆蓋）
- 「最多/最少幾個 XX」+ 排序後每步可以直接決定
- 反證法想不到 Greedy 會錯的反例

## Greedy vs DP

- 想到反例（局部最優 ≠ 全域最優）→ DP
- 想不到反例 → 大概能 Greedy
- 經典反例：硬幣問題，面額 [1, 3, 4]，湊 6，Greedy 選 4+1+1=3 枚，DP 選 3+3=2 枚

## 常見套路

1. **區間排程**：按結束時間排，貪心選不重疊的 → 最多幾個
2. **區間合併**：按開始時間排，重疊就合併
3. **Jump Game 類**：每步更新能到達的最遠位置
4. **Task Scheduler 類**：高頻的先做

## 複雜度

通常瓶頸在排序 O(n log n)，掃描是 O(n)。

## 經典題

| 題目 | 難度 | 關鍵考點 | 我的狀態 |
|------|------|---------|---------|
| LC 56 Merge Intervals | Medium | 按 start 排序，重疊就合併 | 已掌握 |
| LC 435 Non-overlapping Intervals | Medium | 按 end 排序，貪心選最多不重疊 | 已掌握 |
| LC 55 Jump Game | Medium | 維護最遠可達位置 | 未做 |
| LC 763 Partition Labels | Medium | 記錄每個字元最後出現位置，貪心切割 | 未做 |
| LC 621 Task Scheduler | Medium | 排序 + 數學 or greedy | 未做 |
