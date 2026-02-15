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
    { enableScripts: false }
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
  <style>${css}</style>
</head>
<body>
  ${rendered}
</body>
</html>`;
}

function baseName(uri: vscode.Uri): string {
  const parts = uri.path.split('/');
  return parts[parts.length - 1];
}
