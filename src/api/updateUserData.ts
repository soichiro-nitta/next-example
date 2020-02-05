// エンドポイント関数化のサンプル2
import request from '~/utils/request'
import { AxiosPromise } from 'axios'

type UpdateUserData = ({
  userId,
  data
}: {
  userId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) => AxiosPromise<any>

const updateUserData: UpdateUserData = ({ userId, data }) => {
  const path = `/users/${userId}`
  return request.put(path, { data })
}

export default updateUserData
