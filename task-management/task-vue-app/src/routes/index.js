import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/Dashboard/HomePage.vue';
import TaskComponent from '../components/Dashboard/TaskComponent.vue';
import OrganiseComponent from '../components/Organiser/OrganiseComponent.vue';
import TaskCreationComponent from '../components/Dashboard/TaskCreationComponent.vue';
import DetailTaskComponent from '../components/Dashboard/DetailTaskComponent.vue';
import AuthComponent from '../components/Common/AuthComponent.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [

    {
      path: '/',
      component: HomePage,
    },
    {
      path:'/register-login',
      component: AuthComponent,
      name:'REGISTER',
    },
    {
      path: '/Home',
      name: 'Home',
      component: TaskComponent,
      
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