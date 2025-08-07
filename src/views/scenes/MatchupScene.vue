<template>
  <div class="scene master-matchup-scene">
    <NamePlateHeader :in-match="false" :lang="lang"></NamePlateHeader>

    <QualifierSeeds :teams="teams" :qData="qData"></QualifierSeeds>

    <div class="horizontal-box">
      <div class="historyContainer">
        <Transition name="switchPage" mode="out-in">
          <div class="page red" v-if="matchHistories[0].length < 9 || pageCounter % 2 === 0">
            <MatchHistoryItem
              class="history"
              v-for="match in matchHistories[0].slice(0, 8)"
              :key="match"
              :match="match"
              :pivot="teams[0].index"
              :color="true"
            ></MatchHistoryItem>
          </div>
        </Transition>
        <Transition name="switchPage" mode="out-in">
          <div class="page red" v-if="matchHistories[0].length >= 9 && pageCounter % 2 === 1">
            <MatchHistoryItem
              class="history"
              v-for="match in matchHistories[0].slice(8)"
              :key="match"
              :match="match"
              :pivot="teams[0].index"
              :color="true"
            ></MatchHistoryItem>
          </div>
        </Transition>
      </div>
      <div class="historyContainer">
        <Transition name="switchPage" mode="out-in">
          <div class="page blue" v-if="matchHistories[1].length < 9 || pageCounter % 2 === 0">
            <MatchHistoryItem
              class="history"
              v-for="match in matchHistories[1].slice(0, 8)"
              :key="match"
              :match="match"
              :pivot="teams[1].index"
              :color="false"
            ></MatchHistoryItem>
          </div>
        </Transition>
        <Transition name="switchPage" mode="out-in">
          <div class="page blue" v-if="matchHistories[1].length >= 9 && pageCounter % 2 === 1">
            <MatchHistoryItem
              class="history"
              v-for="match in matchHistories[1].slice(8)"
              :key="match"
              :match="match"
              :pivot="teams[1].index"
              :color="false"
            ></MatchHistoryItem>
          </div>
        </Transition>
      </div>
    </div>

    <HeaderImage
      class="round absolute-center-horizontal"
      :lang="lang"
      :text="headerText"
      :img="`rounds/${mappoolName.toLowerCase()}`"
    ></HeaderImage>
  </div>
</template>

<style scoped>
.historyContainer {
  position: relative;
  width: 50%;
}
.page.red {
  padding-left: 20px;
}
.page.blue {
  justify-content: flex-end;
  padding-right: 20px;
}
.page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 60px;
  align-content: flex-start;
  box-sizing: border-box;
}
.history {
  margin: 36px 16px;
}

.round {
  bottom: 80px;
}
</style>

<script setup>
import HeaderImage from "@/components/HeaderImage.vue";
import NamePlateHeader from "@/components/NamePlateHeader.vue";
import MatchHistoryItem from "@/components/scenes/Matchup/VsCard.vue";
import QualifierSeeds from "@/components/scenes/Matchup/QualifierSeeds.vue";

import { computed, onMounted, ref } from "vue";
import { useOverlayDataStore } from "@/stores/socket";
import { intObjectToArray } from "@/assets/utils";

const state = useOverlayDataStore();

const lang = computed(() => state.data?.lang);

const HISTORY_PAGE_TURN_INTERVAL = 10000;

const headerText = {
  en: "o!mLN4 Match - Match-up Details",
  cn: "o!mLN4 Match - Match-up Details",
};

const teams = computed(() => intObjectToArray(state.data?.teams));
const qData = computed(() => intObjectToArray(state.data?.extended?.quals));
const matches = computed(() => intObjectToArray(state?.data.extended?.matches));
const mappoolName = computed(() => state.data?.mappool_name);

const matchHistories = computed(() => {
  if (!teams.value || !matches.value || teams.value.length < 2) return [[], []];

  const player1Id = teams.value[0].index;
  const player2Id = teams.value[1].index;

  return [
    matches.value.filter((match) => intObjectToArray(match.players).includes(player1Id)).reverse(),
    matches.value.filter((match) => intObjectToArray(match.players).includes(player2Id)).reverse(),
  ];
});

const pageCounter = ref(0);

onMounted(() => {
  setInterval(() => pageCounter.value++, HISTORY_PAGE_TURN_INTERVAL);
});
</script>
