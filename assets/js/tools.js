class Tools {
  currentTime () {
    let currentDate = new Date()
    let year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)
    let date = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()
    let hours = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours()
    let minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes()
    let seconds = currentDate.getSeconds() < 10 ? '0' + currentDate.getSeconds() : currentDate.getSeconds()
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
  }
  showErrorBox (store, msg) {
    store.dispatch('showErrMsg', msg)
  }
}

export default new Tools()
