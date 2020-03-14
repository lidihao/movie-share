import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'



let service = new Service(config)

export default {
  getAllCategory(){
    return service.get(`/category/list`)
  }
}
