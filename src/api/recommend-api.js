import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'



let service = new Service(config)

export default{
	getRecentlyHotVideo(params){
		return service.get(`/recommend/recentlyHot`,params)
	},
	getCategoryHotVideo(params){
		return service.get(`/recommend/getCategoryRecentlyHot`,params)
	},
	getPersonRecommend(params){
		return service.get('/recommend/getPesonalRecommend',params)
	}
}