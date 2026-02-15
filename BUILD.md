# Build Guide

## Prerequisites

- Node.js (LTS recommended)
- npm

## Setup

```bash
npm install
```

## Build the VSIX

```bash
npm run build
```

This compiles TypeScript and packages the extension into `mira-markdown-<version>.vsix`.

## Other Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `compile` | `npm run compile` | Compile TypeScript only |
| `watch` | `npm run watch` | Compile on file changes |
| `lint` | `npm run lint` | Type-check without emitting |
| `build` | `npm run build` | Compile + package VSIX |

## Install Locally

```bash
code --install-extension mira-markdown-0.1.1.vsix
```

For Cursor:

```bash
cursor --install-extension mira-markdown-0.1.1.vsix
```

## Packaging Details

### What goes into the VSIX

The `.vscodeignore` file controls what is excluded from the package. The VSIX includes:

- `out/` — compiled JavaScript
- `node_modules/` — production dependencies only (`markdown-it` and its sub-dependencies)
- `package.json` — extension manifest
- `README.md` — displayed on the extension page
- `LICENSE.txt`
- `icon.png`

### Dependencies

| Package | Type | Purpose |
|---------|------|---------|
| `markdown-it` | runtime | Markdown to HTML rendering |
| `@types/markdown-it` | dev | TypeScript types for markdown-it |
| `@types/node` | dev | TypeScript types for Node.js |
| `@types/vscode` | dev | TypeScript types for VS Code API |
| `@vscode/vsce` | dev | VS Code extension packaging tool |
| `typescript` | dev | TypeScript compiler |

### Version Bumping

Update the `version` field in `package.json` before building a new release. The VSIX filename includes the version number automatically.
