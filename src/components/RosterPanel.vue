<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import axios from 'axios';
import { useSystemStore } from '@/stores/systemStore';

// Definimos la interfaz para un Personaje
interface Personaje {
  id: string;
  nombre: string;
  hpActual: number;
  victorias: number;
  oro: number;
  vivo: boolean;
}

const systemStore = useSystemStore();
const characters = ref<Personaje[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);
const isResetting = ref(false); // para el estado de carga del botón de reset


// Función para llamar a la API de MS2
const fetchRoster = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get('http://localhost:8082/api/v1/roster/characters');
    characters.value = response.data;
  } catch (err) {
    console.error("Error fetching roster:", err);
    error.value = "No se pudo cargar el roster de personajes. ¿MS2 está corriendo?";
  } finally {
    isLoading.value = false;
  }
};

// Carga los datos cuando el componente se monta por primera vez
onMounted(fetchRoster);

// Observa el "tablón de anuncios" y refresca los datos cuando hay un cambio
watch(() => systemStore.refreshKey, () => {
  console.log('Roster panel detected a refresh signal. Fetching new data...');
  fetchRoster();
});

// --- NUEVA FUNCIÓN PARA EL BOTÓN DE RESET ---
const resetRoster = async () => {
  isResetting.value = true;
  error.value = null;
  try {
    // Llamamos a la API de MS2 para resetear el roster
    await axios.post('http://localhost:8082/api/v1/roster/reset');
    
    // Mostramos una alerta al usuario
    alert('¡El Roster ha sido reseteado! Todos los personajes y enemigos han sido restaurados.');

    // Disparamos el refresco para que los paneles de MS2 y MS4 se actualicen
    systemStore.triggerRefresh('roster-reset');

  } catch (err) {
    console.error("Error resetting roster:", err);
    error.value = "No se pudo resetear el roster. ¿MS2 está corriendo y con CORS configurado?";
  } finally {
    isResetting.value = false;
  }
};
</script>

<template>
  <div>
    <DataTable :value="characters" :loading="isLoading" size="small" scrollable scrollHeight="250px">
      <template #header>
        <div class="flex justify-content-end">
          <Button 
            label="Reset Roster" 
            icon="pi pi-refresh"
            severity="secondary" 
            @click="resetRoster" 
            :loading="isResetting"
            size="small"
          />
        </div>
      </template>

      <Column field="nombre" header="Nombre"></Column>
      <Column field="hpActual" header="HP"></Column>
      <Column field="victorias" header="Victorias"></Column>
      <Column field="oro" header="Oro"></Column>
      <Column header="Estado">
        <template #body="slotProps">
          <Tag 
            :value="slotProps.data.vivo ? 'Vivo' : 'Muerto'" 
            :severity="slotProps.data.vivo ? 'success' : 'danger'" 
          />
        </template>
      </Column>
    </DataTable>
    <div v-if="error" class="mt-2 text-red-500">
      <p>{{ error }}</p>
    </div>
  </div>
</template>