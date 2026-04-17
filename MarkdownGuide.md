# React Markdown — Features Reference

This document describes what markdown syntax is supported when writing the `extended_description` field. The field is rendered using [`react-markdown`](https://remarkjs.github.io/react-markdown/), which follows the [CommonMark](https://commonmark.org/) spec by default.

---

## Available Features

| Feature | Syntax | Example |
|---|---|---|
| **Headings** | `# H1` through `###### H6` | `## Section Title` |
| **Bold** | `**text**` or `__text__` | `**important**` |
| **Italic** | `*text*` or `_text_` | `*emphasis*` |
| **Bold + Italic** | `***text***` | `***critical***` |
| **Inline code** | `` `code` `` | `` `null` `` |
| **Code blocks** | ` ```lang ``` ` | ` ```json ``` ` |
| **Blockquotes** | `> text` | `> Note: ...` |
| **Unordered lists** | `- item` or `* item` | `- Feature one` |
| **Ordered lists** | `1. item` | `1. Step one` |
| **Nested lists** | Indent with 2–4 spaces | `  - sub-item` |
| **Horizontal rule** | `---` or `***` | `---` |
| **Links** | `[label](url)` | `[docs](https://example.com)` |
| **Paragraphs** | Blank line between text | — |
| **Line breaks** | Two trailing spaces or `\n` | — |
| **Escaped characters** | `\*`, `\_`, `\`` etc. | `\*not bold\*` |
| **Strikethrough** | `~~text~~` *(via remark-gfm)* | `~~deprecated~~` |
| **Tables** | GFM pipe syntax *(via remark-gfm)* | see below |
| **Task lists** | `- [x] done` *(via remark-gfm)* | `- [ ] pending` |

### Table syntax example

```markdown
| Column A | Column B |
|----------|----------|
| value    | value    |
```

---

## Not Available (unsupported or unsafe)

| Feature | Reason |
|---|---|
| Raw `<html>` tags | Disabled by default — `react-markdown` strips HTML for security |
| `<script>` / `<style>` tags | Stripped entirely, never rendered |
| `javascript:` links | Sanitized — only `http`, `https`, `mailto` are allowed |
| Footnotes | Not part of CommonMark; requires `remark-footnotes` plugin (not enabled) |
| Definition lists | Not supported without additional plugins |
| Math / LaTeX (`$...$`) | Requires `remark-math` plugin (not enabled) |
| Custom directives (`::: note`) | Requires `remark-directive` plugin (not enabled) |
| Front matter (`---` YAML header) | Not parsed — treated as a horizontal rule followed by text |

> **Note:** HTML is intentionally disabled. Even valid HTML like `<br>`, `<u>`, or `<span>` will not render — use markdown equivalents instead.

---

## Tips for Writing `extended_description`

- Use `##` and `###` for section headings — avoid `#` (H1) as the field is already within a larger page context.
- Use fenced code blocks with a language hint for readable snippets: ` ```json `, ` ```bash `, etc.
- Prefer `**bold**` for field names and `` `inline code` `` for values, types, or identifiers.
- Keep tables simple — GFM tables don't support merged cells or complex formatting inside cells.
- Leaving `extended_description` as `""` is allowed but not recommended; even a short paragraph and a img improves discoverability.

---

## Advertisements & Custom Media Types

The markdown image title attribute (the quoted string after the URL) is normally ignored visually, but `react-markdown` exposes it through its custom renderer API. This makes it a clean, unobtrusive way to tag media with a type — no plugins needed.

### How it works

A standard image looks like this:

```markdown
![alt text](https://example.com/image.png)
```

By adding a title, you signal intent:

```markdown
![My Cool Mod](https://example.com/banner.png "advertisement")
```

On the renderer side, a custom `img` component checks the `title` prop and switches UI accordingly.

### Supported media type tags

| Title value | Renders as |
|---|---|
| *(none)* | Standard image |
| `"advertisement"` | Advertisement banner UI |
| `"video"` | Video embed (using `src` as the video URL) |

> **Note for writers:** The title value is case-sensitive and must match exactly. `"Advertisement"` or `"ad"` will not be recognized — use `"advertisement"` as written.

---

## Final Step

Once your markdown is ready, convert it to a valid JSON string using [JSON Stringify](https://onlinetexttools.com/json-stringify-text), then paste the result as the value of your `extended_description` field.

---

## Quick Example

```markdown
## Chest Sorter 3000

A **lightweight utility mod** that automatically sorts and organizes your chests by item type. No more digging through mountains of cobblestone to find your diamonds.

### What it does

- Automatically groups items by category — blocks, tools, food, materials
- Sneak + right-click any chest for an **instant sort**
- Works with *double chests*, barrels, and shulker boxes
- Fully compatible with other storage mods
```

> See the [full documentation](https://commonmark.org/) for advanced options.
```
