<template>
  <div class="master-countdown-wheel" :style="containerStyle">
    <img class="base" :src="wheelImage" />
    <img
      class="hand minute"
      :src="mHandImage"
      :style="{
        transform: `rotate(${minuteDeg}deg)`,
      }"
    />
    <img
      class="hand hour"
      :src="hHandImage"
      :style="{
        transform: `rotate(${hourDeg}deg)`,
      }"
    />
    <img
      class="hand second"
      :src="sHandImage"
      :style="{
        transform: `rotate(${secondDeg}deg)`,
      }"
    />
  </div>
</template>

<style scoped>
.master-countdown-wheel img {
  position: absolute;
  transform-origin: 50% 50%;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>

<script setup>
import wheelImage from "@/assets/img/wheel.png";
import hHandImage from "@/assets/img/wheel_h.png";
import mHandImage from "@/assets/img/wheel_m.png";
import sHandImage from "@/assets/img/wheel_s.png";

import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "100px",
  },
});

const containerStyle = computed(() => ({
  width: props.size,
  height: props.size,
}));

const now = ref(new Date());

const updateClock = () => {
  now.value = new Date();
};

let timer;

onMounted(() => {
  timer = setInterval(updateClock, 10);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

const hourDeg = computed(() => {
  const h = now.value.getUTCHours();
  const m = now.value.getUTCMinutes();
  return (h + m / 60) * 15 + 180;
});

const minuteDeg = computed(() => {
  const m = now.value.getUTCMinutes();
  const s = now.value.getUTCSeconds();
  return (m + s / 60) * 6 + 180;
});

const secondDeg = computed(() => {
  const s = now.value.getUTCSeconds();
  return s * 6 + 180;
});
</script>
