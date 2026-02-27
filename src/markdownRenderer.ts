import MarkdownIt from 'markdown-it';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';
import prismComponents from 'prismjs/components.json';

const prismLanguageIds = Object.keys(prismComponents.languages).filter((languageId) => languageId !== 'meta');
loadLanguages(prismLanguageIds);

Prism.languages.lyric = {
  comment: {
    pattern: /#.*/,
    greedy: true,
  },
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
  },
  keyword: /\b(?:if|else|elif|end|while|for|in|return|break|continue|pass|try|catch|finally|throw|import|from|as|class|public|private|protected|based on|def|const|true|false|null|and|or|not|given|done|fade|importpy|case)\b/,
  type: /\b(?:int|str|flt|var|bin|rex|god|map|arr|None)\b/,
  function: /\b[a-zA-Z_]\w*(?=\s*\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[-+*/%=<>!&|^~]+|\.\.\.|\b(?:is|in)\b/,
  punctuation: /[{}[\];(),.:]/,
  'class-name': {
    pattern: /(\bclass\s+)\w+/,
    lookbehind: true,
  },
};

function normalizeLanguage(lang?: string): string {
  if (!lang) {
    return 'plain';
  }

  switch (lang.toLowerCase()) {
    case 'py':
      return 'python';
    case 'js':
      return 'javascript';
    case 'ts':
      return 'typescript';
    case 'sh':
    case 'shell':
      return 'bash';
    default:
      return lang.toLowerCase();
  }
}

function escapeHtml(source: string): string {
  return source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: (code, lang) => {
    const language = normalizeLanguage(lang);
    const grammar = Prism.languages[language];

    if (grammar) {
      const highlighted = Prism.highlight(code, grammar, language);
      return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`;
    }

    return `<pre class="language-${language}"><code class="language-${language}">${escapeHtml(code)}</code></pre>`;
  },
});

function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[`~!@#$%^&*()+=[\]{}\\|;:'",.<>/?]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

md.core.ruler.push('mira_heading_anchors', (state) => {
  const used = new Map<string, number>();

  for (let i = 0; i < state.tokens.length; i++) {
    const token = state.tokens[i];
    if (token.type !== 'heading_open') {
      continue;
    }

    const inline = state.tokens[i + 1];
    if (!inline || inline.type !== 'inline') {
      continue;
    }

    const base = slugifyHeading(inline.content) || 'section';
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);

    const id = count === 0 ? base : `${base}-${count}`;
    token.attrSet('id', id);
  }
});

export function renderMarkdown(source: string): string {
  return md.render(stripFrontMatter(source));
}

function stripFrontMatter(source: string): string {
  // Ignore YAML front matter only when it appears at the very beginning.
  return source.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n)?/, '');
}
