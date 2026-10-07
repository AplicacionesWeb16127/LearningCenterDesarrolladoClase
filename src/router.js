import {createRouter, createWebHistory} from 'vue-router';
import Home from './shared/presentation/views/Home.vue';
import publishingRoutes from './publishing/presentation/publishing-routes.js';

const about = () => import('./shared/presentation/views/About.vue');
const pageNotFound = () => import('./shared/presentation/views/Page-Not-Found.vue');
const routes =[
    { path: '/home',name :'home', component: Home , meta: { title: 'Home' } },
    { path: '/about',name :'about', component: about, meta: { title: 'About' } },
    { path: '/:pathMatch(.*)*',name :'pageNotFound', component: pageNotFound, meta: { title: 'Page Not Found' }},
    { path: '/', redirect: '/home' },
    { path: '/publishing', name:'publishing', children: publishingRoutes}
];

const router = createRouter(
    {
        history: createWebHistory(),
        routes: routes
    }
);

router.beforeEach((to, from) => {
    console.log(`$ Navigating from ${from.name} to ${to.name}`);
    let baseTitle = 'Learning Platform';
    document.title = `${baseTitle} - ${to.meta.title}`;
    return true;
});

export default router;


