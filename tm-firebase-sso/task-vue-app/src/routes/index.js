import { createRouter, createWebHistory } from 'vue-router';
//import HomePage from '../components/Dashboard/HomePage.vue';
import DashboardPage from '../components/Dashboard/DashboardPage.vue';
// import TaskComponent from '../components/Dashboard/Task/TaskComponent.vue';
import OrganiseComponent from '../components/Organiser/OrganiseComponent.vue';
import TaskCreationComponent from '../components/Dashboard/Task/TaskCreationComponent.vue';
import DetailTaskComponent from '../components/Dashboard/Task/DetailTaskComponent.vue';
import AuthComponent from '../components/Common/AuthComponent.vue';
import LoginComponent from '../components/Common/LoginComponent.vue';
import AdminComponent from '../components/Dashboard/Admin/AdminComponent.vue';
import CreateAdminComponent from '../components/Dashboard/Admin/CreateAdminComponent.vue';
import BaseLayout from '../components/Layout/BaseLayout.vue';
import TaskComponent from '../components/Dashboard/Task/TaskComponent.vue';
import PasswordReset from '../components/Common/PasswordReset.vue';
import ForgotPassword from '../components/Common/ForgotPassword.vue';
import { useAuthStore } from '../store/authStore.js';
import PaymentPage from '../components/Dashboard/Payment/PaymentPage.vue';
import PaymentFailure from '../components/Dashboard/Payment/PaymentFailure.vue';
import PaymentSuccess from '../components/Dashboard/Payment/PaymentSuccess.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DashboardPage,
    },

    {
      path: '/PasswordReset',
      name: 'PasswordReset',
      component: PasswordReset

    },

    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },

    {
      path: '/register-login',
      component: AuthComponent,
      name: 'REGISTER',
    },
    {
      path: '/login',
      component: LoginComponent,
      name: 'Login',
    },
    {
      path: '/FirebaseSignIn',
      component: AuthComponent,
      name: 'FirebaseSignIn',
    },
    {
      path: '/Home',
      name: 'Home',
      component: BaseLayout,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminComponent,

    },
    {
      path: '/Task',
      name: 'Task',
      component: TaskComponent,
    },
    {
      path: '/admin/createAdmin',
      name: 'CreateAdmin',
      component: CreateAdminComponent,
    },
    {
      path: "/AddTask",
      name: "AddTask",
      component: TaskCreationComponent,
    },
    {
      path: '/Organise',
      name: 'Organise',
      component: OrganiseComponent,
    },
    {
      path: "/task/:id",
      name: "TaskDetails",
      component: DetailTaskComponent,
      props: true,

      // children: [
      //   {
      //     path: "payment",
      //     name: "payment",
      //     component: PaymentPage,
      //   }
      // ],
    },
    {
      path: "/task/:id/payment",
      name: "payment",
      component: PaymentPage,
    },
    {
      path: '/payment-success',
      name: 'PaymentSuccess',
      component: PaymentSuccess
    },
    {
      path: '/payment-failure',
      name: 'PaymentFailure',
      component: PaymentFailure
    }


  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const jwt = sessionStorage.getItem('jwt');

  // Initialize auth state
  authStore.initializeAuth();

  if (to.meta.requiresAuth) {
    if (!jwt) {
      console.log('No JWT found, redirecting to login');
      next('/');
      return;
    }

    if (!authStore.isAuthentication) {
      console.log('User not authenticated, redirecting to login');
      next('/');
      return;
    }
  }

  // If trying to access login page while authenticated, redirect to home
  if (to.path === '/' && authStore.isAuthentication) {
    next('/Home');
    return;
  }

  next();
});

export default router;