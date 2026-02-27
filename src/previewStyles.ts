export function getPreviewCss(): string {
  return `
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #24292e;
      background-color: #ffffff;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px 40px;
      line-height: 1.6;
    }

    h1, h2, h3, h4, h5, h6 {
      color: #1a1a1a;
      margin-top: 1.4em;
      margin-bottom: 0.6em;
      font-weight: 600;
    }

    h1 { font-size: 2em; border-bottom: 1px solid #e1e4e8; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #e1e4e8; padding-bottom: 0.3em; }
    h3 { font-size: 1.25em; }
    h4 { font-size: 1em; }
    h5 { font-size: 0.875em; }
    h6 { font-size: 0.85em; color: #6a737d; }

    a {
      color: #0366d6;
      text-decoration: none;
    }
    a:hover {
      color: #0550ae;
      text-decoration: underline;
    }

    code {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 0.85em;
      background-color: #eef1f4;
      color: #1f2933;
      padding: 0.2em 0.4em;
      border-radius: 3px;
    }

    pre {
      background-color: #eef2f6;
      padding: 16px;
      border-radius: 6px;
      overflow-x: auto;
      border: 1px solid #dde3ea;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
    }

    pre code {
      background: none;
      color: #1f2933;
      padding: 0;
    }

    blockquote {
      margin: 0;
      padding: 0.5em 1em;
      border-left: 4px solid #dfe2e5;
      background-color: transparent;
      color: #6a737d;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }

    th, td {
      border: 1px solid #dfe2e5;
      padding: 8px 12px;
      text-align: left;
    }

    th {
      background-color: #f6f8fa;
      font-weight: 600;
    }

    img {
      max-width: 100%;
    }

    hr {
      border: none;
      border-top: 1px solid #e1e4e8;
      margin: 2em 0;
    }

    ul, ol {
      padding-left: 2em;
    }

    li + li {
      margin-top: 0.25em;
    }
  `;
}
