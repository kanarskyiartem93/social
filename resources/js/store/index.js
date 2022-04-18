import Vuex from 'vuex'
import auth from "./modules/auth";

import middleware from './modules/middleware';

export default new Vuex.Store({
    modules: {
        middleware,
        auth
    }
})
