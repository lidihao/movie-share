import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/layout'
import VideoManager from "../page/VideoManager";
import Upload from "../page/video-manager/upload-item"
import Home from "../page/Home"
import VideoDetail from '../page/video-detail'
import CategoryDetail from '../page/Category-detail'

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
        }
      ]
    }
  ]
})
