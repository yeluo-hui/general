import axios from 'axios'
import {getToken} from '../utils/auth'
import { token } from '../settings'
import { MessageBox, Message} from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: '/', // api的base_url
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers[token] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
/*// response拦截器
*/
// response拦截器
service.interceptors.response.use(
    response => {

        const res = response.data
        const config = response.config
        // 二进制流处理
        if (config && config.responseType === 'blob') {
            return response
        }
        if (res.code === 401) {
            MessageBox.confirm('登录状态已过期，请您重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                location.reload()
            })
        } else if (res.code !== 200) {
            Message({
                message: res.message || '系统异常',
                type: 'error',
                duration: 2000
            })
        } else {
            return res
        }
    },
    error => {
        console.log('请求异常：' + error)
        let { message } = error
        if (message === 'Network Error') {
            message = '后端接口连接异常'
        } else if (message.includes('timeout')) {
            message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
            message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        Message({
            message: message,
            type: 'error',
            duration: 5000
        })
        return Promise.reject(error)
    }
)

export default service
