import { Service } from '../service'
import {config,jsonConfig, multipleConfig} from './axiosConfig'



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
