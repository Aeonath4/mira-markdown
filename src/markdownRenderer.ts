import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
});

export function renderMarkdown(source: string): string {
  return md.render(stripFrontMatter(source));
}

function stripFrontMatter(source: string): string {
  // Ignore YAML front matter only when it appears at the very beginning.
  return source.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n)?/, '');
}
