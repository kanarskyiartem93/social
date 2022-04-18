import axios from "axios";

const state = {
    userDetails: {},
    isLoggedIn: true
}

const actions = {
    registerUser({}, user) {
        return new Promise((resolve, reject) => {
            axios.post('/api/register', {
                name: user.name,
                email: user.email,
                password: user.password,
                password_confirmation: user.password_confirmation
            }).then(res => {
                if (res.data) {
                    window.location.replace('/login')
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    loginUser(cont, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/login', payload)
                .then(res => {
                    if (res.data.access_token) {
                        localStorage.setItem('token', res.data.access_token)
                        window.location.replace('/dashboard')
                    }
                }).catch((error) => {
                reject(error)
            })
        })
    },

    logout(cont) {
        return new Promise((resolve) => {
            localStorage.removeItem('token')
            cont.commit('setLoggedIn', false)
            resolve(true)
            window.location.replace('/login')
        })
    },

    setLoggedInstate(cont) {
        return new Promise((resolve) => {
            if (localStorage.getItem('token')) {
                cont.commit('setLoggedIn', true)
                resolve(true)
            }
            cont.commit('setLoggedIn', false)
            resolve(false)
        })
    }
}

const mutations = {
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload
    }
}

const getters = {
    loggedIn(state) {
        return state.isLoggedIn
    },
    userDetails(state) {
        return state.userDetails
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
