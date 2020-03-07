import Vue from 'vue'
import axios from 'axios'
import { getToken,removeToken } from '@/utils/auth'

axios.defaults.withCredentials = true


const defaultConfig = {
  transform: true,
  // withCredentials: true,
  transformRequest (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

//request拦截器
function requestInterceptor(request){
  if (getToken()) {
    request.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return request
}

// 响应成功拦截器
function responseInterceptors (response) {
  const code = response.status
  if (code < 200 || code > 300) {
    Vue.prototype.$Notice.error({
      title: `错误code:${code}`
    })
    return Promise.reject('error')
  }else {
    return response.data
  }
}

// 响应失败拦截器
function onReject (error) {
  if(error.response&&error.response.status===401){
    removeToken()
    return Promise.reject(error)
  }
  if (error.response && error.response.status === 601) {
    return Promise.reject(error)
  }
  Vue.prototype.$Message.error('请求服务器失败！')
  // Do something with response error
  return Promise.reject(error)
}

function mergeConfig (customConfig) {
  let config = Object.assign({}, defaultConfig, customConfig)
  if (!config.transform) delete config.transformRequest
  return config
}

export class Service {
  constructor (config) {
    this.axiosInstance = ''
    this.init(config)
  }
  init (config) {
    let env = process.env.NODE_ENV
    let axiosConfig = {
      baseURL: config.url[env]
    }
    this.axiosInstance = axios.create(axiosConfig)
    this.axiosInstance.interceptors.response.use(responseInterceptors, onReject)
    this.axiosInstance.interceptors.request.use(
      requestInterceptor,
      (error)=>{
      console.log(error) // for debug
      Promise.reject(error)
    })
  }
  async get (url, params) {
    let str = '?'
    for (let key in params) {
      if (params.hasOwnProperty(key) && (params[key] || (params[key] !== '' && !isNaN(params[key]) && params[key] >= 0))) {
        str += `${key}=${params[key]}&`
      }
    }
    url = `${url}${str}`
    let data = await this.axiosInstance.get(url, params)
    return data
  }
  async post (url, params, customConfig) {
    let config = mergeConfig(customConfig)
    let data = await this.axiosInstance.post(url, params, config)
    return data
  }
  async put (url, params, customConfig) {
    let config = mergeConfig(customConfig)
    let data = await this.axiosInstance.put(url, params, config)
    return data
  }
  async delete (url, params, customConfig) {
    let config = mergeConfig(customConfig)
    let data = await this.axiosInstance.delete(url, params, config)
    return data
  }
}
