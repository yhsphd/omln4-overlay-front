<template>
  <div class="scene master-brackets-scene">
    <HeaderImage
      img="tournament_bracket"
      class="header absolute-center-horizontal"
      :lang="lang"
    ></HeaderImage>

    <div class="leftBox">
      <div class="upcoming">
        <div class="boxHeader">Upcoming Matches</div>
        <MatchComponent
          v-for="match in upcoming4Matches"
          :match="match"
          :finished="false"
          :key="match"
        ></MatchComponent>
      </div>
      <div class="history">
        <div class="boxHeader">Match History</div>
        <MatchComponent
          v-for="match in recent4Matches"
          :match="match"
          :finished="true"
          :key="match"
        ></MatchComponent>
      </div>
    </div>

    <div class="bracketsBox"></div>
  </div>
</template>

<style scoped>
.header {
  top: 24px;
}

.leftBox {
  width: 450px;
  height: 840px;
  text-align: center;
  background-color: var(--color-BG);
  position: absolute;
  left: 60px;
  top: 180px;
}
.leftBox > div {
  width: 100%;
  height: 50%;
}
.boxHeader {
  font-size: 48px;
  height: 80px;
  line-height: 72px;
}
.upcoming > .boxHeader {
  background-color: var(--color-R);
}
.history > .boxHeader {
  color: black;
  background-color: var(--color-Y);
}

.bracketsBox {
  box-sizing: border-box;
  position: absolute;
  width: 1322px;
  height: 840px;
  left: 540px;
  top: 180px;
  background: rgba(24, 24, 24, 0.75);
  border: 10px solid black;
}
</style>

<script setup>
import HeaderImage from "@/components/HeaderImage.vue";
import MatchComponent from "@/components/scenes/Brackets/MatchComponent.vue";

import { recentMatches, upcomingMatches } from "@/assets/utils";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useOverlayDataStore } from "@/stores/socket";

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
const recent4Matches = computed(() => recentMatches(state.data, now.value, 4));
</script>
