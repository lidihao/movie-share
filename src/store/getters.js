const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  isLogin: state => state.user.isLogin,
  isLoadMenu: state => state.user.isLoadMenu,
  menuTree: state => state.user.menus
}
export default getters
