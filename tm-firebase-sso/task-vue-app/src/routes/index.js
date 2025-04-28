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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
         path: '/',
         component: DashboardPage,
       },
    // {
    //   path: '/',
    //   component: HomePage,
    // },
    {
      path:'/register-login',
      component: AuthComponent,
      name:'REGISTER',
    },
    {
      path:'/login',
      component: LoginComponent,
      name:'Login',
    },
    {
      path:'/FirebaseSignIn',
      component: AuthComponent,
      name:'FirebaseSignIn',
    },
    {
      path: '/Home',
      name: 'Home',
      component: BaseLayout,
      
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminComponent,
      
    },
    {
      path:'/Task',
      name:'Task',
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
    }
    
  ],
});

export default router;