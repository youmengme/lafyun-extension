import { post } from '../utils/request'

interface BaseResponse<T> {
  code: number
  data: T,
}

interface UserInfo {
  account_token: string
  expire: number
  uid: string
  username: string
}
export function login(
  domain: string,
  data: {
    username: string
    password: string
  }
) {
  return post<BaseResponse<UserInfo>>(
    `${domain}/sys-api/account/login`,
    {
      username: data.username,
      password: data.password,
    }
  );
}