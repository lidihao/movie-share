import { Service } from '../service'
import { jsonConfig } from './axiosConfig'

let config = {
  url: {
    development: 'http://localhost:8089',
    production: 'https://message-platform.huya.com',
    test: ''
  }
}

let service = new Service(config)

export default {
  listVideoApply(params){
    return service.get(`/videoApply/list`,params)
  }
}
