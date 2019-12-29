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
        }
      ]
    }
  ]
})
