import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'
import user from "../store/modules/user";



let service = new Service(config)

export default {
  getAllTag(){
    return service.get(`/tag/list`)
  }
}
