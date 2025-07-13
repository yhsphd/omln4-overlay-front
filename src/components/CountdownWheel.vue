<template>
  <div
    class="master-countdown-wheel"
    :style="{
      width: size,
      height: size,
    }"
  >
    <img class="spinning-image" :src="wheelImage" />
  </div>
</template>

<style scoped>
.master-countdown-wheel {
  position: absolute;
  transform: translate(-50%, -50%);
}

.spinning-image {
  width: 100%;
  height: 100%;
  animation: spin 60s linear infinite;
  display: block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script setup>
import wheelImage from "@/assets/img/wheel.png";

defineProps({
  size: {
    type: String,
    default: "100px",
  },
});
</script>
