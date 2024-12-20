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
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "bootstrap-protector" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "bootstrap-protector.checkConflicts",
    function () {
      // The code you place here will be executed every time your command is executed
      const editor = vscode.window.activeTextEditor;
      const document = editor.document;
      const content = document.getText();

      // Clear previous decorations
      if (decorationType) {
        editor.setDecorations(decorationType, []); // Clear existing decorations
      }

      if (document.languageId !== "scss") {
        return;
      }

      const bootstrapClasses = ["btn", "container", "row", "col"]; // Add more classes as needed
      const decorations = [];

      // Process each class in the array
      bootstrapClasses.forEach((wordToSearch) => {
        const regex = new RegExp(`\\.\\b${wordToSearch}\\b(?=\\s|$|{)`, "g");
        const matches = [...content.matchAll(regex)];

        matches.forEach((match) => {
          const startPos = document.positionAt(match.index);
          const line = startPos.line;

          // Create a decoration for the line
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
        // Create a decoration type
        decorationType = vscode.window.createTextEditorDecorationType({
          isWholeLine: true,
        });

        // Apply decorations to the editor
        editor.setDecorations(decorationType, decorations);

        // vscode.window.showInformationMessage(
        //   `Found ${decorations.length} occurrence(s) of Bootstrap classes in the current SCSS file.`
        // );
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {
  if (decorationType) {
    decorationType.dispose(); // Dispose of the decoration type on extension deactivation
  }
}

module.exports = {
  activate,
  deactivate,
};
