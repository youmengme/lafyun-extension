import * as vscode from 'vscode'

export default class Cache {
  context: vscode.ExtensionContext;
  constructor(context: vscode.ExtensionContext) {
    const versionKey = 'shown.version';
    context.globalState.setKeysForSync([versionKey]);
    this.context = context;
  }

  get(key: string, defaultValue?: any) {
    return this.context.globalState.get(key);
  }
  set(key: string, val: any) {
    return this.context.globalState.update(key, val);
  }
  update(key: string, val: any) {
    return this.context.globalState.update(key, val);
  }
  remove(key: string) {
    return this.context.globalState.update(key, undefined);
  }
}