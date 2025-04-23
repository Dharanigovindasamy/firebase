import { createApp } from 'vue';
import App from './App.vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import router from '../src/routes/index.js';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { createPinia } from 'pinia';


const pinia = createPinia();
const app = createApp(App)
app.use(BootstrapVue3);
app.use(router);
app.use(pinia);
pinia.use(({ store }) => {
    if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        store.$devtools = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
    }
});
app.mount('#app')
