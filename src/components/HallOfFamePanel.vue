<script setup lang="ts">
import { ref, onMounted, watch  } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios';
import { useSystemStore } from '@/stores/systemStore';

// Definimos la estructura de un ranking
interface Ranking {
  id: string;
  score: number;
}

const systemStore = useSystemStore();

// Creamos variables reactivas para almacenar los datos
const victoriesRanking = ref<Ranking[]>([]);
const goldRanking = ref<Ranking[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Función para llamar a las APIs de MS4
const fetchRankings = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    // Hacemos las dos llamadas a la API en paralelo
    const [victoriesResponse, goldResponse] = await Promise.all([
      axios.get('http://localhost:8084/api/v1/rankings/victories?limit=5'),
      axios.get('http://localhost:8084/api/v1/rankings/gold?limit=5')
    ]);

    // Transformamos la respuesta (Map) a un array de objetos para la tabla
    victoriesRanking.value = Object.entries(victoriesResponse.data).map(([id, score]) => ({ id, score: score as number }));
    goldRanking.value = Object.entries(goldResponse.data).map(([id, score]) => ({ id, score: score as number }));

  } catch (err) {
    console.error("Error fetching rankings:", err);
    error.value = "No se pudieron cargar los rankings. ¿Están los microservicios corriendo?";
  } finally {
    isLoading.value = false;
  }
};

// onMounted es un "hook" de Vue que se ejecuta cuando el componente está listo
onMounted(() => {
  fetchRankings();
});

watch(() => systemStore.refreshKey, () => {
  console.log('Hall of Fame detected a refresh signal. Fetching new data...');
  fetchRankings();
});
</script>

<template>
  <div class="ranking-container grid">
    <div class="col-12 md:col-6">
      <h5>🏆 Top Victorias</h5>
      <DataTable :value="victoriesRanking" :loading="isLoading" tableStyle="min-width: 10rem">
        <Column field="id" header="Entidad"></Column>
        <Column field="score" header="Victorias"></Column>
      </DataTable>
    </div>

    <div class="col-12 md:col-6">
      <h5>💰 Top Riqueza</h5>
      <DataTable :value="goldRanking" :loading="isLoading" tableStyle="min-width: 10rem">
        <Column field="id" header="Personaje"></Column>
        <Column field="score" header="Oro"></Column>
      </DataTable>
    </div>

    <div v-if="error" class="col-12 mt-4 text-red-500">
      <p>{{ error }}</p>
    </div>
  </div>
</template>