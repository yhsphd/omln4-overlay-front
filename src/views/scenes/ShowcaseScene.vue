<template>
  <div class="scene master-showcase-scene">
    <GeneralMappoolHeader class="header" :pool-name="mappoolName"></GeneralMappoolHeader>

    <div class="mainContainer horizontal-box absolute-center-horizontal">
      <div class="showcaseClient" ref="showcaseClient_ref">
        <DimensionInfo
          class="showcaseClientPosInfo"
          name="Screen/osu!<br>Capture"
          :source="showcaseClient_ref"
        ></DimensionInfo>
      </div>
      <CurrentMapInfo></CurrentMapInfo>
    </div>
    <ShowcaseProgressing class="progressing"></ShowcaseProgressing>
  </div>
</template>

<style scoped>
.header {
  position: absolute;
  transform: translateX(-50%);
  left: 278px;
  top: 36px;
}

.mainContainer {
  width: 1850px;
  height: 768px;
  top: 200px;
}

.showcaseClient {
  width: 1366px;
  height: 768px;
  background-color: black;
}

.showcaseClientPosInfo {
  width: 400px;
  margin: 100px;
}

.progressing {
  position: absolute;
  bottom: 30px;
  left: 35px;
}
</style>

<script setup>
import { computed, ref } from "vue";

import GeneralMappoolHeader from "@/components/GeneralMappoolHeader.vue";

import { useOverlayDataStore } from "@/stores/socket";
import DimensionInfo from "@/components/DimensionInfo.vue";
import CurrentMapInfo from "@/components/scenes/Showcase/CurrentMapInfo.vue";
import ShowcaseProgressing from "@/components/scenes/Showcase/ShowcaseProgressing.vue";

const state = useOverlayDataStore();

const showcaseClient_ref = ref(null);

const mappoolName = computed(() => state.data?.mappool_name);
</script>
