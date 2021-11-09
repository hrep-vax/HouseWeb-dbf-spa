import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import user from './modules/user'
import dbf from './modules/dbf'
import check from './modules/check'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {auth, user, dbf, check},
  //modules: {auth, user, dbf},
})
