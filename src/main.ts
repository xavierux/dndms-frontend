// Archivo: src/main.ts

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 1. Importar PrimeVue y el PRESET del tema
import PrimeVue from 'primevue/config';
// ¡IMPORTACIÓN CORREGIDA! Ahora se importa desde el nuevo paquete @primevue/themes
import Aura from '@primevue/themes/aura';

import Button from 'primevue/button';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';

// 2. Importar los iconos y PrimeFlex
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('Button', Button);
app.component('Panel', Panel);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Tag', Tag);
app.component('Card', Card);
app.component('ProgressSpinner', ProgressSpinner);

// 3. Configurar PrimeVue para que use el preset del tema
app.use(PrimeVue, {
    theme: {
        preset: Aura
        // Aquí se podrían añadir opciones al tema en el futuro
    }
});

app.mount('#app')