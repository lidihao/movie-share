import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'


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
  },
  getFavoriteVideo(data){
    return service.get(`/favorite/getFavoriteVideoList`,data)
  },
  getVideoByCategory(data){
    return service.get(`/video/getVideoByCategory`,data)
  },
  searchVideo(data){
    return service.get(`/video/searchVideo`,data)
  },
  endPlayVideo(videoId){
    return service.post('/video/endplayVideo',videoId)
  }
}
