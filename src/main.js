import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/index.css';
import store from './store/index';

const app = createApp(App);

// components
import FlipCard from './components/FlipCard.vue';
import FormIntro from './components/FormIntro.vue';
import LHeader from './components/layouts/LHeader.vue';

app.component('flip-card', FlipCard);
app.component('form-intro', FormIntro);
app.component('l-header', LHeader);

app.use(store);
app.mount('#app')
