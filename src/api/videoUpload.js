import { Service } from '../service'
import { jsonConfig } from './axiosConfig'

let config = {
  url: {
    development: 'http://localhost:8089',
    production: 'https://message-platform.huya.com',
    test: ''
  }
}

let service = new Service(config)

export default {
  mergeVideoFile(videoFile){
    return service.post(`/videoUpload/mergeFile`,videoFile,jsonConfig)
  },
  addVideoMeta(videoMeta){
    return service.post(`/videoUpload/videoMeta`,videoMeta,jsonConfig)
  }
}
