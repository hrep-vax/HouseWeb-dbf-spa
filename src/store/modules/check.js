import { httpRequest } from '../../util/helper.js'

const state = {
  profile: {},
}
const mutations = {
  SET_USER_PROFILE(state, profile) {
    state.profile = profile
  },
}

const getters = {}

const actions = {
  async handleCheckShow(_, payload) {
    const response = await httpRequest(
      'put',
      '/api/check/check-show',
      payload,
      localStorage.getItem('WEB_APP_KIT_TOKEN')
    )
    return response.data
  },
 async handleDbfAdd(_, payload) {
    const response = await httpRequest(
      'post',
      '/api/dbf/dbf-add',
      payload,
      localStorage.getItem('WEB_APP_KIT_TOKEN')
    )
    return response.data
  },
}

export default { state, getters, actions, mutations }
