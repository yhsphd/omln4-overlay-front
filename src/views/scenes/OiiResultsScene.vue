<template>
  <div class="scene master-oii-results-scene">
    <HeaderImage class="header" img="challenge_results" :lang="lang"></HeaderImage>
    <img v-if="lang === 'en'" class="originalHeader" src="@/assets/img/showcase/original_en.png" />
    <img v-if="lang === 'cn'" class="originalHeader" src="@/assets/img/showcase/original_cn.png" />

    <Transition name="switchPage" mode="out-in">
      <div class="mainBox absolute-center-horizontal horizontal-box" :key="page">
        <div class="mapInfo">
          <div
            class="bg"
            :style="{
              backgroundImage: cssUrl(
                `https://assets.ppy.sh/beatmaps/${currentMapInfo?.beatmapset_id}/covers/raw.jpg`
              ),
            }"
          ></div>
          <div class="title">
            <span> {{ currentMapInfo?.beatmapset.title }}</span>
          </div>
          <div class="artist zen-maru-gothic-black">
            <span>{{ currentMapInfo?.beatmapset.artist }}</span>
          </div>
        </div>
        <div class="leaderboard">
          <div
            class="rankBox horizontal-box"
            v-for="(entry, i) in intObjectToArray(results?.[page]?.leaderboard).slice(0, 10)"
            :key="entry"
          >
            <div class="pfp" :style="{ backgroundImage: cssUrl(`https://a.ppy.sh/${entry.id}`) }">
              <div class="pfpGradient"></div>
            </div>
            <div class="rank">{{ convertOrdinalNumber(i + 1) }}</div>
            <div class="nick">{{ entry.nick }}</div>
            <div class="score zen-maru-gothic-black">
              Score: {{ entry.score.toLocaleString("en-US") }}
            </div>
            <div class="acc zen-maru-gothic-black">
              Accuracy: {{ (entry.acc * 100).toFixed(2) }}%
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div class="interface horizontal-box">
      <div @click="() => page--"></div>
      <div @click="() => page++"></div>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: absolute;
  right: 350px;
  top: 24px;
}
.originalHeader {
  position: absolute;
  top: 90px;
  left: 680px;
  height: 120px;
  transform: translate(-50%, -50%);
}

.mainBox {
  position: absolute;
  width: 1800px;
  height: 830px;
  top: 190px;
  border: 10px solid #810c06;
  background-color: var(--color-BG);
}

.mapInfo {
  width: 650px;
  height: 100%;
}
.mapInfo > div {
  width: 100%;
  text-align: center;
  font-size: 36px;
}
.bg {
  width: 100%;
  height: 650px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.title,
.artist {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  height: 120px;
  background-color: var(--color-R);
}
.artist {
  height: 60px;
  background-color: #333333;
}

.rankBox {
  position: relative;
  width: 1150px;
  height: 83px;
  border: solid 1px black;
  box-sizing: border-box;
}
.pfp {
  position: relative;
  width: 200px;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.pfpGradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(25, 25, 25, 0) 0%, var(--color-BG) 100%);
}
.rank {
  margin-left: 20px;
  font-size: 64px;
  line-height: 83px;
}
.rankBox:nth-child(1) .rank {
  color: #efbf04;
}
.rankBox:nth-child(2) .rank {
  color: #c0c0c0;
}
.rankBox:nth-child(3) .rank {
  color: #d49537;
}
.nick {
  position: absolute;
  font-size: 36px;
  top: 0;
  right: 16px;
}
.score,
.acc {
  position: absolute;
  font-size: 20px;
  bottom: 4px;
}
.score {
  right: 220px;
}
.acc {
  right: 16px;
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

import { convertOrdinalNumber, cssUrl, intObjectToArray, rootUrl } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";
import { computed, ref, watchEffect } from "vue";

const state = useOverlayDataStore();

const page = ref(0);

const oiiResults = computed(() => state.data?.extended?.oiiResults);
const roundCode = computed(() => state.data?.mappool_name);
const results = computed(() => intObjectToArray(oiiResults.value?.[roundCode.value]));
const currentMapId = computed(() => results.value[page.value]?.map.id);
const currentMapInfo = ref(null);

watchEffect(async () => {
  if (!currentMapId.value) return;
  const response = await fetch(`${rootUrl}/api/osu/beatmap?id=${currentMapId.value}`);
  currentMapInfo.value = await response.json();
});

const lang = ref("en");
</script>
