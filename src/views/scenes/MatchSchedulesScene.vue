<template>
  <div class="scene master-match-schedule-scene">
    <HeaderImage img="match_schedule" class="header absolute-center-horizontal"></HeaderImage>

    <CowntdownNowPlaying class="np"></CowntdownNowPlaying>
    <CountdownWheel class="clock" size="720px"></CountdownWheel>

    <div class="schedulesContainer">
      <MatchComponent
        v-for="match in incoming4Matches"
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
import { intObjectToArray } from "@/assets/utils";
import HeaderImage from "@/components/HeaderImage.vue";
import CountdownWheel from "@/components/scenes/Countdown/CountdownWheel.vue";
import CowntdownNowPlaying from "@/components/scenes/Countdown/CowntdownNowPlaying.vue";
import MatchComponent from "@/components/scenes/MatchSchedules/MatchComponent.vue";
import { useOverlayDataStore } from "@/stores/socket";
import { computed, ref, onMounted, onUnmounted } from "vue";

const state = useOverlayDataStore();
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

const matches = computed(() => intObjectToArray(state.data?.extended?.matches));
const currentBracketMatches = computed(() => {
  const currentBracket = state.data?.bracket;
  return matches.value.filter((x) => x.bracket === currentBracket);
});

const bo = computed(() => {
  const currentBracket = state.data?.bracket;
  return intObjectToArray(state.data?.brackets)?.find((b) => b.name === currentBracket)?.bo || "7";
});

const upcomingMatches = (n) => {
  return currentBracketMatches.value
    .filter((match) => {
      const matchDate = new Date(match.schedule);
      const result = intObjectToArray(match.result) || [0, 0];
      const targetScore = Math.ceil(parseInt(bo.value) / 2);

      // Include if -1 in result and future date
      if (result.includes(-1)) {
        return matchDate > now.value;
      }

      // Include if not reached target score yet
      const maxScore = Math.max(...result);
      return maxScore < targetScore;
    })
    .sort((a, b) => new Date(a.schedule) - new Date(b.schedule))
    .slice(0, n);
};
const incoming4Matches = computed(() => upcomingMatches(4));
</script>
