import axios from 'axios'
import { baseURL } from './config'

const instance = axios.create({
  baseURL
})

instance.interceptors.response.use((res) => {
  if (res.data.code !== 200) {
    throw [res.data.code, res.data.msg]
  }
  return res
})

export default instance
