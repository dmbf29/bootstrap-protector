# Bootstrap Protector VS Code Extension

## Overview

Bootstrap Protector is a Visual Studio Code extension designed to help developers avoid accidentally overwriting predefined CSS classes from the Bootstrap framework. It ensures you stay informed about potential conflicts in your custom SCSS files, allowing you to write clean, conflict-free stylesheets.

![Preview of Bootstrap Protector in action](https://raw.githubusercontent.com/dmbf29/boostrap-protector/76d5dc13024e6c7d496703e3d04292c8df4e793a/preview.png)

## Features

- Automatically scans your SCSS files on save.
- Identifies classes already defined by Bootstrap.
- Displays a warning directly in the text editor, highlighting the conflicting class.

### Example

If you define a class in your SCSS file that conflicts with Bootstrap, such as:

```scss
.container {
  margin: auto;
}
```

The extension will display a warning message in red:

```
⚠️ Warning: "container" is already being used by Bootstrap.
```

## Installation

1. Download and install the extension from the [VS Code Marketplace](https://marketplace.visualstudio.com/).
2. ⚠️ Activation: Open the command pallete (Ctrl + Shift + P / Cmd  Shift + P) and search for "Bootstrap Protector" and choose "Check SCSS for conflicts"

## Usage

1. Open any SCSS file in your project.
2. Save the file (Ctrl + S / Cmd + S) to trigger the extension.
3. If any conflicting classes are detected, warnings will appear in the editor.

## Configuration

The extension uses a predefined list of Bootstrap classes to check for conflicts. This list is stored in a JSON file included with the extension. If you want to customize this list:

1. Locate the `bootstrapClasses.json` file in the extension's installation directory.
2. Add, remove, or update the class names as needed.

## Known Issues

- Currently, the extension only supports SCSS files. CSS and other file types are not scanned (yet).
- Based off of a limited number of Bootstrap 5.3 classes. More to be added later.
- The warning message is displayed for the entire line where the class is defined, which might not suit all preferences.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests on the [GitHub repository](https://github.com/dmbf29/boostrap-protector).

## License

This extension is licensed under the MIT License. See the `LICENSE` file for more information.

---

Happy coding with Bootstrap Protector!
