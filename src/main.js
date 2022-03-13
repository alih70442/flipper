import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/index.css';
import store from './store/index';

const app = createApp(App);

// components
import FlipCard from './components/FlipCard.vue';

app.component('flip-card', FlipCard);

app.use(store);
app.mount('#app')
