<template>
  <div class="scene master-quals-results-bulk-scene">
    <HeaderImage
      class="header absolute-center-horizontal"
      :lang="lang"
      img="qualifier_results"
    ></HeaderImage>

    <Transition name="switchPage" mode="out-in">
      <div class="mainBox absolute-center-horizontal" :key="page">
        <PlayerResult
          v-for="i in indexList[page]"
          :id="qualsData[i]?.id"
          :placement="playerCount - i"
          :nick="qualsData[i]?.nick"
          :flag="countryData[qualsData[i]?.id] || 'XX'"
          :avg_rank="qualsData[i]?.rank_sum"
          :avg_score="qualsData[i]?.score_avg"
          :maps="qualsData[i]?.maps"
          :key="qualsData[i]?.id"
        ></PlayerResult>
      </div>
    </Transition>

    <div class="interface horizontal-box">
      <div @click="() => page > 0 ? page-- : page -= 0"></div>
      <div @click="() => page < maxPage ? page++ : page += 0"></div>
    </div>
  </div>
</template>

<style scoped>
.header {
  top: 20px;
}

.mainBox {
  position: absolute;
  width: 1800px;
  height: 830px;
  top: 190px;
  border: 10px solid #810c06;
  background-color: var(--color-BG);
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
import PlayerResult from "@/components/scenes/QualsResultsBulk/PlayerResult.vue";

import { computed, ref, watchEffect, onMounted } from "vue";
import { intObjectToArray, rootUrl } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";

const state = useOverlayDataStore();
const lang = computed(() => state.data?.lang);

const playerCount = computed(() => Object.keys(state.data?.extended?.quals || {}).length);
const maxPage = computed(() => Math.floor(((playerCount.value - 1)) / 10));
const offset = computed(() => playerCount.value % 10);
const page = ref(0);

const indexList = computed(() => {
  const result = [];
  let currentIndex = 0;
  
  const firstPageSize = offset.value === 0 ? 10 : offset.value;
  const firstPage = [];
  for (let i = 0; i < firstPageSize; i++) {
    firstPage.push(currentIndex++);
  }
  result.push(firstPage.reverse());

  for (let pageNum = 1; pageNum <= maxPage.value; pageNum++) {
    const page = [];
    for (let i = 0; i < 10; i++) {
      page.push(currentIndex++);
    }
    result.push(page.reverse());
  }
  
  return result;
});

const qualsData = computed(() => intObjectToArray(state.data?.extended?.quals));

const countryData = ref({});

const fetchFlags = async (ids) => {
  const response = await fetch(`${rootUrl}/api/osu/users?ids=${JSON.stringify(ids)}`);
  const res = await response.json();
  const cache = {};
  for (const user of res) {
    cache[user.id] = user.country_code;
  }
  for (const user of ids) {
    countryData.value[user] = cache[user] || 'XX';
  }
  console.log(cache);
}

watchEffect(() => {
  fetchFlags(indexList.value[page.value].map(i => qualsData.value[i]?.id));
});

</script>