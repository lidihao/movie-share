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

export default {
  getAllCategory(){
    return service.get(`/category/list`)
  }
}
