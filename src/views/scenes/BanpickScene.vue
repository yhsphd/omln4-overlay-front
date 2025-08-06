<template>
  <div class="scene master-banpick-scene">
    <!-- <TestOverlayScene></TestOverlayScene> -->
    <NamePlateHeader class="header"></NamePlateHeader>

    <div class="mapsContainer">
      <MapComponent
        class="map"
        v-for="(map, i) in mappool"
        :map="map"
        :key="i"
        :ban="codeToStatus[map.code].ban"
        :pick="codeToStatus[map.code].pick"
        :banpick-team="codeToStatus[map.code].banpickTeam"
        :protect="codeToStatus[map.code].protect"
        :protect-team="codeToStatus[map.code].protectTeam"
        :win="codeToStatus[map.code].win"
        :win-team="codeToStatus[map.code].winTeam"
      ></MapComponent>
    </div>

    <ChatBox class="chatBox"></ChatBox>

    <NextOrder class="nextOrder" :class="{ show: showNextOrder }" :lang="lang"></NextOrder>
  </div>
</template>

<style scoped>
.header {
  position: absolute;
}

.mapsContainer {
  width: 100%;
  height: 800px;
  display: flex;
  align-content: flex-start;
  gap: -100px 0;
  flex-wrap: wrap;
  position: absolute;
  top: 200px;
  box-sizing: border-box;
  padding-left: 50px;
}

.map {
  margin: 16px 20px 16px 20px;
}

.chatBox {
  position: absolute;
  width: 1020px;
  height: 255px;
  left: 851px;
  top: 785px;
  background: rgba(0, 0, 0, 0.85);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.nextOrder {
  z-index: 20;
  transition: opacity 0.5s ease;
  opacity: 0;
}
.nextOrder.show {
  opacity: 1;
}
</style>

<script setup>
// import TestOverlayScene from "./TestOverlayScene.vue";
import NamePlateHeader from "@/components/NamePlateHeader.vue";
import MapComponent from "@/components/MapComponent/MapComponent.vue";

import { computed, ref, watch } from "vue";
import { intObjectToArray } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";
import NextOrder from "@/components/scenes/Banpick/NextOrder.vue";
import ChatBox from "@/components/scenes/Banpick/ChatBox.vue";

const state = useOverlayDataStore();

const mappool = computed(() => intObjectToArray(state.data?.mappool));
const progress = computed(() => state.data?.progress);
const codeToStatus = computed(() => {
  const poolStatus = {};

  for (let i = 0; i < mappool.value.length; i++) {
    const map = mappool.value[i];

    poolStatus[map.code] = {
      ban: undefined,
      pick: undefined,
      banpickTeam: undefined,
      protect: undefined,
      protectTeam: undefined,
      win: undefined,
      winTeam: undefined,
    };
  }

  // Pre-match stage
  const preMatch = progress.value.pre_match;
  if (preMatch.red_protect)
    Object.assign(poolStatus[preMatch.red_protect], { protectTeam: true, protect: true });
  if (preMatch.red_ban)
    Object.assign(poolStatus[preMatch.red_ban], { banpickTeam: true, ban: true });
  if (preMatch.blue_protect)
    Object.assign(poolStatus[preMatch.blue_protect], { protectTeam: false, protect: true });
  if (preMatch.blue_ban)
    Object.assign(poolStatus[preMatch.blue_ban], { banpickTeam: false, ban: true });

  // Match stage
  const teamNames = intObjectToArray(state.data?.teams).map((x) => x.name);
  const picks = intObjectToArray(progress.value.pick);
  const winners = intObjectToArray(progress.value.winner);
  const firstPick = !teamNames.indexOf(preMatch.first_pick); // true: red, false: blue

  let turn = firstPick;
  for (let i = 0; i < picks.length; i++) {
    if (picks[i]) Object.assign(poolStatus[picks[i]], { banpickTeam: turn, pick: true });
    turn = !turn;
  }

  for (let i = 0; i < winners.length; i++) {
    if (picks[i])
      Object.assign(poolStatus[picks[i]], { win: true, winTeam: !teamNames.indexOf(winners[i]) });
  }

  return poolStatus;
});

const pickCount = computed(() =>
  progress.value?.pick ? Object.keys(progress.value?.pick).length : 0
);

const showNextOrder = ref(false);
watch(pickCount, (newCount, oldCount) => {
  if (newCount > oldCount) {
    showNextOrder.value = true;
    setTimeout(() => {
      showNextOrder.value = false;
    }, NEXTORDER_TIME);
  }
});

const lang = ref("en");
const NEXTORDER_TIME = 3000;
</script>
