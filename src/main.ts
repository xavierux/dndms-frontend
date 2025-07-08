// Archivo: src/main.ts

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 1. Importar PrimeVue y el PRESET del tema
import PrimeVue from 'primevue/config';
// ¡IMPORTACIÓN CORREGIDA! Ahora se importa desde el nuevo paquete @primevue/themes
import Aura from '@primevue/themes/aura';

// 2. Importar los iconos y PrimeFlex
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 3. Configurar PrimeVue para que use el preset del tema
app.use(PrimeVue, {
    theme: {
        preset: Aura
        // Aquí se podrían añadir opciones al tema en el futuro
    }
});

app.mount('#app')