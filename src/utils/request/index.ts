import axios, { AxiosPromise } from 'axios'
const apiRoot = '/api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Method = (url: string, config?: any) => AxiosPromise<any>
type Request = {
  get: Method
  post: Method
  put: Method
  delete: Method
}

const request: Request = {
  async get(url, config = {}) {
    return await axios({
      method: 'GET',
      url: `${apiRoot}${url}`,
      ...config
    })
      .then(res => res.data)
      .catch(err => err)
  },
  async post(url, config = {}) {
    return await axios({
      method: 'POST',
      url: `${apiRoot}${url}`,
      ...config
    })
      .then(res => res.data)
      .catch(err => err)
  },
  async put(url, config = {}) {
    return await axios({
      method: 'PUT',
      url: `${apiRoot}${url}`,
      ...config
    })
      .then(res => res.data)
      .catch(err => err)
  },
  async delete(url, config = {}) {
    return await axios({
      method: 'DELETE',
      url: `${apiRoot}${url}`,
      ...config
    })
      .then(res => res.data)
      .catch(err => err)
  }
}

export default request
