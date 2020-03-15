import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'


let service = new Service(config)

export default {
  getAllMenuList(){
    return service.get(`/menuManager/getAllMenu`)
  },
  getMenuDetail(params){
    return service.get(`/menuManager/getMenuDetail`,params)
  },
  addMenu(menu){
    return service.post(`/menuManager/addMenu`,menu,jsonConfig)
  },
  updateMenu(menu){
    return service.post(`/menuManager/updateMenu`,menu,jsonConfig)
  },
  deleteMenu(menuId){
    return service.post(`/menuManager/deleteMenu`,menuId)
  }
}
