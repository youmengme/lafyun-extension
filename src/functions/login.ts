import * as vscode from 'vscode';

import Cache from '../utils/cache';
import { login } from '../api/index';

const domainRegexp = /^(http(s)?:\/\/)\w+[^\s]+(\.[^\s]+){1,}$/;
let deployUrl = 'https://console.lafyun.com';

async function doLogin(context: vscode.ExtensionContext) {
  const cache = new Cache(context);
  console.log('userInfo', cache.get('userInfo'));
  const isPrivateDeploy = await vscode.window.showQuickPick(['是', '否'], {
    placeHolder: '是否是私有部署',
  });
  if (isPrivateDeploy === '是') {
    const privateDeployUrl = await vscode.window.showInputBox({
      placeHolder: '请输入私有部署的地址',
    });
    if (privateDeployUrl && domainRegexp.test(privateDeployUrl)) {
      deployUrl = privateDeployUrl;
    } else {
      vscode.window.showErrorMessage('请输入正确的私有部署地址');
      throw new Error('请输入正确的私有部署地址');
    }
  }
  console.log('isPrivateDeploy', isPrivateDeploy);
  const account = await vscode.window.showInputBox({
    ignoreFocusOut: true,
    password: false,
    prompt: "请输入lafyun账号"
  });

  console.log('account', account);
  if (!account) {
    vscode.window.showErrorMessage('请输入正确的账号');
    throw new Error('请输入正确的账号');
  }

  const password = await vscode.window.showInputBox({
    ignoreFocusOut: true,
    password: false,
    prompt: "请输入lafyun密码"
  });
  console.log('password', password);
  if (!password) {
    vscode.window.showErrorMessage('请输入正确的密码');
    throw new Error('请输入正确的密码');
  }
  const appid = await vscode.window.showInputBox({
    ignoreFocusOut: true,
    password: false,
    prompt: "请输入lafyun APPID"
  });
  console.log('appid', appid);

  if (!appid) {
    vscode.window.showErrorMessage('请输入正确的APPID');
    throw new Error('请输入正确的APPID');
  }

  login(deployUrl, {
    username: "youmeng",
    password: "qxv4tga9eyx_pmf6TNX"
  }).then(res => {
    console.log('res', res);
    if (res?.code === 0) {
      cache.set('accountInfo', {
        account,
        password,
        appid,
        deployUrl,
      });
      cache.set('userInfo', res?.data);
      vscode.window.showInformationMessage(
        '登录成功',
        {
          detail: `欢迎回来~ ${res?.data?.username}`,
        }
      );
    }
  }).catch((err) => {
    console.log('err', err?.message)
    vscode.window.showInformationMessage(
      '登录失败',
      { detail: err?.message }
    );
  })
}

export default function (context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand(
    'extension.login',
    () => doLogin(context)
  ));
}