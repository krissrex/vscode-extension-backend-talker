// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
import { spawn } from "child_process";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "backend-process-talker" is now active!'
  );
  console.log("Starting from ", context.extensionPath);
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  let disposable = vscode.commands.registerCommand(
    "backend-process-talker.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user

      const command = "java";
      const jar = context.asAbsolutePath(path.join("lib", "ecore-tool-process.jar"));
      const args: string[] = ["-jar", jar, "stdio"];
      const cwd = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

      vscode.window.showInformationMessage(
        "Spawning a child process from " +
          command +
          "\ninto " +
          cwd
      );
      const childProcess = spawn(command, args, {
        cwd,
        windowsHide: true, // hide console windows on Windows
        detached: false, // false = end when parent process ends
      });
      // Could use stdin/stdout to talk instead of sockets/tcp!
      childProcess.on("error", (err) => {
        console.error("Child process had an error", err);
      });
      childProcess.stdout.on("data", (data: Buffer) => {
        const commandOutput = data.toString("utf-8");
        console.log("Got data:", commandOutput);
        vscode.window.showInformationMessage(command + ":\n" + commandOutput);
      });
      childProcess.stdin.write("Hello", (err) => {
        if (err) {
          console.error(err);
        }
        childProcess.stdin.end();
      });

      context.subscriptions.push({
        dispose() {
          if (childProcess.killed) {
            console.log(`Process '${command}' already killed.`);
          } else {
            console.log("Killing process ", childProcess.pid);
            childProcess.kill("SIGINT");
          }
        },
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
