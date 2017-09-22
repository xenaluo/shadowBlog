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
  },
  addClassify (state, payload) {
    console.log('add-classify')
    state.classifyList.push(payload)
  },
  updateClassify (state, payload) {
    console.log('update-classify', payload)
    state.classifyList.map((item, index) => {
      if (payload.oldName === item.name) {
        state.classifyList[index] = payload
      }
    })
  },
  deleteClassify (state, payload) {
    console.log(payload)
    state.classifyList.map((item, index) => {
      if (payload.name === item.name) {
        console.log(item, index)
        state.classifyList.splice(index, 1)
      }
    })
  }
}

export const actions = {
  initClassifyList (context, list) {
    context.commit('initClassifyList', list)
  },
  addClassify (context, classify) {
    context.commit('addClassify', classify)
  },
  updateClassify (context, classify) {
    context.commit('updateClassify', classify)
  },
  deleteClassify (context, classify) {
    context.commit('deleteClassify', classify)
  }
}
