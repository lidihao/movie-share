import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'



let service = new Service(config)

export default {
  getAllTag(){
    return service.get(`/tag/list`)
  },
  getTagCountList(){
  	return service.get('/tag/tagCountList')
  }
}
