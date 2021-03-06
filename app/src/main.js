// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//
// Import Bootstrap and Bootstrap styles first, so that Vue Loader will load
// those stlyes first. For details, see:
// https://github.com/vuejs/vue-loader/issues/140#issuecomment-371270232
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbtack, faFilter, faArrowRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App';
import router from './router';
import store from './store';


// Register FontAwesome component.
library.add(faThumbtack, faFilter, faArrowRight, faInfoCircle);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
});
