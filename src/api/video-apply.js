import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'



let service = new Service(config)

export default {
  listVideoApply(params){
    return service.get(`/videoApply/list`,params)
  },
  getVideoApplyDetail(videoApprovalId){
    return service.get(`/videoApply/applyDetail/${videoApprovalId}`)
  },
  listVideoFileDetail(params){
    return service.get(`/videoApply/applyDetail/videoFileList`,params)
  },
  doApplyVideo(params){
    return service.post(`/videoApply/doApplyVideo`,params,jsonConfig)
  },
  listApplyStatusTag(){
    return service.get(`/videoApply/listVideoApprovalTag`)
  },
  listUploadVideo(approvalStatus){
    return service.get(`/videoApply/listUploadVideo`,approvalStatus)
  },
  updateVideoApply(params){
    return service.put(`/videoApply/update`,params,jsonConfig)
  }
}
