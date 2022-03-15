import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/index.css';
// import store from './store/index';
import router from './router/index';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

// components
import FlipCard from './components/FlipCard.vue';
// import FormIntro from './components/FormIntro.vue';
import LHeader from './components/layouts/LHeader.vue';

app.component('flip-card', FlipCard);
// app.component('form-intro', FormIntro);
app.component('l-header', LHeader);

app.use(router)
app.use(VueSweetalert2);
// app.use(store);

app.mount('#app')
