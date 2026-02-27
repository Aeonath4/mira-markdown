export function getPreviewCss(): string {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      width: 100%;
      min-height: 100%;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      padding: 20px 24px;
      background-color: #ffffff;
      color: #333333;
    }

    h1 {
      color: #333333;
      font-size: 2rem;
      text-align: center;
    }

    h2 {
      color: #555555;
      margin-top: 30px;
      font-size: 1.5rem;
    }

    h3, h4, h5, h6 {
      color: #555555;
      margin-top: 20px;
    }

    p {
      margin-bottom: 1rem;
    }

    a {
      color: #007acc;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 20px auto;
    }

    ul, ol {
      margin-bottom: 1rem;
      padding-left: 2rem;
    }

    li {
      margin-bottom: 0.5rem;
    }

    code {
      background-color: transparent;
      color: inherit;
      padding: 0;
      border-radius: 0;
      border: none;
      font-family: "Roboto Mono", Consolas, "Courier New", monospace;
      font-size: 14px;
    }

    pre {
      background-color: #f3f4f6;
      padding: 1rem;
      border-radius: 5px;
      overflow-x: auto;
      margin-bottom: 1rem;
      font-size: 14px;
      border: 1px solid #d1d5db;
      color: #111827;
    }

    pre code {
      background-color: transparent;
      border: none;
      padding: 0;
      font-size: inherit;
      color: inherit;
    }

    pre[class*="language-"] {
      background-color: #f3f4f6;
      border: 1px solid #d1d5db;
      color: #111827;
    }

    pre.language-output {
      position: relative;
      padding-top: 2.2rem;
      background-color: #2b2b2b;
      border: 1px solid #444444;
      color: #cccccc;
    }

    pre.language-output::before {
      content: "Output";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 0.35rem 0.75rem;
      border-bottom: 1px solid #444444;
      background-color: #232323;
      color: #d1d5db;
      font-family: "Roboto Mono", Consolas, "Courier New", monospace;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    pre.language-output code {
      color: #cccccc;
    }

    code[class*="language-"] {
      color: #111827;
      text-shadow: none;
    }

    :not(pre) > code[class*="language-"] {
      background-color: transparent;
      color: inherit;
      border: none;
      padding: 0;
      border-radius: 0;
    }

    .token.type {
      color: #ff6600;
      font-weight: bold;
    }

    .token.keyword {
      color: #0077aa;
      font-weight: bold;
    }

    .token.function {
      color: #9c27b0;
    }

    .token.comment {
      color: #4b5563;
      font-style: italic;
    }

    .token.string {
      color: #22863a;
    }

    .token.number {
      color: #098658;
    }

    .token.operator,
    .token.punctuation {
      color: #374151;
    }

    blockquote {
      border-left: 4px solid #007acc;
      padding-left: 1rem;
      margin: 1rem 0;
      font-style: italic;
      color: #666666;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }

    th, td {
      padding: 8px 12px;
      text-align: left;
      border-bottom: 1px solid #eeeeee;
    }

    th {
      background-color: #f8f9fa;
      font-weight: 600;
    }

    hr {
      margin: 0;
      border: none;
      border-top: 1px solid #999999;
      padding-bottom: 5px;
    }

    @media (max-width: 768px) {
      body {
        padding: 14px;
      }

      h1 {
        font-size: 1.75rem;
      }

      h2 {
        font-size: 1.25rem;
      }

      pre[class*="language-"], code[class*="language-"] {
        font-size: 12px;
      }
    }

    @media (max-width: 375px) {
      body {
        padding: 10px;
      }

      h1 {
        font-size: 1.3rem;
      }

      h2 {
        font-size: 1rem;
      }

      pre[class*="language-"], code[class*="language-"] {
        font-size: 11px;
      }
    }
  `;
}
