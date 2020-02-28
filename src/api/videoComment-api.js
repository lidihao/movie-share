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
  commentVideo(videoComment){
    return service.post(`/video/comment/doComment`,videoComment,jsonConfig)
  },
  listVideoCommentByVideoId(params){
    return service.get(`/video/comment/listComment`,params)
  },
  replyComment(commentReply){
    return service.post(`/video/comment/replyComment`,commentReply,jsonConfig)
  },
  listCommentReply(params){
    return service.get(`/video/comment/listReply`,params)
  }
}
