// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// Store the decoration type globally
let decorationType = null;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
  console.log("Bootstrap Protector is active!");

  // Initialize decoration type
  decorationType = vscode.window.createTextEditorDecorationType({
    isWholeLine: true,
  });

  // Command to manually check conflicts
  const disposableCommand = vscode.commands.registerCommand(
    "bootstrap-protector.checkConflicts",
    checkConflicts
  );

  // Automatically check conflicts on save
  const disposableSaveEvent = vscode.workspace.onDidSaveTextDocument(
    (document) => {
      if (document.languageId === "scss") {
        const editor = vscode.window.activeTextEditor;
        if (editor && editor.document === document) {
          checkConflicts();
        }
      }
    }
  );

  context.subscriptions.push(disposableCommand, disposableSaveEvent);
}

function checkConflicts() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("No active editor found.");
    return;
  }

  const document = editor.document;

  if (document.languageId !== "scss") {
    vscode.window.showErrorMessage(
      "This extension only works with SCSS files."
    );
    return;
  }

  const content = document.getText();

  // Clear previous decorations
  editor.setDecorations(decorationType, []);

  // Load bootstrap classes from JSON
  const path = require("path");
  const bootstrapClasses = require(path.join(
    __dirname,
    "bootstrapClasses.json"
  ));

  const decorations = [];

  bootstrapClasses.forEach((wordToSearch) => {
    const regex = new RegExp(`\\.\\b${wordToSearch}\\b(?=\\s|$|{)`, "g");
    const matches = [...content.matchAll(regex)];

    matches.forEach((match) => {
      const startPos = document.positionAt(match.index);
      const line = startPos.line;

      decorations.push({
        range: new vscode.Range(line, 0, line, 0),
        hoverMessage: `Overriding Bootstrap class "${wordToSearch}" is not recommended.`,
        renderOptions: {
          after: {
            contentText: `⚠️ Warning: "${wordToSearch}" is already being used by Bootstrap.`,
            color: "red",
            backgroundColor: "rgba(240, 132, 132, 0.2)",
          },
        },
      });
    });
  });

  if (decorations.length > 0) {
    editor.setDecorations(decorationType, decorations);

    vscode.window.showInformationMessage(
      `Found ${decorations.length} occurrence(s) of Bootstrap classes in the current SCSS file.`
    );
  } else {
    vscode.window.showInformationMessage(
      "No Bootstrap class conflicts found in the current SCSS file."
    );
  }
}

function deactivate() {
  if (decorationType) {
    decorationType.dispose();
  }
}

module.exports = {
  activate,
  deactivate,
};
