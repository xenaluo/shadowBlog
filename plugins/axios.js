// import * as axios from 'axios'
// // let options = {}
// // The server-side needs a full url to works
// let instance = axios.create()
// instance.interceptors.request.use(config => {
//   let token = localStorage.getItem('token')
//   console.log('888' + token)
//   if (token) {
//     config.headers.common['Authorization'] = token
//   }
//   return config
// }, err => {
//   console.log(err)
//   return Promise.reject(err)
// })
// if (process.server) {
//   axios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
// }
// export default axios

// import * as axios from 'axios'
// export default ({ app, store, redirect }) => {
//   // The server-side needs a full url to works
//   console.log('888')
//   if (process.SERVER_BUILD) {
//     axios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
//     console.log('999')
//   }
//   let instance = axios.create()
//   // interceptors request
//   instance.interceptors.request.use(config => {
//     console.log('000')
//     if (typeof document === 'object') {
//       // let token = localStorage.getItem('token')
//       let token = '2222222222'
//       if (token) {
//         config.headers.Authorization = token
//       }
//     }
//     return config
//   }, err => {
//     return Promise.reject(err)
//   })
// }
// import * as axios from 'axios'

// export default ({ app, store, redirect }) => {
//   // The server-side needs a full url to works
//   if (process.SERVER_BUILD) {
//     axios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
//   }

//   // interceptors request
//   axios.interceptors.request.use(config => {
//     if (typeof document === 'object') {
//       let token = localStorage.getItem('token') || 'nil'
//       if (token) {
//         config.headers.Authorization = token
//       }
//     }
//     console.log('config', config)
//     return config
//   }, err => {
//     console.log('err', err)
//     return Promise.reject(err)
//   })

//   axios.interceptors.response.use(response => {
//     if (response.data.code === 401) {
//       redirect('/login')
//     }
//     console.log('axios-response', response)
//     return response
//   }, function (error) {
//     console.log('response-err', error)
//     return Promise.reject(error)
//   })
// }

import * as axios from 'axios'

// 创建实例时设置配置的默认值
let instance = axios.create({
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
})
if (typeof document === 'object') {
  let AUTH_TOKEN = localStorage.getItem('token')
  // 在实例已创建后修改默认值
  instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
}

export default instance
