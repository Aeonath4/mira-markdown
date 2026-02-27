import * as vscode from 'vscode';
import { renderMarkdown } from './markdownRenderer';
import { getPreviewCss } from './previewStyles';

interface CursorState {
  line: number;
  character: number;
  viewColumn: vscode.ViewColumn;
}

const cursorStates = new Map<string, CursorState>();
let currentPanel: vscode.WebviewPanel | undefined;
let currentDocumentUri: string | undefined;

export function isPreviewActive(): boolean {
  return currentPanel !== undefined;
}

export function showPreview(context: vscode.ExtensionContext): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== 'markdown') {
    return;
  }

  const document = editor.document;
  const uri = document.uri.toString();
  const viewColumn = editor.viewColumn ?? vscode.ViewColumn.One;

  // Save cursor position
  cursorStates.set(uri, {
    line: editor.selection.active.line,
    character: editor.selection.active.character,
    viewColumn,
  });

  currentDocumentUri = uri;

  // Create webview panel in the same column
  currentPanel = vscode.window.createWebviewPanel(
    'miraMarkdown.preview',
    `Preview: ${baseName(document.uri)}`,
    { viewColumn, preserveFocus: false },
    { enableScripts: false, enableCommandUris: true }
  );

  currentPanel.webview.html = buildHtml(document.getText());

  vscode.commands.executeCommand('setContext', 'miraMarkdown.isPreviewActive', true);

  // Listen for document changes to live-update preview
  const changeListener = vscode.workspace.onDidChangeTextDocument((e) => {
    if (e.document.uri.toString() === uri && currentPanel) {
      currentPanel.webview.html = buildHtml(e.document.getText());
    }
  });

  currentPanel.onDidDispose(() => {
    changeListener.dispose();
    currentPanel = undefined;
    vscode.commands.executeCommand('setContext', 'miraMarkdown.isPreviewActive', false);
  }, null, context.subscriptions);
}

export async function showSource(): Promise<void> {
  if (!currentDocumentUri) {
    return;
  }

  const uri = vscode.Uri.parse(currentDocumentUri);
  const savedState = cursorStates.get(currentDocumentUri);
  const viewColumn = savedState?.viewColumn ?? vscode.ViewColumn.One;

  // Dispose the webview first
  if (currentPanel) {
    currentPanel.dispose();
    currentPanel = undefined;
  }

  // Re-open the text editor
  const document = await vscode.workspace.openTextDocument(uri);
  const editor = await vscode.window.showTextDocument(document, viewColumn);

  // Restore cursor position
  if (savedState) {
    const position = new vscode.Position(savedState.line, savedState.character);
    editor.selection = new vscode.Selection(position, position);
    editor.revealRange(
      new vscode.Range(position, position),
      vscode.TextEditorRevealType.InCenterIfOutsideViewport
    );
  }
}

function buildHtml(markdownSource: string): string {
  const rendered = renderMarkdown(markdownSource);
  const css = getPreviewCss();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${css}
    .mira-preview-toolbar {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      justify-content: flex-end;
      padding: 10px 16px;
      background: var(--vscode-editor-background);
      border-bottom: 1px solid var(--vscode-panel-border);
    }
    .mira-preview-close {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid var(--vscode-button-border, transparent);
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      text-decoration: none;
      font-size: 12px;
      font-weight: 600;
      line-height: 1;
    }
    .mira-preview-close:hover {
      background: var(--vscode-button-hoverBackground);
    }
    .mira-preview-content {
      padding-top: 8px;
    }
  </style>
</head>
<body>
  <div class="mira-preview-toolbar">
    <a class="mira-preview-close" href="command:miraMarkdown.closePreview" title="Close preview">
      Close Preview
    </a>
  </div>
  <div class="mira-preview-content">
    ${rendered}
  </div>
</body>
</html>`;
}

function baseName(uri: vscode.Uri): string {
  const parts = uri.path.split('/');
  return parts[parts.length - 1];
}
