import * as vscode from 'vscode';

const HEADING_REGEX = /^(#{1,6})\s+(.+)$/;
const DEBOUNCE_MS = 200;

const headingStyles: Record<number, vscode.DecorationRenderOptions> = {
  1: { fontWeight: 'bold', textDecoration: 'none; font-size: 1.6em' },
  2: { fontWeight: 'bold', textDecoration: 'none; font-size: 1.4em' },
  3: { fontWeight: 'bold', textDecoration: 'none; font-size: 1.2em' },
  4: { fontWeight: 'bold' },
  5: { fontWeight: 'bold' },
  6: { fontWeight: 'bold' },
};

const decorationTypes = new Map<number, vscode.TextEditorDecorationType>();

for (let level = 1; level <= 6; level++) {
  decorationTypes.set(
    level,
    vscode.window.createTextEditorDecorationType(headingStyles[level])
  );
}

function updateDecorations(editor: vscode.TextEditor): void {
  if (editor.document.languageId !== 'markdown') {
    return;
  }

  const ranges: Map<number, vscode.Range[]> = new Map();
  for (let level = 1; level <= 6; level++) {
    ranges.set(level, []);
  }

  for (let i = 0; i < editor.document.lineCount; i++) {
    const line = editor.document.lineAt(i);
    const match = HEADING_REGEX.exec(line.text);
    if (match) {
      const level = match[1].length;
      ranges.get(level)!.push(line.range);
    }
  }

  for (const [level, type] of decorationTypes) {
    editor.setDecorations(type, ranges.get(level)!);
  }
}

let debounceTimer: NodeJS.Timeout | undefined;

function debouncedUpdate(editor: vscode.TextEditor): void {
  if (debounceTimer) {
    globalThis.clearTimeout(debounceTimer);
  }
  debounceTimer = globalThis.setTimeout(() => updateDecorations(editor), DEBOUNCE_MS);
}

export function activateHeadingDecorations(context: vscode.ExtensionContext): void {
  // Decorate the active editor on activation
  if (vscode.window.activeTextEditor) {
    updateDecorations(vscode.window.activeTextEditor);
  }

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        updateDecorations(editor);
      }
    }),
    vscode.workspace.onDidChangeTextDocument((event) => {
      const editor = vscode.window.activeTextEditor;
      if (editor && event.document === editor.document) {
        debouncedUpdate(editor);
      }
    })
  );

  // Dispose decoration types on deactivation
  for (const type of decorationTypes.values()) {
    context.subscriptions.push(type);
  }
}
