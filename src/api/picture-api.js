import { Service } from '../service'
import {jsonConfig, multipleConfig} from './axiosConfig'

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
  },
  getSkinListByUserId(params){
    return service.get(`/picUpload/skinList`,params)
  },
  addSkin(data){
    return service.post(`/picUpload/addSkin`,data,jsonConfig)
  },
  updateSkin(data){
    return service.put(`/picUpload/updateSkin`,data,jsonConfig)
  },
  deleteSkin(data){
    return service.post(`/picUpload/deleteSkin`,data,jsonConfig)
  }
}
