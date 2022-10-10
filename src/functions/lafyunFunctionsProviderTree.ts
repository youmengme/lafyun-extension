import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class FunctionProvider implements vscode.TreeDataProvider<FunctionItem> {

	private _onDidChangeTreeData: vscode.EventEmitter<FunctionItem | undefined | void> = new vscode.EventEmitter<FunctionItem | undefined | void>();

	readonly onDidChangeTreeData: vscode.Event<FunctionItem | undefined | void> = this._onDidChangeTreeData.event;

	constructor() {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: FunctionItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: FunctionItem): Thenable<FunctionItem[]> {
		// if (!this.workspaceRoot) {
		// 	vscode.window.showInformationMessage('No FunctionItem in empty workspace');
		// 	return Promise.resolve([]);
		// }

		const items = [
			new FunctionItem(
				'All',
				'',
				vscode.TreeItemCollapsibleState.Collapsed,
				{
					command: 'extension.docs.open',
					title: '123',
					arguments: ['https://www.baidu.com']
				}
			),
			new FunctionItem(
				'Tags',
				'',
				vscode.TreeItemCollapsibleState.Collapsed,
				{
					command: 'extension.docs.open',
					title: '123',
					arguments: ['https://www.baidu.com']
				}
			)
		]
		console.log('items', items)
		return Promise.resolve(items);
	}
}

export class FunctionItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		private readonly version: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);

		this.tooltip = `${this.label}-${this.version}`;
		this.description = this.version;
	}

	iconPath = vscode.ThemeIcon.Folder;
	contextValue = '';
}

export default function (context: vscode.ExtensionContext) {
	const functionsProvider = new FunctionProvider();

	vscode.window.registerTreeDataProvider('functions', functionsProvider)
	vscode.commands.registerCommand('extension.functions.open', (url) => {
		vscode.env.openExternal(vscode.Uri.parse(url));
	});
}