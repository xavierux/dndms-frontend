<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';
import { useSystemStore } from '@/stores/systemStore';

const systemStore = useSystemStore();
const combatLog = ref<string[]>(['Esperando una nueva aventura...']);
const isLoading = ref(false);

const fetchCombatLog = async (adventureId: string) => {
  if (!adventureId) return;
  isLoading.value = true;
  combatLog.value = ['Cargando log de combate...'];
  try {
    const response = await axios.get(`http://localhost:8083/api/v1/combat-logs/${adventureId}`);
    combatLog.value = response.data;
  } catch (error) {
    console.error("Error fetching combat log:", error);
    combatLog.value = ["No se pudo cargar el log de combate."];
  } finally {
    isLoading.value = false;
  }
};

// Observa el ID de la aventura y llama a la API cuando cambie
watch(() => systemStore.currentAdventureId, (newId) => {
  if (newId) {
    fetchCombatLog(newId);
  }
});
</script>

<template>
  <div class="log-container">
    <pre v-for="(line, index) in combatLog" :key="index">{{ line }}</pre>
  </div>
</template>

<style scoped>
.log-container {
  background-color: #282c34;
  color: #abb2bf;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Courier New', Courier, monospace;
  max-height: 250px;
  overflow-y: auto;
  white-space: pre-wrap; /* Para que el texto se ajuste */
}
</style>