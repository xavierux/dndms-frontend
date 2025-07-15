<script setup lang="ts">
import Panel from 'primevue/panel';
import HallOfFamePanel from './components/HallOfFamePanel.vue';
</script>

<template>
  <div class="grid m-2">
    <div class="col-12 md:col-6">
      <Panel header="MS1: Adventure Forge (Panel de Control)" :toggleable="true">
        </Panel>
    </div>
    <div class="col-12 md:col-6">
      <Panel header="MS2: Character Roster (Elenco)" :toggleable="true">
        </Panel>
    </div>

    <div class="col-12 md:col-6">
      <Panel header="MS3: Combat Arena (Log de Combate)" :toggleable="true">
        </Panel>
    </div>
    <div class="col-12 md:col-6">
      <Panel header="MS4: Hall of Fame (Rankings)" :toggleable="true">
        <HallOfFamePanel />
      </Panel>
    </div>
  </div>
</template>

<style scoped>
.p-panel {
  height: 100%;
}
</style>