import Gettoken from '../unit/aoth.js'
export default function ({ isClient, isServer, route, req, res, redirect }) {
//  在服务端判读是否需要登陆(如果直接输地址，在客户端是判断不到的)
  if (isServer) {
    let path = req.originalUrl
    let token = Gettoken.getUserFromLocalStorage
    console.log('3355' + token)
    if (path.indexOf('admin') > 0) {
      redirect('/login')
    }
  }
  //  在客户端判读是否需要登陆
  // console.log(req)
  // console.log(req.headers['authorization'])
  // // let token = req.headers.authorization
  // if (isClient) {
  //   console.log(route.path)
  //   if (route.path.indexOf('admin') > 0) {
  //     redirect('/login')
  //   }
  // }
  if (isClient) {
    let token = localStorage.getItem('token')
    let isLogin = !!token
    if (route.path.indexOf('admin') > 0 && !isLogin) {
      redirect('/login')
    }
  }
}
