<template>
  <div class="scene master-quals-results-scene">
    <HeaderImage
      class="header absolute-center-horizontal"
      :lang="lang"
      img="qualifier_results"
    ></HeaderImage>

    <Transition name="switchPage" mode="out-in">
      <div class="contents horizontal-box absolute-center-horizontal" :key="playerIndex">
        <PlayerCard
          class="card"
          :nick="currentQualsData?.nick"
          :id="currentQualsData?.id"
          :seed="qualsData.length - playerIndex"
        ></PlayerCard>
        <div class="qMaps">
          <QualsMapResult
            v-for="(mapRecord, i) in intObjectToArray(currentQualsData?.maps)"
            :mappool="mappool[i]"
            :record="mapRecord"
            :index="i"
            :key="mapRecord"
          ></QualsMapResult>
        </div>
      </div>
    </Transition>

    <div class="interface horizontal-box">
      <div @click="() => playerIndex--"></div>
      <div @click="() => playerIndex++"></div>
    </div>
  </div>
</template>

<style scoped>
.header {
  top: 20px;
}

.contents {
  position: absolute;
  width: 1800px;
  top: 180px;
}

.qMaps {
  position: relative;
  flex-grow: 1;
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
import HeaderImage from "@/components/HeaderImage.vue";
import PlayerCard from "@/components/scenes/QualsResults/PlayerCard.vue";
import QualsMapResult from "@/components/scenes/QualsResults/QualsMapResult.vue";

import { computed, ref } from "vue";
import { intObjectToArray } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";

const state = useOverlayDataStore();

const lang = computed(() => state.data?.lang);

const playerIndex = ref(0);
const qualsData = computed(() => intObjectToArray(state.data?.extended?.quals));
const currentQualsData = computed(() => qualsData.value[playerIndex.value]);
const mappool = computed(() => state.data?.mappool);
</script>
