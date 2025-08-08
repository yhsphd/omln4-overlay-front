<template>
  <div class="scene master-gameplay-scene">
    <NamePlateHeader :header-text="headerText" :lang="lang"></NamePlateHeader>

    <div class="clients horizontal-box">
      <div class="clientBox red" ref="redClientBox">
        <div class="clientBoxBorder" :style="{ width: diffPercentages[0] }">
          <div class="diff zen-maru-gothic-black" :class="{ hidden: winning !== 'red' }">
            {{ absDiff.toLocaleString("EN-US") }}
          </div>
        </div>
        <DimensionInfo name="osu!tourney client 0" :source="redClientBox"></DimensionInfo>
      </div>
      <div class="clientBox blue" ref="blueClientBox">
        <div class="clientBoxBorder" :style="{ width: diffPercentages[1] }">
          <div class="diff zen-maru-gothic-black" :class="{ hidden: winning !== 'blue' }">
            {{ absDiff.toLocaleString("EN-US") }}
          </div>
        </div>
        <DimensionInfo name="osu!tourney client 1" :source="blueClientBox"></DimensionInfo>
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

.clientBoxBorder {
  position: absolute;
  top: -10px;
  height: 10px;
  background-color: transparent;
}
.clientBox.red .clientBoxBorder {
  background-color: var(--color-R);
  left: 0;
}
.clientBox.blue .clientBoxBorder {
  background-color: var(--color-B);
  right: 0;
}

.diff {
  position: absolute;
  font-size: 20px;
  bottom: 0;
  width: 150px;
  height: 30px;
  line-height: 25px;
  text-align: center;
}
.clientBox.red .diff {
  background-color: var(--color-R);
  right: 0;
}
.clientBox.blue .diff {
  background-color: var(--color-B);
  left: 0;
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
import { intObjectToArray, clamp } from "@/assets/utils";

const redClientBox = ref(null);
const blueClientBox = ref(null);

const state = useOverlayDataStore();

const lang = computed(() => state.data?.lang);

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
const diff = computed(() => liveScores.value?.[0] - liveScores.value?.[1]);
const absDiff = computed(() => Math.abs(diff.value));

///////// SCORE BAR LENGTH COMPUTATION FORMULA /////////
const normalizedDiff = computed(() => {
  const maxDiff = 100000; // 100k
  const clamped = clamp(diff.value, -maxDiff, maxDiff);
  return clamped / maxDiff; // Returns value between -1 and +1
});
const diffPercentages = computed(() => {
  const normalized = normalizedDiff.value;
  // Map -1~+1 to [50%, 150%] ~ [150%, 50%]
  const redPercentage = 100 + normalized * 50;
  const bluePercentage = 100 - normalized * 50;
  return [`${redPercentage}%`, `${bluePercentage}%`];
});
////////////////////////////////////////////////////////

const winning = computed(() => (diff.value > 0 ? "red" : diff.value < 0 ? "blue" : ""));

const headerText = ref({
  en: "o!mLN4 Match - Gameplay",
  cn: "o!mLN4 Match - Gameplay",
});
</script>
