<template>
  <div class="master-countdown-time-left">
    <div class="horizontal-box timeLeft">
      <div
        class="digit"
        v-for="(digit, i) in timeLeftString"
        :style="{ width: digit === ':' ? '15%' : '20%' }"
        :key="i"
      >
        {{ digit }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.digit {
  text-align: center;
}
</style>

<script setup>
import { secondsLeft, secondsToMMSS } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";
import { onMounted, ref } from "vue";

const state = useOverlayDataStore();

const timeLeftString = ref("");

onMounted(() => {
  setInterval(() => {
    const diff = secondsLeft(state.data?.schedule) + 1;
    timeLeftString.value = diff >= 0 ? secondsToMMSS(diff) : "00:00";
  }, 10);
});
</script>
