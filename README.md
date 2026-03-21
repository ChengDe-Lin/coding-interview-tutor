# Coding Interview Tutor

A personal coding interview knowledge base and AI-assisted tutor for mastering patterns, tracking blind spots, and building genuine problem-solving fluency at the Google L4/L5 level.

## Quick Start

```bash
cd web && npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to browse your notes, cheat sheets, and progress tracker.

## Directory Structure

```
coding-interview-tutor/
├── CLAUDE.md                        # AI tutor persona & interaction rules
├── README.md                        # This file
├── roadmap.md                       # Tiered pattern roadmap with status tracking
├── patterns/                        # One file per algorithm pattern
│   └── _template.md
├── data_structures/                 # One file per data structure
│   └── _template.md
├── cheatsheets/
│   └── master.md                    # Ultra-condensed pre-interview reference
├── assessments/
│   └── confusion_ledger.md          # Blind spot tracker (auto-updated by AI)
├── deep_dives/                      # Long-form session notes (per topic)
└── web/                             # Vite + React review website
```

## Ground Rules

1. **No hand-waving** — Every claim needs a concrete mechanism or example. "It's like a BFS but…" is not enough; show the queue state.
2. **Pattern recognition > memorization** — Don't memorize solutions. Learn to identify which pattern a problem belongs to within the first 2 minutes.
3. **Track blind spots** — Every time you get stuck or reason incorrectly, it goes into `assessments/confusion_ledger.md`. That file is your most valuable asset.
4. **Review before interviews** — Open `cheatsheets/master.md` 30 minutes before any interview. It contains only things you personally got wrong before.
