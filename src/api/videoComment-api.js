import { Service } from '../service'
import { config,jsonConfig } from './axiosConfig'



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
