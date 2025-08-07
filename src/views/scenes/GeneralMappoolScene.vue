<template>
  <div class="scene master-general-mappool-scene">
    <HeaderImage
      class="header"
      :text="headerText"
      :lang="lang"
      :img="`rounds/${mappoolName.toLowerCase()}`"
    ></HeaderImage>
    <div class="mapsContainer">
      <MapComponent
        class="map"
        v-for="(map, i) in mappool"
        :map="map"
        :quals="quals"
        :stage="i + 1"
        :key="i"
        :showcase="true"
      ></MapComponent>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: absolute;
  transform: translateX(-50%);
  left: 390px;
  top: 45px;
}

.mapsContainer {
  width: 100%;
  height: 800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 200px;
}

.map {
  margin: 12px 20px 12px 20px;
}
</style>

<script setup>
import MapComponent from "@/components/MapComponent/MapComponent.vue";
import HeaderImage from "@/components/HeaderImage.vue";

import { computed, ref } from "vue";
import { intObjectToArray } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";

const state = useOverlayDataStore();

const lang = computed(() => state.data?.lang);

const mappoolName = computed(() => state.data?.mappool_name);
const mappool = computed(() => intObjectToArray(state.data?.mappool));
const quals = computed(() => mappoolName.value === "Q");

const headerText = ref({
  en: "o!mLN4 Mappool Showcase - Overview",
  cn: "o!mLN4 图池展示 - 总览",
});
</script>
