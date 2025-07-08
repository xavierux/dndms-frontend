<script setup lang="ts">
// Usaremos este componente de PrimeVue para el layout
import Panel from 'primevue/panel';
</script>

<template>
  <div class="grid m-2">
    <div class="col-12 md:col-6">
      <Panel header="MS1: Adventure Forge (Panel de Control)" :toggleable="true">
        <p>
          Aquí irá el botón para generar aventuras y se mostrarán los detalles
          de la última misión creada.
        </p>
      </Panel>
    </div>
    <div class="col-12 md:col-6">
      <Panel header="MS2: Character Roster (Elenco)" :toggleable="true">
        <p>
          Aquí irá la tabla con el estado actual de los Personajes Jugadores (PJs).
        </p>
      </Panel>
    </div>

    <div class="col-12 md:col-6">
      <Panel header="MS3: Combat Arena (Log de Combate)" :toggleable="true">
        <p>
          Aquí irá un "feed" o log de texto con los eventos del último combate.
        </p>
      </Panel>
    </div>
    <div class="col-12 md:col-6">
      <Panel header="MS4: Hall of Fame (Rankings)" :toggleable="true">
        <p>
          Aquí irán las tablas de clasificación por victorias y oro.
        </p>
      </Panel>
    </div>
  </div>
</template>

<style scoped>
/* Podemos añadir estilos globales o específicos aquí más adelante */
.p-panel {
  height: 100%;
}
</style>