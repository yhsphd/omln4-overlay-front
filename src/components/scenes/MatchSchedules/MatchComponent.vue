<template>
  <div class="master-match-component">
    <div class="wrapper">
      <div
        class="pfp"
        v-for="(col, i) in ['red', 'blue']"
        :key="col"
        :class="col"
        :style="{
          backgroundImage: `url(https://a.ppy.sh/${teams[i].players[0].id})`,
        }"
      >
        <div class="score absolute-center-vertical" :class="{ ff: result?.[i] === -1 }">
          {{ resultStr[i] }}
          <img
            class="flag absolute-center-vertical"
            :src="`https://assets.ppy.sh/old-flags/${teams[i].flag}.png`"
          />
          <img
            v-if="col === 'red'"
            class="colorKanji absolute-center-vertical"
            src="@/assets/img/redKanji.png"
          />
          <img
            v-if="col === 'blue'"
            class="colorKanji absolute-center-vertical"
            src="@/assets/img/blueKanji.png"
          />
        </div>
      </div>
      <div class="vs absolute-center">VS</div>
      <div class="nick red">{{ teams[0].name }}</div>
      <div class="nick blue">{{ teams[1].name }}</div>
      <div class="schedule absolute-center-horizontal zen-maru-gothic-bold">
        {{ formattedSchedule }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 1020px;
  height: 200px;
  background-color: var(--color-BG);
  box-sizing: border-box;
  border: solid 1px black;
}

.pfp {
  position: absolute;
  width: 200px;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.pfp.blue {
  right: 0;
}
.score {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 96px;
}
.red .score {
  right: -50px;
  background-color: var(--color-R);
}
.blue .score {
  left: -50px;
  background-color: var(--color-B);
}
.score.ff {
  font-size: 48px;
}
.red .flag {
  right: -56px;
}
.blue .flag {
  left: -56px;
}
.colorKanji {
  height: 100px;
}
.red .colorKanji {
  right: -170px;
}
.blue .colorKanji {
  left: -150px;
}

.vs {
  font-size: 64px;
  color: var(--color-Y);
}

.nick {
  position: absolute;
  top: 4px;
  font-size: 24px;
}
.nick.red {
  left: 224px;
}
.nick.blue {
  right: 224px;
}

.schedule {
  font-size: 24px;
  bottom: 4px;
}
</style>

<script setup>
import { computed } from "vue";
import { intObjectToArray } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";

const state = useOverlayDataStore();

const props = defineProps({
  match: Object,
});

const allTeams = computed(() => intObjectToArray(state.data?.extended.teams));
const teams = computed(() => {
  const teamIndexes = intObjectToArray(props.match?.players);
  return teamIndexes.map((x) => allTeams.value.find((y) => y.index === x));
});

const result = computed(() => intObjectToArray(props.match?.result));
const resultStr = computed(() => {
  if (!result.value?.length) return ["?", "?"];
  return result.value.map((score, i) => {
    if (score === -1) return "FF";
    if (result.value[1 - i] === -1) return "-";
    return score?.toString() ?? "?";
  });
});

const formattedSchedule = computed(() => {
  if (!props.match?.schedule) return "";
  const date = new Date(props.match.schedule);
  return (
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) +
    " | " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      hour12: false,
    }) +
    " UTC"
  );
});
</script>
