# Mira Markdown

A markdown extension for VS Code and Cursor with enhanced heading decorations and a clean rendered preview.

## Version

0.1.5

## Features

### Preview Button

Click the **Preview** button in the status bar to open a rendered preview of your markdown file. The button appears automatically when editing a markdown file. You can also use the keyboard shortcut `Ctrl+Shift+V` (`Cmd+Shift+V` on Mac).

The preview renders your markdown as it would appear on a web page - proportional fonts, styled headings, code blocks, tables, and more.

### Live Preview Refresh

When the markdown document changes, the preview updates automatically.

### Heading Anchors (TOC Links)

Preview headings get generated `id` anchors so links like `[Installing](#1-installing-lyric)` work correctly.

- Stable slug generation from heading text
- Duplicate heading support (`heading`, `heading-1`, `heading-2`, ...)

### Code Block Rendering

- Language fences are syntax highlighted when supported
- Plain fenced blocks (``` without a language) use the standard light code block style
- ` ```output ` blocks use a dark terminal-style theme with an `Output` header bar

### Enhanced Heading Display

Headings are visually distinct in source mode with bold styling and scaled font sizes:

- **H1** - Bold, 1.6em
- **H2** - Bold, 1.4em
- **H3** - Bold, 1.2em
- **H4-H6** - Bold

### No Split Pane

The built-in side-by-side markdown preview is intentionally disabled. Mira Markdown opens the preview as a separate tab so you can focus on one view at a time - either source or preview, not both competing for screen space.

### No Sticky Scroll

This is also disabled for markdown files.

## Commands

| Command | Description |
|---------|-------------|
| `MiraMarkDown: Show Preview` | Open rendered preview |

## Requirements

VS Code 1.85.0 or later.

## License

See [LICENSE](LICENSE) for details.
