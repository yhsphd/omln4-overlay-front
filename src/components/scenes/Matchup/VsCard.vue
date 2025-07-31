<template>
  <div class="master-vs-card">
    <div class="mainBox">
      <img class="pfp" :src="`https://a.ppy.sh/${opponentTeam.players[0].id}`" />
      <div class="score" :class="{ red: color, blue: !color }">
        {{ `${match.result[pivotTeamIndex]}-${match.result[opponentTeamIndex]}` }}
      </div>
      <div class="versus">
        <div>VERSUS</div>
        <div class="zen-maru-gothic-black">{{ opponentTeam.name }}</div>
      </div>
      <div class="bracket zen-maru-gothic-medium">{{ match.bracket }}</div>
    </div>
  </div>
</template>

<style scoped>
.mainBox {
  position: relative;
  box-sizing: border-box;
  width: 275px;
  height: 150px;
  background: rgba(9, 9, 9, 0.8);
  border: 5px solid #000000;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}

.pfp {
  position: absolute;
  top: -45px;
  left: 4px;
  height: 80px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.score {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 150px;
  line-height: 110px;
  opacity: 0.74;
}
.score.red {
  color: #c02230;
}
.score.blue {
  color: #1c4ade;
}

.versus {
  position: absolute;
  left: 4px;
  top: 40px;
  font-size: 24px;
  line-height: 28px;
}

.bracket {
  position: absolute;
  font-size: 20px;
  right: 6px;
}
</style>

<script setup>
import { computed } from "vue";
import { intObjectToArray } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";

const state = useOverlayDataStore();

const props = defineProps({
  color: Boolean, // true: red, false: blue
  match: Object,
  pivot: Number,
});

const allTeams = computed(() => intObjectToArray(state.data?.extended.teams));
const pivotTeamIndex = computed(() => intObjectToArray(props.match.players).indexOf(props.pivot));
const opponentTeamIndex = computed(() => Number(!pivotTeamIndex.value));
const opponentTeam = allTeams.value.find(
  (x) => x.index === props.match.players[opponentTeamIndex.value]
);
</script>
