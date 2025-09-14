<template>
  <div class="scene master-test-overlay-scene">
    {{ state }}
  </div>
</template>

<style scoped>
.master-test-overlay-scene {
  position: absolute;
}

.testOverlay {
  position: absolute;
  width: 1920px;
  height: 1080px;
  opacity: 0.8;
}
</style>

<script setup>
import { useOverlayDataStore } from "@/stores/socket";

const state = useOverlayDataStore();
</script>
