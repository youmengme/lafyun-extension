import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class DepNodeProvider implements vscode.TreeDataProvider<Dependency> {

	private _onDidChangeTreeData: vscode.EventEmitter<Dependency | undefined | void> = new vscode.EventEmitter<Dependency | undefined | void>();

	readonly onDidChangeTreeData: vscode.Event<Dependency | undefined | void> = this._onDidChangeTreeData.event;

	constructor() {
	}

	refresh(): void {
		vscode.window.showInformationMessage('123123123');
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: Dependency): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Dependency): Thenable<Dependency[]> {
		const items = [
			new Dependency(
				'云开发文档',
				'',
				vscode.TreeItemCollapsibleState.None,
				{
					command: 'extension.openDocs',
					title: '123',
					arguments: ['https://www.baidu.com']
				}
			),
			new Dependency(
				'云开发控制台',
				'',
				vscode.TreeItemCollapsibleState.None,
				{
					command: 'extension.openDocs',
					title: '123',
					arguments: ['https://www.baidu.com']
				}
			),
			new Dependency(
				'开发者社区',
				'',
				vscode.TreeItemCollapsibleState.None,
				{
					command: 'extension.openDocs',
					title: '123',
					arguments: ['https://www.baidu.com']
				}
			),
			new Dependency(
				'Github Issues',
				'',
				vscode.TreeItemCollapsibleState.None,
				{
					command: 'extension.openDocs',
					title: '123',
					arguments: ['https://www.baidu.com']
				}
			)
		]
		return Promise.resolve(items);
	}
}

export class Dependency extends vscode.TreeItem {
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

	iconPath = vscode.ThemeIcon.File;
	contextValue = '';
}

export default function (context: vscode.ExtensionContext) {
	const helpProvider = new DepNodeProvider();
	vscode.window.registerTreeDataProvider('docs', helpProvider)
	vscode.commands.registerCommand('extension.openDocs', (url) => {
		vscode.env.openExternal(vscode.Uri.parse(url))
	});
	vscode.commands.registerCommand('extension.refreshDocs', () => {
		helpProvider.refresh()
	});
}