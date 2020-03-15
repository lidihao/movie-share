import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'


let service = new Service(config)

export default {
  listEpisodeByVideoId(videoId){
    return service.get(`/episode/listEpisode`,videoId)
  }
}
