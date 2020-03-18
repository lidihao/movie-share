import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'


let service = new Service(config)

export default {
  getAllRoleList(){
    return service.get(`/role/getAllRole`)
  },
  getMenuTreeLeaf(roleId){
    return service.get(`/role/getMenuTreeLeafByRoleId`,roleId)
  },
  updateMenuTree(data){
    return service.post(`/role/updateMenuTree`,data)
  }
}
