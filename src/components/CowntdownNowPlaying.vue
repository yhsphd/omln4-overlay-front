<template>
  <div class="master-countdown-now-playing">
    <div class="header">NOW PLAYING</div>
    <div class="horizontal-box progressBarWrapper">
      <div class="progressBar">
        <div class="progressBarPosition" :style="{ width: positionFrac + '%' }"></div>
      </div>
      <div class="musicTime zen-maru-gothic-bold">
        {{ secondsToMMSS(position) }} / {{ secondsToMMSS(duration) }}
      </div>
    </div>
    <div class="title zen-maru-gothic-black">{{ title }}</div>
    <div class="artist zen-maru-gothic-black">{{ artist }}</div>
  </div>
</template>

<style scoped>
.master-countdown-now-playing {
  width: 1000px;
  height: 225px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(0, 0, 0, 0) 100%);
}
.header {
  font-size: 24px;
}

.progressBarWrapper {
  align-items: center;
}

.progressBar {
  position: relative;
  width: 500px;
  height: 8px;
  border: 1px solid white;
}

.progressBarPosition {
  height: 100%;
  background-color: white;
}

.musicTime {
  margin-left: 16px;
  font-size: 20px;
}

.title {
  font-size: 24px;
}

.artist {
  font-size: 14px;
}
</style>

<script setup>
import { secondsToMMSS } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";
import { computed } from "vue";

const state = useOverlayDataStore();

const np = computed(() => {
  if (!state.data.now_playing) {
    return {
      cover: "",
      title: "",
      artist: "",
      time: 0,
      length: 1,
    };
  }
  return state.data.now_playing[state.data.now_playing.mode];
});

const title = computed(() => np.value.title);
const artist = computed(() => np.value.artist);
const duration = computed(() => np.value.length / 1000);
const position = computed(() => np.value?.time / 1000);
const positionFrac = computed(() => (position.value / duration.value) * 100);
</script>
