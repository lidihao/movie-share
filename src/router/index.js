import router from "./routers";
import store from '@/store'
import {getToken} from "@/utils/auth";

router.beforeEach((to, from, next)=>{
  if (!store.getters.isLoadMenu){
    store.dispatch('GetMenuTreeInfo')
  }
  if (getToken()){
    if(!store.getters.isLogin){
      store.dispatch('GetInfo').then(res => { // 拉取user_info
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  next()
})
