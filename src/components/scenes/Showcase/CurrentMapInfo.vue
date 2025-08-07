<template>
  <div class="master-current-map-info">
    <div class="bg" :style="{ backgroundImage: cssUrl(bg) }"></div>
    <div class="songInfo">
      <div class="title dm-serif-display-regular" style="font-size: 24px">{{ title }}</div>
      <div class="artist zen-maru-gothic-black" style="font-size: 16px">{{ artist }}</div>
    </div>
    <div class="diff">
      <svg class="absolute-center" width="452" height="12" viewBox="0 0 452 12" fill="none">
        <path d="M406 0L412 6L406 12L400 6L406 0Z" fill="#C02230" />
        <path d="M426 0L432 6L426 12L420 6L426 0Z" fill="#C02230" />
        <path d="M446 0L452 6L446 12L440 6L446 0Z" fill="#C02230" />
        <path d="M6 0L12 6L6 12L0 6L6 0Z" fill="#C02230" />
        <path d="M26 0L32 6L26 12L20 6L26 0Z" fill="#C02230" />
        <path d="M46 0L52 6L46 12L40 6L46 0Z" fill="#C02230" />
      </svg>

      <span class="bracket">[ </span>
      {{ diff }}
      <span class="bracket"> ]</span>
    </div>
    <div class="mapperReplayerInfo zen-maru-gothic-regular">
      mapped by <b>{{ mapper }}</b> <span class="divider zen-maru-gothic-black">|</span> replay by
      <b>{{ player }}</b>
    </div>
    <StatTable class="statTable" :stats="np?.stats.modified"></StatTable>
    <div class="divider"></div>
    <div class="code">{{ code }}</div>
    <img v-if="custom && !original" src="@/assets/img/showcase/custom.png" class="customBadge" />
    <img v-if="original" :src="originalBadgeUrl" class="originalBadge" />
  </div>
</template>

<style scoped>
.master-current-map-info {
  position: relative;
  width: 484px;
  background-color: #1a1a1a;
  text-align: center;
  overflow: hidden;
}

.currentMapInfo > * {
  width: 100%;
}

.bg {
  height: 272px;
  background-size: cover;
}

.songInfo {
  height: 108px;
  background-color: var(--color-R);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.diff {
  position: relative;
  height: 43px;
  line-height: 43px;
  font-size: 24px;
  background-color: #333333;
}

.diff > .bracket {
  color: var(--color-R);
}

.mapperReplayerInfo {
  line-height: 43px;
}

.mapperReplayerInfo > .divider {
  color: var(--color-R);
  margin: 0 5px;
}

.master-current-map-info > .divider {
  width: 242px;
  height: 5px;
  background-color: white;
  margin: 16px 25%;
  opacity: 0.2;
}

.code {
  font-size: 128px;
  text-align: right;
  opacity: 0.3;
  position: absolute;
  right: -5px;
  bottom: -50px;
}

.customBadge {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 150px;
}

.originalBadge {
  position: absolute;
  transform: translateX(-50%);
  left: 130px;
  bottom: 15px;
  height: 120px;
}
</style>

<script setup>
import originalBadgeImage_cn from "@/assets/img/showcase/original_cn.png";
import originalBadgeImage_en from "@/assets/img/showcase/original_en.png";
import { cssUrl } from "@/assets/utils";

import StatTable from "@/components/scenes/Showcase/StatTable.vue";
import { useOverlayDataStore } from "@/stores/socket";
import { computed, ref } from "vue";

const state = useOverlayDataStore();

const np = computed(() => state.data?.now_playing?.osu);

const lang = ref("en"); // Backend work needed
const bg = computed(() => np.value?.background);
const title = computed(() => np.value?.title);
const artist = computed(() => np.value?.artist);
const diff = computed(() => np.value?.difficulty);
const mapper = computed(() => np.value?.mapper);
const player = computed(() => np.value?.player);
const code = computed(() => np.value?.code);
const custom = computed(() => np.value?.custom);
const original = computed(() => np.value?.original);
const originalBadgeUrl = computed(() =>
  lang.value === "cn" ? originalBadgeImage_cn : originalBadgeImage_en
);
</script>
