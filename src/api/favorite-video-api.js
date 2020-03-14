import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'



let service = new Service(config)

export default {
  favoriteVideo(favoriteVideo){
    return service.post(`/favorite/favoriteVideo`,favoriteVideo,jsonConfig)
  },
  unFavoriteVideo(favoriteVideo){
    return service.post(`/favorite/unFavoriteVideo`,favoriteVideo,jsonConfig)
  },
  isFavorite(favoriteVideo){
    return service.get(`/favorite/isFavorite`,favoriteVideo)
  },
  getFavoriteCount(videoId){
    return service.get(`/favorite/getFavoriteCount`,videoId)
  }
}
