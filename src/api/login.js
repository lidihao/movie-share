import { Service } from '../service'
import { jsonConfig } from './axiosConfig'
import user from "../store/modules/user";

let config = {
  url: {
    development: 'http://localhost:8089',
    production: 'https://message-platform.huya.com',
    test: ''
  }
}

let service = new Service(config)

//获取验证码
export default {
  getCodeImg(){
    return service.get(`/auth/code`)
  },
  register(user){
    return service.post(`/auth/register`,user,jsonConfig)
  },
  loginSys(authUser){
    return service.post(`/auth/login`,authUser,jsonConfig)
  },
  getInfo(){
    return service.get(`/auth/userInfo`)
  }
}
