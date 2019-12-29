import { getToken, setToken, removeToken } from '@/utils/auth'
import LoginAction from '@/api/login'
import md5 from 'js-md5'

const user = {
  state: {
    token: getToken(),
    isLogin: false,
    user: {},
    isLoadMenu:false,
    menus: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin
    },
    SET_ISLOADMENU: (state,isLoadMenu) => {
      state.isLoadMenu = isLoadMenu
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const rememberMe = userInfo.rememberMe
      return new Promise((resolve, reject) => {
        let authUser = {
          userName:userInfo.username,
          password:md5(userInfo.password),
          validateCode:userInfo.validCode,
          uuid:userInfo.uuid
        }
        LoginAction.loginSys(authUser).then(res => {
          if (res.code === 200){
            setToken(res.result.token, rememberMe)
            commit('SET_TOKEN', res.result.user)
            setUserInfo(res.result.user, commit)
            resolve(res)
          }else{
            reject(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        LoginAction.getInfo().then(res => {
          if (res.code===200) {
            setUserInfo(res.result, commit)
            resolve(res)
          }else{
            reject(res)
          }
        })
      })
    },
    //菜单信息
    GetMenuTreeInfo({commit}){
      return new Promise(((resolve, reject) => {
        LoginAction.getMenuInfo().then(res=>{
          console.log(res)
          if (res.code===200){
            setMenuTreeInfo(res.result,commit)
          }else{
            reject(res)
          }
        })
      }))
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        LoginAction.logout().then(res => {
          logOut(commit)
          resolve()
        }).catch(error => {
          logOut(commit)
          reject(error)
        })
      })
    },
  }
}

//退出登录
export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_LOGIN',false)
  commit('SET_USER', [])
  commit('SET_MENUS',[])
  commit('SET_ISLOADMENU',false)
  removeToken()
}

export const setMenuTreeInfo = (res,commit)=>{
  commit('SET_MENUS',res)
  commit('SET_ISLOADMENU',true)
}

export const setUserInfo = (res, commit) => {
  let user = {
    userName:res.userName,
    avatarUrl:res.avatarUrl,
    email:res.email
  }
  setMenuTreeInfo(res.menus,commit)
  commit('SET_LOGIN',true)
  commit('SET_USER', user)
}

export default user
