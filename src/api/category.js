import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'
import user from "../store/modules/user";



let service = new Service(config)

export default {
  getAllCategory(){
    return service.get(`/category/list`)
  }
}
