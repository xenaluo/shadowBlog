export const state = () => ({
  errMsgBox: {
    isShow: false,
    msg: 'err'
  }
})

export const getters = {
  getErrMsg (state) {
    return state.errMsgBox
  }
}

export const mutations = {
  showErrMsg (state, msg) {
    state.errMsgBox.isShow = true
    state.errMsgBox.msg = msg
  },
  hideErrMsg (state, msg) {
    state.errMsgBox.isShow = false
  }
}

export const actions = {
  showErrMsg (context, msg) {
    context.commit('showErrMsg', msg)
    setTimeout(() => {
      context.commit('hideErrMsg', msg)
    }, 1000)
  }
}
