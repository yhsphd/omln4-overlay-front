<template>
  <div class="scene master-general-mappool-scene">
    <GeneralMappoolHeader class="header" :pool-name="mappoolName"></GeneralMappoolHeader>
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
import { computed } from "vue";
import { intObjectToArray } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";

import GeneralMappoolHeader from "@/components/GeneralMappoolHeader.vue";
import MapComponent from "@/components/MapComponent/MapComponent.vue";

const state = useOverlayDataStore();

const mappoolName = computed(() => state.data?.mappool_name);
const mappool = computed(() => intObjectToArray(state.data?.mappool));
const quals = computed(() => mappoolName.value === "Q");
</script>
