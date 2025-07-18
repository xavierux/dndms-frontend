import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSystemStore = defineStore('system', () => {
  // Creamos un "contador" que actuará como señal de refresco.
  const refreshKey = ref(0)
  const currentAdventureId = ref<string | null>(null)


  // Creamos una acción para "poner una nota en el tablón".
  function triggerRefresh(adventureId: string) {
    // Simplemente incrementamos el contador. Cualquier componente que lo observe, reaccionará.
    refreshKey.value++
    currentAdventureId.value = adventureId
    console.log('Refresh triggered! New key:', refreshKey.value);
  }

  return { refreshKey, currentAdventureId, triggerRefresh }
})