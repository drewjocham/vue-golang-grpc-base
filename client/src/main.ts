import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import mitt from "mitt";

const app = createApp(App)

const eventBus = mitt();
app.provide('eventBus', eventBus);

app.use(router).mount('#app')
