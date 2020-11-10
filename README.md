# VsCode Extension: backend-process-talker

An extension to run a backend child process.

See [the design document](design-doc.md) for rationale, design and other
details.

## Status

Goal | State
-----|------
Bundle a `.jar` in an extension. | ✅
Start a process from this `.jar`. | ✅
Communicate bi-directionally from the extension with the process. They run on the same machine. | ✅ (stdio). <br> `-` (port). <br> `-` (unix socket).
Run in Theia, install as an VSCode Extension/Theia Plugin. | ✅
Only use VSCode API. No Theia internal API. | ✅

## Installation - Theia

Bundle the extension as a `.vsix` using `vsce package` or `npm run bundle`
(same command). You may need to install `vsce` first: `npm install vsce`.

Then open Theia, eg. inside gitpods, and open a workspace. Open the
**Extensions** tab in Theia, and drag-and-drop the `.vsix` file into it.
The extension should install and `Hello World` will be present when you press
<kbd>F1</kbd>.

## Features

### Commands:

* `Hello World` - run the backend process.


## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release.

