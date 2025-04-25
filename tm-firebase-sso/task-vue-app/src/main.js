import { createApp } from 'vue';
import App from './App.vue';
import BootstrapVue3 from "bootstrap-vue-3";

// Bootstrap core and icons
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.css";

// BootstrapVue3 CSS
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

// AG Grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Router and Store
import router from '../src/routes/index.js';
import { createPinia } from 'pinia';

// Create app instance
const pinia = createPinia();
const app = createApp(App);

// Use plugins
app.use(BootstrapVue3);
app.use(router);
app.use(pinia);

// Configure Pinia devtools
pinia.use(({ store }) => {
    if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        store.$devtools = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
    }
});

// Mount the app
app.mount('#app');
