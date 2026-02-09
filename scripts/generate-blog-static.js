#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const ROOT = path.resolve(__dirname, "..")
const SOURCE_DIR = path.join(ROOT, "content", "blog-drafts")
const PUBLIC_DIR = path.join(ROOT, "public")
const BLOG_INDEX_PATH = path.join(PUBLIC_DIR, "blog.html")
const BLOG_POSTS_DIR = path.join(PUBLIC_DIR, "blog")

const DATE_FILE_RE = /^\d{4}-\d{2}-\d{2}-.+\.md$/

function escapeHtml(input = "") {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function formatDate(dateStr) {
  const date = new Date(`${dateStr}T12:00:00Z`)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

function inlineMarkdown(text = "") {
  let out = escapeHtml(text)

  // links first
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // bold / italics / code
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>")
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>")

  return out
}

function markdownToHtml(markdown = "") {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")
  const html = []

  let inUl = false
  let inOl = false
  let inCode = false
  let paragraph = []

  const closeLists = () => {
    if (inUl) {
      html.push("</ul>")
      inUl = false
    }
    if (inOl) {
      html.push("</ol>")
      inOl = false
    }
  }

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    const text = paragraph.join(" ").trim()
    if (text) html.push(`<p>${inlineMarkdown(text)}</p>`)
    paragraph = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()
    const trimmed = line.trim()

    if (/^```/.test(trimmed)) {
      flushParagraph()
      closeLists()
      if (!inCode) {
        html.push("<pre><code>")
        inCode = true
      } else {
        html.push("</code></pre>")
        inCode = false
      }
      continue
    }

    if (inCode) {
      html.push(`${escapeHtml(line)}\n`)
      continue
    }

    if (!trimmed) {
      flushParagraph()
      closeLists()
      continue
    }

    if (/^#\s+/.test(trimmed)) {
      // Skip top-level title in body render (we render title separately in template)
      flushParagraph()
      closeLists()
      continue
    }

    if (/^##\s+/.test(trimmed)) {
      flushParagraph()
      closeLists()
      html.push(`<h2>${inlineMarkdown(trimmed.replace(/^##\s+/, ""))}</h2>`)
      continue
    }

    if (/^###\s+/.test(trimmed)) {
      flushParagraph()
      closeLists()
      html.push(`<h3>${inlineMarkdown(trimmed.replace(/^###\s+/, ""))}</h3>`)
      continue
    }

    if (/^-\s+/.test(trimmed)) {
      flushParagraph()
      if (inOl) {
        html.push("</ol>")
        inOl = false
      }
      if (!inUl) {
        html.push("<ul>")
        inUl = true
      }
      html.push(`<li>${inlineMarkdown(trimmed.replace(/^-\s+/, ""))}</li>`)
      continue
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph()
      if (inUl) {
        html.push("</ul>")
        inUl = false
      }
      if (!inOl) {
        html.push("<ol>")
        inOl = true
      }
      html.push(`<li>${inlineMarkdown(trimmed.replace(/^\d+\.\s+/, ""))}</li>`)
      continue
    }

    if (/^>\s+/.test(trimmed)) {
      flushParagraph()
      closeLists()
      html.push(`<blockquote>${inlineMarkdown(trimmed.replace(/^>\s+/, ""))}</blockquote>`)
      continue
    }

    paragraph.push(trimmed)
  }

  flushParagraph()
  closeLists()

  if (inCode) html.push("</code></pre>")

  return html.join("\n")
}

function extractExcerpt(markdown = "") {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")
  const chunks = []
  let inCode = false

  for (const raw of lines) {
    const line = raw.trim()
    if (/^```/.test(line)) {
      inCode = !inCode
      continue
    }
    if (inCode) continue
    if (!line) {
      if (chunks.length > 0) break
      continue
    }
    if (/^#/.test(line)) continue
    if (/^-\s+/.test(line)) continue
    if (/^\d+\.\s+/.test(line)) continue
    chunks.push(line)
    if (chunks.join(" ").length >= 220) break
  }

  const text = chunks.join(" ").trim()
  if (!text) return "Practical insights on agentic AI systems and enterprise implementation patterns."

  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 260)
}

function parsePost(fileName) {
  const fullPath = path.join(SOURCE_DIR, fileName)
  const raw = fs.readFileSync(fullPath, "utf8")

  const date = fileName.slice(0, 10)
  const slug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "")

  const titleLine = raw
    .replace(/\r\n/g, "\n")
    .split("\n")
    .find((line) => /^#\s+/.test(line.trim()))

  const title = titleLine
    ? titleLine.trim().replace(/^#\s+/, "").trim()
    : slug
        .split("-")
        .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
        .join(" ")

  return {
    fileName,
    date,
    dateLabel: formatDate(date),
    slug,
    title,
    excerpt: extractExcerpt(raw),
    html: markdownToHtml(raw),
    href: `/blog/${slug}.html`,
  }
}

function siteShell({ title, description, body, isBlogPage = false }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} | Dr. Fatih Nayebi</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --sage-50: #f8faf8;
      --sage-100: #f1f5f1;
      --sage-200: #e3eae4;
      --sage-300: #c9d6cc;
      --sage-400: #a6baa9;
      --sage-500: #87a18b;
      --sage-600: #687f6c;
      --sage-700: #546558;
      --sage-800: #445248;
      --sage-900: #3a453d;
      --gray-50: #f9fafb;
      --gray-100: #f3f4f6;
      --gray-200: #e5e7eb;
      --gray-300: #d1d5db;
      --gray-400: #9ca3af;
      --gray-500: #6b7280;
      --gray-600: #4b5563;
      --gray-700: #374151;
      --gray-800: #1f2937;
      --gray-900: #111827;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Source Sans Pro', 'Lato', sans-serif;
      color: var(--gray-700);
      line-height: 1.65;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: #fff;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    header {
      position: sticky;
      top: 0;
      z-index: 20;
      background: rgba(255,255,255,.95);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--gray-200);
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 68px;
      gap: 1rem;
    }

    .logo {
      color: var(--gray-900);
      text-decoration: none;
      font-weight: 800;
      font-size: 1.15rem;
    }

    nav { display: none; gap: 1.2rem; }
    nav a {
      color: var(--gray-700);
      text-decoration: none;
      font-weight: 600;
      font-size: .95rem;
    }
    nav a.active, nav a:hover { color: var(--sage-700); }

    @media (min-width: 900px) { nav { display: flex; } }

    main { flex: 1; }

    .hero {
      background: linear-gradient(130deg, var(--sage-50), #ffffff 60%);
      border-bottom: 1px solid var(--gray-200);
      padding: 2.5rem 0;
    }

    .hero h1 {
      color: var(--gray-900);
      font-size: clamp(2rem, 4vw, 2.8rem);
      line-height: 1.2;
      margin-bottom: .75rem;
    }

    .hero p {
      font-size: 1.1rem;
      color: var(--sage-700);
      max-width: 760px;
    }

    .content-wrap { padding: 2.2rem 0 3rem; }

    .posts-grid {
      display: grid;
      gap: 1.25rem;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    }

    .post-card {
      border: 1px solid var(--gray-200);
      border-radius: 14px;
      background: #fff;
      padding: 1.15rem 1.1rem;
      display: flex;
      flex-direction: column;
      gap: .65rem;
      box-shadow: 0 8px 22px rgba(31, 41, 55, 0.05);
    }

    .post-date {
      color: var(--sage-700);
      font-size: .9rem;
      font-weight: 600;
    }

    .post-card h2 {
      color: var(--gray-900);
      font-size: 1.25rem;
      line-height: 1.3;
      margin: 0;
    }

    .post-card p { margin: 0; }

    .post-link {
      display: inline-block;
      margin-top: .35rem;
      color: var(--sage-800);
      text-decoration: none;
      font-weight: 700;
    }

    .post-link:hover { text-decoration: underline; }

    .article {
      max-width: 780px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid var(--gray-200);
      border-radius: 14px;
      padding: 1.3rem 1.2rem;
      box-shadow: 0 8px 22px rgba(31, 41, 55, 0.05);
    }

    @media (min-width: 900px) {
      .article { padding: 1.8rem 2rem; }
    }

    .article-meta {
      color: var(--sage-700);
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .article h2 {
      color: var(--gray-900);
      margin: 1.35rem 0 .7rem;
      font-size: 1.45rem;
      line-height: 1.3;
    }

    .article h3 {
      color: var(--gray-900);
      margin: 1.15rem 0 .6rem;
      font-size: 1.15rem;
      line-height: 1.3;
    }

    .article p { margin: .75rem 0; }

    .article ul, .article ol {
      margin: .6rem 0 .8rem 1.1rem;
      display: grid;
      gap: .35rem;
    }

    .article blockquote {
      border-left: 4px solid var(--sage-300);
      background: var(--sage-50);
      padding: .65rem .8rem;
      margin: .9rem 0;
      border-radius: 8px;
    }

    .article pre {
      background: var(--gray-900);
      color: #f3f4f6;
      padding: .75rem;
      border-radius: 10px;
      overflow-x: auto;
      margin: .8rem 0;
      font-size: .9rem;
    }

    .article a { color: var(--sage-800); }

    .back-link {
      display: inline-block;
      margin-top: 1rem;
      color: var(--sage-800);
      text-decoration: none;
      font-weight: 700;
    }

    .back-link:hover { text-decoration: underline; }

    footer {
      margin-top: auto;
      background: var(--gray-900);
      color: var(--gray-300);
      padding: 1.6rem 0;
      text-align: center;
      font-size: .95rem;
    }

    .badge {
      display: inline-block;
      background: var(--sage-100);
      color: var(--sage-800);
      border: 1px solid var(--sage-200);
      border-radius: 999px;
      padding: .22rem .58rem;
      font-size: .78rem;
      font-weight: 700;
      margin-bottom: .6rem;
    }
  </style>
</head>
<body>
  <header>
    <div class="container header-inner">
      <a class="logo" href="/index.html">Dr. Fatih Nayebi</a>
      <nav>
        <a href="/index.html">Home</a>
        <a href="/about.html">About</a>
        <a href="/research.html">Research</a>
        <a href="/blog.html" class="${isBlogPage ? "active" : ""}">Blog</a>
        <a href="/publications.html">Publications</a>
        <a href="/consulting.html">Consulting</a>
        <a href="/news.html">News</a>
        <a href="/contact.html">Contact</a>
      </nav>
    </div>
  </header>

  ${body}

  <footer>
    <div class="container">© 2026 Dr. Fatih Nayebi. All rights reserved.</div>
  </footer>
</body>
</html>`
}

function renderIndex(posts) {
  const cards = posts
    .map((post) => {
      return `<article class="post-card">
  <span class="badge">From the books</span>
  <div class="post-date">${escapeHtml(post.dateLabel)}</div>
  <h2>${escapeHtml(post.title)}</h2>
  <p>${escapeHtml(post.excerpt)}</p>
  <a class="post-link" href="${post.href}">Read post →</a>
</article>`
    })
    .join("\n")

  return siteShell({
    title: "Blog",
    description: "Practical writing on agentic AI systems, decision intelligence, and enterprise implementation patterns.",
    isBlogPage: true,
    body: `<main>
  <section class="hero">
    <div class="container">
      <h1>Blog</h1>
      <p>Practical writing on agentic AI systems, decision intelligence, and operating models grounded in my books and applied work.</p>
    </div>
  </section>

  <section class="content-wrap">
    <div class="container">
      <div class="posts-grid">
        ${cards || '<p>No posts yet. Add a date-named markdown file under <code>content/blog-drafts</code> to publish.</p>'}
      </div>
    </div>
  </section>
</main>`,
  })
}

function renderPost(post) {
  return siteShell({
    title: post.title,
    description: post.excerpt,
    body: `<main>
  <section class="hero">
    <div class="container">
      <h1>${escapeHtml(post.title)}</h1>
      <p>${escapeHtml(post.excerpt)}</p>
    </div>
  </section>

  <section class="content-wrap">
    <div class="container">
      <article class="article">
        <div class="article-meta">${escapeHtml(post.dateLabel)} · Book-derived post</div>
        ${post.html}
        <a class="back-link" href="/blog.html">← Back to blog</a>
      </article>
    </div>
  </section>
</main>`,
  })
}

function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`[blog] source dir missing: ${SOURCE_DIR}`)
    process.exit(1)
  }

  const postFiles = fs
    .readdirSync(SOURCE_DIR)
    .filter((name) => DATE_FILE_RE.test(name))

  const posts = postFiles.map(parsePost)

  posts.sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return a.slug.localeCompare(b.slug)
  })

  fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  fs.mkdirSync(BLOG_POSTS_DIR, { recursive: true })

  fs.writeFileSync(BLOG_INDEX_PATH, renderIndex(posts), "utf8")

  for (const post of posts) {
    const postPath = path.join(BLOG_POSTS_DIR, `${post.slug}.html`)
    fs.writeFileSync(postPath, renderPost(post), "utf8")
  }

  console.log(`[blog] generated ${posts.length} post(s)`)
  console.log(`[blog] index: ${path.relative(ROOT, BLOG_INDEX_PATH)}`)
  console.log(`[blog] posts: ${path.relative(ROOT, BLOG_POSTS_DIR)}`)
}

main()
