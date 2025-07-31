<template>
  <div class="master-qualifier-seeds">
    <div class="wrapper horizontal-box">
      <div class="stageChip red" v-for="(rank, i) in seeds?.[0]" :key="rank">
        <div class="stage zen-maru-gothic-black">{{ i + 1 }}</div>
        <div class="seed">{{ rank }}</div>
      </div>

      <div style="flex-grow: 1"></div>
      <img class="header absolute-center" src="@/assets/img/matchup/qSeedsHeader.png" />

      <div class="stageChip blue" v-for="(rank, i) in seeds?.[1]" :key="rank">
        <div class="stage zen-maru-gothic-black">{{ i + 1 }}</div>
        <div class="seed">{{ rank }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  position: relative;
  text-align: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
}

.header {
  width: 256px;
}

.stageChip {
  position: relative;
  width: 80px;
  height: 100px;
  background-image: url("@/assets/img/matchup/qStageChip.png");
  background-size: cover;
  box-sizing: border-box;
  margin: 0 16px;
}
.stage {
  position: absolute;
  font-size: 16px;
  top: 4px;
  right: 8px;
  rotate: 35deg;
}
.seed {
  font-size: 48px;
  margin-top: 25px;
}
</style>

<script setup>
import { intObjectToArray } from "@/assets/utils";
import { computed } from "vue";

const props = defineProps({
  teams: Array,
  qData: Array,
});

const seeds = computed(() => {
  if (!props.teams || !props.qData || props.teams.length < 2) return [[], []];

  const player1Data = props.qData.find((q) => q.id === props.teams[0].players[0].id);
  const player2Data = props.qData.find((q) => q.id === props.teams[1].players[0].id);

  if (!player1Data?.maps || !player2Data?.maps) return [[], []];

  return [
    intObjectToArray(player1Data.maps).map((m) => m.rank),
    intObjectToArray(player2Data.maps).map((m) => m.rank),
  ];
});
</script>
