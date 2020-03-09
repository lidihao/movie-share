import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'
import user from "../store/modules/user";


let service = new Service(config)
export default {
  getVideoDetail(videoId){
    return service.get(`/video/videoDetail`,videoId)
  },
  getUploadVideo(data){
    return service.get(`/video/getUploadVideoByCondition`,data)
  },
  incrementVideoPlayCount(data){
    return service.post(`/video/incrementPlayCount`,data)
  }
}
