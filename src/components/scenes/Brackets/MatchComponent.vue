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
        <img v-if="state.data?.lang !== 'cn'"
          class="flag absolute-center-vertical"
          :src="`https://assets.ppy.sh/old-flags/${teams[0].flag}.png`"
        />
        <div class="nick absolute-center-vertical">
          {{ formatNick(teams[0].name) }}
        </div>
      </div>
      <div class="blue">
        <img v-if="state.data?.lang !== 'cn'"
          class="flag absolute-center-vertical"
          :src="`https://assets.ppy.sh/old-flags/${teams[1].flag}.png`"
        />
        <div class="nick absolute-center-vertical">
          {{ formatNick(teams[1].name) }}
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
  color: var(--color-Y);
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
  color: var(--color-R);
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
  color: var(--color-B);
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

// Helper: keep only first three alphanumeric characters
const formatNick = (name) =>
  String(name || "")
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, 3)
    .toUpperCase();

const allTeams = computed(() => intObjectToArray(state.data?.extended.teams));
const teams = computed(() => {
  const teamIndexes = intObjectToArray(props.match?.players);
  return teamIndexes.map((x) => allTeams.value.find((y) => y.index === x));
});
const winTeam = computed(() => props.match.result[0] >= props.match.result[1]);
</script>
