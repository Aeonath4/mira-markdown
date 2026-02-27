import * as vscode from 'vscode';
import { activateHeadingDecorations } from './headingDecorations';
import { isPreviewActive, showPreview, showSource } from './previewManager';

let previewButton: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('miraMarkdown.showPreview', () => {
      showPreview(context);
    }),
    vscode.commands.registerCommand('miraMarkdown.closePreview', async () => {
      await showSource();
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
    vscode.window.onDidChangeVisibleTextEditors(() => updateButton()),
    vscode.window.tabGroups.onDidChangeTabs(() => updateButton())
  );

  // Activate heading decorations for source mode
  activateHeadingDecorations(context);

  // Hide VS Code's built-in markdown preview button
  vscode.commands.executeCommand('setContext', 'hasCustomMarkdownPreview', true);

  // Initial state
  updateButton();
}

function updateButton(): void {
  if (isPreviewTabActive() && isPreviewActive()) {
    previewButton.text = '$(close) Close Preview';
    previewButton.tooltip = 'Close rendered preview';
    previewButton.command = 'miraMarkdown.closePreview';
    previewButton.show();
    return;
  }

  const editor = vscode.window.activeTextEditor;
  if (editor?.document.languageId === 'markdown') {
    previewButton.text = '$(open-preview) Preview';
    previewButton.tooltip = 'Open rendered preview';
    previewButton.command = 'miraMarkdown.showPreview';
    previewButton.show();
  } else {
    previewButton.hide();
  }
}

function isPreviewTabActive(): boolean {
  const activeTab = vscode.window.tabGroups.activeTabGroup.activeTab;
  if (!activeTab) {
    return false;
  }

  return activeTab.input instanceof vscode.TabInputWebview
    && activeTab.input.viewType === 'miraMarkdown.preview';
}

export function deactivate(): void {
  // Cleanup handled by disposables
}
