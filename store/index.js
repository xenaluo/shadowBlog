export const state = () => ({
  classifyList: []
})

export const getters = {
  getClassifyList (state) {
    return state.classifyList
  }
}

export const mutations = {
  initClassifyList (state, list) {
    state.classifyList = list
  }
}

export const actions = {
  initClassifyList (context, list) {
    context.commit('initClassifyList', list)
  }
}
