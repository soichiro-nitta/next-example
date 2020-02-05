// エンドポイント関数化のサンプル1
import request from '~/utils/request'
import { AxiosPromise } from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetUserData = ({ userId }: { userId: string }) => AxiosPromise<any>

const getUserData: GetUserData = ({ userId }) => {
  const path = `/users/${userId}`
  return request.get(path)
}

export default getUserData
