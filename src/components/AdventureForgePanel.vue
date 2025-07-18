<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import axios from 'axios';
import { useSystemStore } from '@/stores/systemStore';

// Definimos una interfaz para la estructura de la respuesta del evento
interface AventuraCreadaEvent {
  adventureId: string;
  challengeType: string;
  environment: string;
  numEncounters: number;
  goldRewardTier: string;
}

const systemStore = useSystemStore();

// Variables reactivas para manejar el estado
const lastAdventure = ref<AventuraCreadaEvent | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Función que se llama al hacer clic en el botón
const generateAdventure = async () => {
  isLoading.value = true;
  error.value = null;
  lastAdventure.value = null;

  try {
    // Llamamos a la API de MS1
    const response = await axios.post('http://localhost:8081/api/v1/adventures/generate-random');
    lastAdventure.value = response.data;
    
    // Poner nota en el tablón. Después de un pequeño retraso para dar tiempo a los microservicios a procesar...
    setTimeout(() => {
      systemStore.triggerRefresh(lastAdventure.value!.adventureId);
    }, 2000); // 2 segundos de espera

  } catch (err) {
    console.error("Error generating adventure:", err);
    error.value = "No se pudo generar la aventura. ¿MS1 está corriendo y configurado con CORS?";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <div class="flex justify-content-center">
      <Button 
        label="Generar Nueva Aventura" 
        icon="pi pi-sparkles" 
        @click="generateAdventure" 
        :loading="isLoading" 
      />
    </div>

    <div v-if="isLoading" class="flex justify-content-center mt-4">
      <ProgressSpinner />
    </div>

    <Card v-if="lastAdventure" class="mt-4">
      <template #title>Aventura Generada</template>
      <template #content>
        <ul>
          <li><strong>ID:</strong> {{ lastAdventure.adventureId }}</li>
          <li><strong>Desafío:</strong> {{ lastAdventure.challengeType }}</li>
          <li><strong>Entorno:</strong> {{ lastAdventure.environment }}</li>
          <li><strong>Encuentros:</strong> {{ lastAdventure.numEncounters }}</li>
          <li><strong>Recompensa:</strong> {{ lastAdventure.goldRewardTier }}</li>
        </ul>
      </template>
    </Card>

    <div v-if="error" class="mt-4 text-red-500">
      <p>{{ error }}</p>
    </div>
  </div>
</template>