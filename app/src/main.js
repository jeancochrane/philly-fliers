// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;
Vue.use(Vuex);

const filters = {
    state: {
        types: [],
        activeType: ''
    },
    mutations: {
        updateActiveType(state, type) {
            state.activeType = type;
        }
    },
    actions: {},
    getters: {}
}

const store = new Vuex.Store({
    modules: {
        filters: filters
    },
    strict: process.env.NODE_ENV !== 'production'
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
});
