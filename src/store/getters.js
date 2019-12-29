const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  isLogin: state => state.user.isLogin
}
export default getters
