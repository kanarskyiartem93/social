import axios from "../../../axios/axios-instance";

const state = {
    userDetails: {},
    isLoggedIn: true,
    errors: [],
    invalidCredentials: ''
}

const actions = {
    registerUser(cont, user) {
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
                if (error.response.status === 422) {
                    cont.commit('setErrors', error.response.data.errors)
                }
                console.log(this.errors)
            })
        })
    },
    loginUser(cont, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/login', payload)
                .then(res => {
                    if (res.data.access_token) {
                        localStorage.setItem('token', res.data.access_token)
                        cont.commit('setLoggedIn', true)
                        window.location.replace('/dashboard')
                    }
                }).catch((error) => {
                if (error.response.data.error) {
                    cont.commit('setInvalidCredentials', error.response.data.error)
                } else if (error.response.status === 422) {
                    cont.commit('setErrors', error.response.data.errors)
                }
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
    },

    forgotPassword(cont, user) {
        return new Promise((resolve, reject) => {
            axios.post('/api/forgot-password', {
                email: user.email
            }).then(res => {
                if (res.data) {
                    window.location.replace('/login')
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch((error) => {
                console.log(error.response)
                if (error.response.status === 500) {
                    cont.commit('setInvalidCredentials', error.response.data.error)
                } else if (error.response.status === 422) {
                    cont.commit('setErrors', error.response.data.errors)
                }
            })
        })
    },
    resetPassword(cont, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/reset-password', payload)
                .then(res => {
                    if (res.data) {
                        window.location.replace('/login')
                        resolve(response)
                    } else {
                        reject(response)
                    }
                }).catch((error) => {
                console.log(error.response)
                if (error.response.status === 500) {
                    cont.commit('setInvalidCredentials', error.response.data.error)
                } else if (error.response.status === 422) {
                    cont.commit('setErrors', error.response.data.errors)
                }
            })
        })
    },

    currentUser(cont) {
        return new Promise((resolve, reject) => {
            axios.get('user')
                .then((res) => {
                    cont.commit('setUserDetails', res.data.data)
                    console.log(res)
                }).catch((error) => {
                    reject(error)
            })
        })
    }
}

const mutations = {
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload
    },
    setErrors(state, errors) {
        state.errors = errors
    },
    setInvalidCredentials(state, invalidCredentials) {
        state.invalidCredentials = invalidCredentials
    },
    setUserDetails(state, payload) {
        state.userDetails = payload
    }
}

const getters = {
    loggedIn(state) {
        return state.isLoggedIn
    },
    userDetails(state) {
        return state.userDetails
    },
    errors(state) {
        return state.errors
    },
    invalidCredentials(state) {
        return state.invalidCredentials
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
