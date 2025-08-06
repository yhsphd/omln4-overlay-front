<template>
  <div class="master-match-component">
    <div class="wrapper">
      <div v-if="!finished" class="middleText absolute-center zen-maru-gothic-black">VS</div>
      <div v-if="finished" class="middleText absolute-center zen-maru-gothic-black">
        <span :class="{ win: winTeam }">{{ match.result[0] === -1 ? "FF" : match.result[0] }}</span>
        -
        <span :class="{ win: !winTeam }">{{
          match.result[1] === -1 ? "FF" : match.result[1]
        }}</span>
      </div>

      <div class="red">
        <img
          class="flag absolute-center-vertical"
          :src="`https://assets.ppy.sh/old-flags/${teams[0].flag}.png`"
        />
        <div class="nick absolute-center-vertical">
          {{ teams[0].name.replace(" ", "").slice(0, 3).toUpperCase() }}
        </div>
      </div>
      <div class="blue">
        <img
          class="flag absolute-center-vertical"
          :src="`https://assets.ppy.sh/old-flags/${teams[1].flag}.png`"
        />
        <div class="nick absolute-center-vertical">
          {{ teams[1].name.replace(" ", "").slice(0, 3).toUpperCase() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 85px;
}

.middleText {
  font-size: 32px;
}
.win {
  color: #ffe17b;
}

.flag {
  position: absolute;
}
.nick {
  position: absolute;
  font-size: 32px;
}
.red {
  height: 100%;
  left: 0;
}
.red > .flag {
  left: 16px;
}
.red > .nick {
  left: 110px;
  color: #c02230;
}
.blue {
  height: 100%;
  right: 0;
}
.blue > .flag {
  right: 16px;
}
.blue > .nick {
  right: 110px;
  color: #1c4ade;
}
</style>

<script setup>
import { intObjectToArray } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";
import { computed } from "vue";

const state = useOverlayDataStore();

const props = defineProps({
  finished: Boolean,
  match: Object,
});

const allTeams = computed(() => intObjectToArray(state.data?.extended.teams));
const teams = computed(() => {
  const teamIndexes = intObjectToArray(props.match?.players);
  return teamIndexes.map((x) => allTeams.value.find((y) => y.index === x));
});
const winTeam = computed(() => props.match.result[0] >= props.match.result[1]);
</script>
