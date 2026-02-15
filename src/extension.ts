import * as vscode from 'vscode';
import { activateHeadingDecorations } from './headingDecorations';
import { showPreview } from './previewManager';

let previewButton: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('miraMarkdown.showPreview', () => {
      showPreview(context);
    })
  );

  // Status bar preview button — always visible for markdown files
  previewButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  previewButton.text = '$(open-preview) Preview';
  previewButton.tooltip = 'Open rendered preview';
  previewButton.command = 'miraMarkdown.showPreview';
  context.subscriptions.push(previewButton);

  // Show/hide based on active editor
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(() => updateButton()),
    vscode.window.onDidChangeVisibleTextEditors(() => updateButton())
  );

  // Activate heading decorations for source mode
  activateHeadingDecorations(context);

  // Hide VS Code's built-in markdown preview button
  vscode.commands.executeCommand('setContext', 'hasCustomMarkdownPreview', true);

  // Initial state
  updateButton();
}

function updateButton(): void {
  const editor = vscode.window.activeTextEditor;
  if (editor?.document.languageId === 'markdown') {
    previewButton.show();
  } else {
    previewButton.hide();
  }
}

export function deactivate(): void {
  // Cleanup handled by disposables
}
