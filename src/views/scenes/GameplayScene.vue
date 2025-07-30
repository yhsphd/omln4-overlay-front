<template>
  <div class="scene master-gameplay-scene">
    <NamePlateHeader :header-text="headerText" :lang="lang"></NamePlateHeader>

    <div class="clients horizontal-box">
      <div class="clientBox red" ref="redClientBox">
        <DimensionInfo name="osu!tourney client 0" :source="redClientBox"></DimensionInfo>
      </div>
      <div class="clientBox blue" ref="blueClientBox">
        <DimensionInfo name="osu!tourney client 1" :source="blueClientBox"></DimensionInfo>
      </div>
    </div>

    <div class="diff horizontal-box absolute-center-horizontal zen-maru-gothic-black">
      <div class="red" :class="{ hidden: winning !== 'red' }">
        {{ diff.toLocaleString("EN-US") }}
      </div>
      <div class="blue" :class="{ hidden: winning !== 'blue' }">
        {{ diff.toLocaleString("EN-US") }}
      </div>
    </div>

    <div class="bottomDimmer"></div>

    <div class="scoreContainer red">
      <div class="score">
        <count-up :startVal="liveScoresBak[0]" :endVal="liveScores?.[0]" :duration="0.1"></count-up>
      </div>
      <div class="bottomText zen-maru-gothic-black">SCORE</div>
    </div>
    <div class="scoreContainer blue">
      <div class="score">
        <count-up :startVal="liveScoresBak[1]" :endVal="liveScores?.[1]" :duration="0.1"></count-up>
      </div>
      <div class="bottomText zen-maru-gothic-black">SCORE</div>
    </div>

    <NowPlaying class="nowPlaying"></NowPlaying>
  </div>
</template>

<style scoped>
.clients {
  top: 180px;
}
.clientBox {
  width: 960px;
  height: 720px;
  box-sizing: border-box;
  padding: 100px 400px 0 100px;
  position: relative;
}
.clientBox.red {
  background-color: rgb(34, 11, 11);
}
.clientBox.blue {
  background-color: rgb(9, 5, 34);
}
.clientBox::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: transparent;
}
.clientBox.red::before {
  background-color: #c02230;
}
.clientBox.blue::before {
  background-color: #1c4ade;
}

.diff {
  font-size: 20px;
  top: 150px;
}
.diff > * {
  width: 150px;
  height: 30px;
  line-height: 25px;
  text-align: center;
}
.diff > .red {
  background-color: #c02230;
}
.diff > .blue {
  background-color: #1c4ade;
}
.hidden {
  opacity: 0;
}

.bottomDimmer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 180px;

  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.75) 100%
  );
}

.scoreContainer {
  position: absolute;
  bottom: 45px;
}
.scoreContainer.red {
  left: 70px;
  text-align: left;
}
.scoreContainer.blue {
  right: 70px;
  text-align: right;
}
.score {
  font-size: 72px;
  line-height: 72px;
}
.bottomText {
  font-size: 24px;
}

.nowPlaying {
  position: absolute;
  bottom: 20px;
  left: 550px;
}
</style>

<script setup>
import DimensionInfo from "@/components/DimensionInfo.vue";
import NamePlateHeader from "@/components/NamePlateHeader.vue";
import NowPlaying from "@/components/scenes/Gameplay/NowPlaying.vue";
import CountUp from "vue-countup-v3";

import { computed, ref } from "vue";
import { useOverlayDataStore } from "@/stores/socket";
import { intObjectToArray } from "@/assets/utils";

const redClientBox = ref(null);
const blueClientBox = ref(null);

const state = useOverlayDataStore();

const liveScoresBak = ref([0, 0]);
const liveScores = computed(() => {
  if (liveScores.value) {
    // We keep the scores of the last tick for smooth countup
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    liveScoresBak.value = liveScores.value;
  }
  return state.data?.lobby?.scores ? intObjectToArray(state.data?.lobby?.scores) : [0, 0];
});
// const liveScores = computed(() => [130000, 100000]);
const diff = computed(() => Math.abs(liveScores.value?.[0] - liveScores.value?.[1]));
const winning = computed(() => (diff.value > 0 ? "red" : diff.value < 0 ? "blue" : ""));

const lang = ref("en");
const headerText = {
  en: "o!mLN4 Match - Gameplay",
  cn: "o!mLN4 Match - Gameplay",
};
</script>
