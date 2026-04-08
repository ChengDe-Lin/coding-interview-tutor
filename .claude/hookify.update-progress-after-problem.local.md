---
name: update-progress-after-problem
enabled: true
event: prompt
conditions:
  - field: user_prompt
    operator: regex_match
    pattern: (?i)(^done|^ok.{0,5}done|passed|^ok.{0,5}passed|完成了|寫完了|過了)
action: warn
---

**使用者剛完成一題 LeetCode！立即更新以下檔案：**

1. **`roadmap.md`** — 對應 pattern 的「關聯題數 +1」和「上次學習」日期
2. **`patterns/<pattern>.md`** — 經典題表格中該題的狀態改為「✅ 已解」
3. **`assessments/confusion_ledger.md`** — 如果使用者有卡住或犯錯，新增盲區條目
4. **`cheatsheets/master.md`** — 如果有值得記住的技巧或陷阱，同步更新

不要跳過這一步。不要等到 session 結束才批次更新。
