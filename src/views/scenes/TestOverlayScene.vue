<template>
  <div class="scene master-test-overlay-scene">
    <img class="testOverlay" :src="testImage" />
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
  opacity: 0.2;
}
</style>

<script setup>
import testImage from "@/assets/img/image.png";
</script>
