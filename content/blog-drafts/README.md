# Blog Draft Pipeline (Book-Based)

This folder is the drafting pipeline for frequent thought-leadership posts.

## Source books

1. **Foundations of Agentic AI for Retail** (2nd edition)
2. **Foundations of Agentic AI Systems** (domain-agnostic, in progress)

## Cadence

- **Weekly**: 1 practical post (700–1,200 words)
- **Biweekly**: 1 deeper technical post (1,200–1,800 words)
- **Monthly**: 1 executive synthesis post (strategy + operating model)

## Suggested channels

- LinkedIn (primary distribution)
- Gradient Divergence (long-form canonical version)
- Optional: website blog page as curated index of best pieces

## Editorial rails

- Keep each post grounded in a practical operating problem
- Add at least one concrete framework/checklist
- Include one caution section (governance, risk, failure modes)
- End with “what to do this week” for operators

## Current queue

See `TOPIC_QUEUE.md`.

## Planning assets

- `EDITORIAL_CALENDAR_12_WEEKS.md` — 12-week multi-channel strategy
- `WEEKS_01_04_CONTENT_PACK.md` — ready-to-ship content for first 4 weeks

## Auto-publish behavior (website)

- Any markdown file in this folder named like `YYYY-MM-DD-title.md` is auto-published to:
  - `/blog.html` (listing)
  - `/blog/<title>.html` (post page)
- Generation runs during `npm run build` via `scripts/generate-blog-static.js`.
- If you want a draft that should **not** appear on the website yet, do not use the `YYYY-MM-DD-*.md` filename pattern.

## Publishing checklist

- [ ] Title tuned for senior operators + builders
- [ ] 3–5 key takeaways in opening section
- [ ] One architecture/process diagram idea (optional)
- [ ] Explicit mention of where human oversight is required
- [ ] CTA for discussion or pilot collaboration
