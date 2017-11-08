// import Gettoken from '../unit/aoth.js'
export default function ({ isClient, isServer, route, req, res, redirect }) {
//  在服务端判读是否需要登陆(如果直接输地址，在客户端是判断不到的)
  if (isServer) {
    let path = req.originalUrl
    // let token = Gettoken.getUserFromLocalStorage
    // console.log('3355' + token)
    if (path.indexOf('login') > 0) {
      redirect('/login')
    } else {
      redirect(path)
    }
  }
  if (isClient) {
    let token = localStorage.getItem('token')
    let isLogin = !!token
    if (route.path.indexOf('admin') > 0 && !isLogin) {
      redirect('/login')
    }
  }
}
// export default function ({ isClient, isServer, route, req, res, redirect }) {
// //  在服务端判读是否需要登陆(如果直接输地址，在客户端是判断不到的)
//   if (isServer) {
//     console.log('cookies', req.cookies)
//     let cookies = req.cookies
//     let path = req.originalUrl
//     if (path.indexOf('admin') > 0 && !cookies.token) {
//       redirect('/login')
//     } else {
//       redirect(path)
//     }
//   }
//   //  在客户端判读是否需要登陆
//
//   if (isClient) {
//     let token = localStorage.getItem('token')
//     let isLogin = !!token
//     if (route.path.indexOf('admin') > 0 && !isLogin) {
//       redirect('/login')
//     }
//   }
// }
