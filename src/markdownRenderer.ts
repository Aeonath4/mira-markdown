import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
});

export function renderMarkdown(source: string): string {
  return md.render(source);
}
