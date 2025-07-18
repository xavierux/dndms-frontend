<script setup lang="ts">
import Panel from 'primevue/panel';
import AdventureForgePanel from './components/AdventureForgePanel.vue';
import RosterPanel from './components/RosterPanel.vue';
import CombatLogPanel from './components/CombatLogPanel.vue';
import HallOfFamePanel from './components/HallOfFamePanel.vue';
</script>

<template>
  <div class="grid m-2">
    <div class="col-12 md:col-6">
      <Panel header="MS1: Adventure Forge (Panel de Control)" :toggleable="true">
        <AdventureForgePanel />
      </Panel>
    </div>
    <div class="col-12 md:col-6">
      <Panel header="MS2: Character Roster (Elenco)" :toggleable="true">
        <RosterPanel />
      </Panel>
    </div>

    <div class="col-12 md:col-6">
      <Panel header="MS3: Combat Arena (Log de Combate)" :toggleable="true">
        <CombatLogPanel />
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