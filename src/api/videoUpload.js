import { Service } from '../service'
import { config,jsonConfig } from './axiosConfig'



let service = new Service(config)

export default {
  mergeVideoFile(videoFile){
    return service.post(`/videoUpload/mergeFile`,videoFile,jsonConfig)
  },
  addVideoMeta(videoMeta){
    return service.post(`/videoUpload/videoMeta`,videoMeta,jsonConfig)
  }
}
