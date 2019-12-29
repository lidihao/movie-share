import { getToken, setToken, removeToken } from '@/utils/auth'
import LoginAction from '@/api/login'
import md5 from 'js-md5'

const user = {
  state: {
    token: getToken(),
    isLogin: false,
    user: {},
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
            debugger
            setToken(res.result.token, rememberMe)
            console.log(getToken())
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
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}


export const setUserInfo = (res, commit) => {
  let user = {
    userName:res.userName,
    avatarUrl:res.avatarUrl,
    email:res.email
  }
  let menus = res.menus
  commit('SET_LOGIN',true)
  commit('SET_MENUS', menus)
  commit('SET_USER', user)
}

export default user
