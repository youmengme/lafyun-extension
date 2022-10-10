// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import helpDocProviderTree from './functions/helpDocProviderTree';
import lafyunFunctionsProviderTree from './functions/lafyunFunctionsProviderTree';
import login from './functions/login';

export function activate(context: vscode.ExtensionContext) {
	helpDocProviderTree(context);
	lafyunFunctionsProviderTree(context);
	login(context);
}

// this method is called when your extension is deactivated
export function deactivate() { }
