import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'



let service = new Service(config)

export default {
  isFollow(data){
    return service.post(`/follow/isFollow`,data,jsonConfig)
  },
  followUser(data){
    return service.post(`/follow/followUser`,data,jsonConfig)
  },
  unFollowUser(data){
    return service.post(`/follow/unFollow`,data,jsonConfig)
  },
  getFollowingCount(data){
    return service.get(`/follow/getFollowingCount`,data)
  },
  getFollowedCount(data){
    return service.get(`/follow/getFollowedCount`,data)
  },
  getFollowingUserList(params) {
    return service.get(`/follow/getFollowingUserList`,params)
  },
  getFollowedUserList(params){
    return service.get(`/follow/getFollowedUserList`,params)
  }
}
