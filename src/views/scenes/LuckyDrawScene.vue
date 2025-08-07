<template>
  <div class="scene master-lucky-draw-scene">
    <HeaderImage
      class="absolute-center-horizontal header"
      img="lucky_draw"
      :lang="lang"
    ></HeaderImage>

    <div class="content absolute-center-horizontal horizontal-box">
      <div class="captureArea" ref="captureAreaRef">
        <DimensionInfo name="Display Capture" :source="captureAreaRef"></DimensionInfo>
      </div>
      <div class="winnersBox">
        <div class="boxHeader">WINNERS</div>

        <Transition name="switchPage" mode="out-in">
          <div :key="page" v-if="currentWinnersData?.[page]">
            <div
              class="winner horizontal-box"
              v-for="(winner, i) in intObjectToArray(currentWinnersData[page].winners)"
              :key="winner"
            >
              <div
                class="pfp"
                :style="{ backgroundImage: cssUrl(`https://a.ppy.sh/${winner.id}`) }"
              ></div>
              <div>
                <div class="nick">{{ winner.nick }}</div>
                <div class="winnerNum zen-maru-gothic-bold">Lucky Winner #{{ i + 1 }}</div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div class="interface horizontal-box">
      <div @click="() => page--"></div>
      <div @click="() => page++"></div>
    </div>
  </div>
</template>

<style scoped>
.header {
  top: 24px;
}

.content {
  width: 1826px;
  height: 768px;
  background-color: black;
  bottom: 90px;
}
.captureArea {
  width: 1366px;
  height: 768px;
  box-sizing: border-box;
  padding: 50px 500px 0 50px;
  background-color: var(--color-BG);
}
.winnersBox {
  width: 460px;
}
.winnersBox > div {
  width: 100%;
}
.boxHeader {
  text-align: center;
  background-color: var(--color-R);
  height: 108px;
  font-size: 64px;
  line-height: 108px;
}
.winner {
  height: 220px;
  align-items: center;
}
.pfp {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 9999999px;
  margin: 24px;
}
.nick {
  font-size: 32px;
}
.winnerNum {
  font-size: 18px;
}

.interface {
  position: absolute;
  width: 100%;
  height: 100%;
}
.interface > div {
  width: 50%;
  height: 100%;
}
</style>

<script setup>
import DimensionInfo from "@/components/DimensionInfo.vue";
import HeaderImage from "@/components/HeaderImage.vue";

import { cssUrl, intObjectToArray } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";
import { computed, ref } from "vue";

const state = useOverlayDataStore();

const lang = computed(() => state.data?.lang);

const captureAreaRef = ref(null);
const page = ref(0);

const currentMappoolName = computed(() => state.data?.mappool_name);
const oiiWinners = computed(() => state.data?.extended?.oiiWinners);
const currentWinnersData = computed(() =>
  currentMappoolName.value ? intObjectToArray(oiiWinners.value?.[currentMappoolName.value]) : []
);
</script>
