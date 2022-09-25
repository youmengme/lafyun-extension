import * as vscode from 'vscode';

export default function (context: vscode.ExtensionContext) {
  console.log(123123);
  context.subscriptions.push(vscode.commands.registerCommand('extension.debugFunction', () => {
    vscode.window.showInformationMessage('您执行了extension.debugFunction');
    const accountInput = vscode.window.createInputBox();
    accountInput.placeholder = '请输入lafyun的登录用户名';

    const passwordInput = vscode.window.createInputBox();
    passwordInput.placeholder = '请输入lafyun的登录密码';

    accountInput.show()
    passwordInput.show()
}));

}