import { Service } from '../service'
import { multipleConfig } from './axiosConfig'

let config = {
  url: {
    development: 'http://localhost:8089',
    production: 'https://message-platform.huya.com',
    test: ''
  }
}

let service = new Service(config)

export default {
  uploadPicByManual(pic){
    return service.post(`/picUpload`,pic,multipleConfig)
  }
}
