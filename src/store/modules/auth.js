import { httpRequest } from '../../util/helper.js'

const state = {
    userDetails: {},
    tokenIsExpired: false
}

const mutations = {
    SET_USER_DETAILS(state, userDetails) {
        state.userDetails = userDetails
    },
    SET_TOKEN_EXPIRATION_STATE(state, isExpired) {
        state.tokenIsExpired = isExpired
    }
}

const getters = {
    getTokenIsExpiredState: (state) => state.tokenIsExpired
}

const actions = {
  async handleLogin({ commit }, { hrep_id, password }) {
        const response = await httpRequest('post', '/api/auth/login', {
            hrep_id: hrep_id,
            password: password,
        })

        // Save the user details and token in the browser
        localStorage.setItem(
            'WEB_APP_KIT_USER',
            JSON.stringify(response.data.user)
        )
        localStorage.setItem('WEB_APP_KIT_TOKEN', response.data.access_token)

        commit('SET_USER_DETAILS', response.data)
    },
    async handleLogout({ commit }) {
        await httpRequest(
            'post',
            '/api/auth/logout',
            {},
            localStorage.getItem('WEB_APP_KIT_TOKEN')
        )
        localStorage.removeItem('WEB_APP_KIT_USER')
        localStorage.removeItem('WEB_APP_KIT_TOKEN')

        commit('SET_USER_DETAILS', {})
    },
    async handleRegistration({ commit }, userDetails) {
        const response = await httpRequest(
            'post',
            '/api/auth/register',
            userDetails
        )

        //Save the user details and token in the browser
        localStorage.setItem(
            'WEB_APP_KIT_USER',
            JSON.stringify(response.data.user)
        )
        localStorage.setItem('WEB_APP_KIT_TOKEN', response.data.access_token)

        commit('SET_USER_DETAILS', response.data)
    },
  async handleEmailAvailability(_, email) {
    alert("handleEmailAvailability");
        const response = await httpRequest(
            'post',
            '/api/auth/show-email-availability',
            { email: email }
        )
        return response.data.email_available
    },
    async handleForgotPassword(_, email) {
        await httpRequest('post', '/api/auth/forgot-password', { email })
    },

    async handleResetPassword(_, payload) {
        await httpRequest('post', '/api/auth/reset-password', payload)
    },

    handleSetTokenExpirationState({ commit }, state) {
        commit("SET_TOKEN_EXPIRATION_STATE", state)
    }
}

export default { state, getters, actions, mutations }
