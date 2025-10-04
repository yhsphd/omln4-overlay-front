<template>
  <div class="master-now-playing">
    <div class="wrapper" :class="wrapperClass">
      <CodeBadge class="code" :code="code"></CodeBadge>
      <img class="thumbnail" :src="bg" />
      <div class="infoContainer">
        <Transition name="switchPage" mode="out-in">
          <div v-if="npPageSwitcher.currPage === 'texts'" class="page textInfo">
            <div class="artist zen-maru-gothic-medium">
              {{ artist }}
            </div>
            <OverflowText class="title covered-by-your-grace-regular">
              {{ title }}
            </OverflowText>
            <div class="diffMapper zen-maru-gothic-medium">
              [{{ diff }}] - by <b>{{ mapper }}</b>
            </div>
          </div>
        </Transition>
        <Transition name="switchPage" mode="out-in">
          <div v-if="npPageSwitcher.currPage === 'stats'" class="page stats">
            <StatTable :stats="np?.stats.modified"></StatTable>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 697px;
  height: 138px;
  background-image: url("@/assets/img/gameplay/npbg.png");
  color: black;
}

.red {
  background-image: url("@/assets/img/gameplay/npbg_red.png");
}

.blue {
  background-image: url("@/assets/img/gameplay/npbg_blue.png");
}

.code {
  position: absolute;
  top: -15px;
  left: -75px;
}

.thumbnail {
  position: absolute;
  left: 90px;
  width: 220px;
  height: 124px;
  rotate: -5deg;
  border: 5px solid white;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25);
}

.infoContainer {
  position: absolute;
  right: 10px;
  top: 15px;
  width: 360px;
  height: 100px;
  /* border: 4px solid red; */
  overflow: hidden;
}
.infoContainer > .page {
  position: absolute;
  left: 0;
  height: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  white-space: nowrap;
}
.artist,
.diffMapper {
  position: relative;
  font-size: 16px;
}
.title {
  position: relative;
  width: 360px;
  font-size: 32px;
  line-height: 40px;
  margin-top: 4px;
}
.stats {
  box-sizing: border-box;
  padding: 12px 16px;
}
</style>

<script setup>
import CodeBadge from "../Banpick/CodeBadge.vue";
import StatTable from "./StatTable.vue";
import OverflowText from "../../OverflowText.vue";

import { computed, onMounted, onUpdated, ref } from "vue";
import { pageSwitcher } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";

const state = useOverlayDataStore();

const npPageSwitcher = ref(new pageSwitcher(["texts", "stats"], [10000, 5000]));

const np = computed(() => state.data?.now_playing?.osu);

const bg = computed(() => np.value?.background);
const title = computed(() => np.value?.title);
const artist = computed(() => np.value?.artist);
const diff = computed(() => np.value?.difficulty);
const mapper = computed(() => np.value?.mapper);
const code = computed(() => np.value?.code);

// for chatbox and show pick order

import { intObjectToArray } from "@/assets/utils";
import ChatBox from "@/components/scenes/Banpick/ChatBox.vue"

const mappool = computed(() => intObjectToArray(state.data?.mappool));
const progress = computed(() => state.data?.progress);
const codeToStatus = computed(() => {
  if (!mappool.value?.length || !progress.value) return {};
  
  const poolStatus = {};

  for (let i = 0; i < mappool.value.length; i++) {
    const map = mappool.value[i];

    poolStatus[map.code] = {
      ban: undefined,
      pick: undefined,
      banpickTeam: undefined,
      protect: undefined,
      protectTeam: undefined,
      win: undefined,
      winTeam: undefined,
    };
  }

  const preMatch = progress.value.pre_match;
  if (!preMatch) return poolStatus;

  // Pre-match stage
  if (preMatch.red_protect)
    poolStatus[preMatch.red_protect] = { ...poolStatus[preMatch.red_protect], protectTeam: true, protect: true };
  if (preMatch.red_ban)
    poolStatus[preMatch.red_ban] = { ...poolStatus[preMatch.red_ban], banpickTeam: true, ban: true };
  if (preMatch.blue_protect)
    poolStatus[preMatch.blue_protect] = { ...poolStatus[preMatch.blue_protect], protectTeam: false, protect: true };
  if (preMatch.blue_ban)
    poolStatus[preMatch.blue_ban] = { ...poolStatus[preMatch.blue_ban], banpickTeam: false, ban: true };

  // Match stage
  const teamNames = intObjectToArray(state.data?.teams).map((x) => x.name);
  const picks = intObjectToArray(progress.value.pick);
  const winners = intObjectToArray(progress.value.winner);
  const firstPickIndex = teamNames.indexOf(preMatch.first_pick);
  const firstPick = firstPickIndex === 0; // true: red (index 0), false: blue (index 1)

  let turn = firstPick;
  for (let i = 0; i < picks.length; i++) {
    if (picks[i]) {
      poolStatus[picks[i]] = { ...poolStatus[picks[i]], banpickTeam: turn, pick: true };
    }
    turn = !turn;
  }

  for (let i = 0; i < winners.length; i++) {
    if (picks[i]) {
      const winTeamIndex = teamNames.indexOf(winners[i]);
      poolStatus[picks[i]] = { 
        ...poolStatus[picks[i]], 
        win: true, 
        winTeam: winTeamIndex === 0 
      };
    }
  }

  return poolStatus;
});

const wrapperClass = computed(() => {
  if (!code.value || !codeToStatus.value) return {};
  
  const status = codeToStatus.value[code.value];
  return {
    'red': status?.banpickTeam === true,
    'blue': status?.banpickTeam === false
  };
});

onMounted(() => {
  // npPageSwitcher.value.init();
});
</script>
