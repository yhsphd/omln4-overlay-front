<template>
  <div class="scene master-match-schedule-scene">
    <HeaderImage
      img="match_schedule"
      class="header absolute-center-horizontal"
      :lang="lang"
    ></HeaderImage>

    <countdownNowPlaying class="np"></countdownNowPlaying>
    <CountdownWheel class="clock" size="720px"></CountdownWheel>

    <div class="schedulesContainer">
      <MatchComponent
        v-for="match in upcoming4Matches"
        :key="match.code"
        :match="match"
      ></MatchComponent>
    </div>
  </div>
</template>

<style scoped>
.header {
  top: 20px;
}

.clock {
  position: absolute;
  left: 80px;
  top: 180px;
}
.np {
  position: absolute;
  bottom: 0;
  left: -60px;
}

.schedulesContainer {
  position: absolute;
  left: 820px;
  top: 180px;
}
</style>

<script setup>
import { upcomingMatches } from "@/assets/utils";
import HeaderImage from "@/components/HeaderImage.vue";
import CountdownWheel from "@/components/scenes/Countdown/CountdownWheel.vue";
import countdownNowPlaying from "@/components/scenes/Countdown/countdownNowPlaying.vue";
import MatchComponent from "@/components/scenes/MatchSchedules/MatchComponent.vue";
import { useOverlayDataStore } from "@/stores/socket";
import { computed, ref, onMounted, onUnmounted } from "vue";

const state = useOverlayDataStore();

const lang = computed(() => state.data?.lang);
const now = ref(new Date());
let timer;

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const upcoming4Matches = computed(() => upcomingMatches(state.data, now.value, 4));
</script>
