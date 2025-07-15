import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Por ahora, no necesitamos rutas específicas ya que todo estará en App.vue.
    // Más adelante, si quisiéramos una página de "detalles" para un personaje,
    // podríamos añadir una ruta aquí.
  ]
})

export default router