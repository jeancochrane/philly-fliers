import Vue from 'vue';
import Router from 'vue-router';
import IndexView from '@/components/Index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'IndexView',
            component: IndexView,
        },
    ],
});
