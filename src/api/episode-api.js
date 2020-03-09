import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'
import user from "../store/modules/user";


let service = new Service(config)

export default {
  listEpisodeByVideoId(videoId){
    return service.get(`/episode/listEpisode`,videoId)
  }
}
