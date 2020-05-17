import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/layout'
import VideoManager from "../page/video-manager/VideoManager";
import Upload from "../page/video-manager/upload-item"
import Home from "../page/Home"
import VideoDetail from '../page/detail-sidebar/video-detail'
import CategoryDetail from '../page/Category-detail'
import PersonSpace from '../page/user/user-space'
import EmailValidate from '../page/user/email-validate'
import VideoApply from '../page/system/video-apply'
import ApplyDetail from '../page/system/apply-detail'
import VideoProcess from '../page/video-manager/video-process'
import VideoEdit from '../page/video-manager/video-edit'
import Test from '../page/test'
import Message from '../page/message'
import UserInfo from '@/page/user/user-info'
import Search from '@/page/search'
import RoleManager from '@/page/system/role-manager'
import MenuManager from '@/page/system/menu-manager'
import TaskManager from '@/page/system/task-manager'
import ResetPassword from '@/page/user/reset-password'
import TagBrowse from '@/page/tag-browse'
import TagDetail from '@/page/tag-detail'
import SystemMessage from '@/page/message/system-message'
import PersonRecommendBrower from '@/page/person-recommend-brower'
import HotRecommend from '@/page/hot-recommend'
import ChangeEmail from '@/page/user/change-email-validate'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      redirect: '/home',
      component: Layout,
      children:[
        {
          path: '/VideoManager',
          name: 'VideoManager',
          component: VideoManager,
          children:[
            {
              path: '/VideoManager/upload',
              name: 'upload',
              component: Upload
            },
            {
              path: '/VideoManager/process',
              name: 'process',
              component: VideoProcess
            }
          ],
          meta: { openNames: ['upload'], menuName: 'upload' }
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/video/videoPlay',
          name: 'video-detail',
          component: VideoDetail
        },
        {
          path:'/video/edit-detail',
          name: 'video-edit',
          component: VideoEdit
        },
        {
          path: '/video/category-detail',
          name: 'category-detail',
          component:CategoryDetail
        },
        {
          path: '/user/person-space',
          name: 'person-space',
          component: PersonSpace
        },
        {
          path:'/user/active',
          name: 'active-user',
          component: EmailValidate
        },
        {
          path:'/system/video-apply',
          name:'video-apply',
          component: VideoApply
        },
        {
          path:'/system/apply-detail',
          name:'apply-detail',
          component: ApplyDetail
        },
        {
          path:'test',
          name:'test',
          component:Test
        },
        {
          path:'/message-manager/instance-message',
          name:'message',
          component:Message
        },
        {
          path:'/user/user-info',
          name:'user-info',
          component:UserInfo
        },
        {
          path:'/search',
          name:'search',
          component:Search
        },
        {
          path:'/system/role-manager',
          name:'role-manager',
          component:RoleManager
        },
        {
          path:'/system/menu-manager',
          name:'menu-manager',
          component:MenuManager
        },
        {
          path:'/system/task-manager',
          name:'taskManager',
          component:TaskManager
        },
        {
          path:'/user/resetPassword',
          name:'resetPassword',
          component:ResetPassword
        },
        {
          path:'/video/tag-browse',
          name:'tagBrowse',
          component:TagBrowse
        },
        {
          path:'/video/tag-detail',
          name:'tagDetail',
          component:TagDetail
        },
        {
          path: '/message-manager/system-message',
          name:'system-message',
          component: SystemMessage
        },
        {
          path: '/person-recommend/brower',
          name: 'PersonRecommendBrower',
          component: PersonRecommendBrower
        },
        {
          path: '/hot-recommend',
          name: 'hot-recommend',
          component: HotRecommend
        },
        {
          path: '/user/changeEmail',
          name: 'changeEmail',
          component: ChangeEmail
        }
      ]
    }
  ]
})
