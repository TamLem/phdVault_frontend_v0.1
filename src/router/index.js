import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import auth from '../middleware/auth'
import log from '../middleware/log'
import middlewarePipeline from '../middleware/middleware-pipeline'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            meta: {
                middleware: [auth, log]
            },
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: ForgotPasswordView
        },
        {
            path: '/reset-password',
            name: 'reset-password',
            component: ResetPasswordView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('../views/AboutView.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    /** Navigate to next if middleware is not applied */
    if (!to.meta.middleware) {
        return next();
    }

    const middleware = to.meta.middleware;
    const context = {
        to,
        from,
        next,
        router
        //   store  | You can also pass store as an argument
    };

    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1),
    });
});

export default router