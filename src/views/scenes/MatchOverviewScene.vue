<template>
  <div class="scene master-match-overview-scene">
    <NamePlateHeader :lang="lang"></NamePlateHeader>

    <MapComponent class="red ban" v-bind="outerBinds.redBan"></MapComponent>
    <MapComponent class="red protect" v-bind="outerBinds.redProtect"></MapComponent>
    <MapComponent class="blue protect" v-bind="outerBinds.blueProtect"></MapComponent>
    <MapComponent class="blue ban" v-bind="outerBinds.blueBan"></MapComponent>
    <MapComponent
      v-if="tbPlayed"
      class="tb absolute-center-horizontal"
      v-bind="outerBinds.tiebreaker"
    ></MapComponent>

    <div class="box red">
      <MapComponent
        class="map"
        v-for="bind in innerBinds[0]"
        v-bind="bind"
        :key="bind"
      ></MapComponent>
    </div>
    <div class="box blue">
      <MapComponent
        class="map"
        v-for="bind in innerBinds[1]"
        v-bind="bind"
        :key="bind"
      ></MapComponent>
    </div>

    <div v-if="matchFinished" class="win absolute-center-horizontal">
      <img class="winBg" src="@/assets/img/matchOverview/winBg.png" />
      <HeaderImage
        class="winHeader absolute-center-horizontal"
        :lang="lang"
        :img="`win_${matchWinTeam.bool ? 'red' : 'blue'}`"
      ></HeaderImage>
      <img
        class="pfp absolute-center"
        :class="{ red: matchWinTeam.bool, blue: !matchWinTeam.bool }"
        :src="`https://a.ppy.sh/${matchWinTeam.team.players[0].id}`"
      />
      <img
        class="colorKanji absolute-center-horizontal"
        :src="matchWinTeam.bool ? redKanji : blueKanji"
      />
    </div>
  </div>
</template>

<style scoped>
.ban,
.protect,
.tb {
  position: absolute;
  top: 290px;
}
.red.ban {
  left: 70px;
}
.red.protect {
  left: 330px;
}
.blue.ban {
  right: 70px;
}
.blue.protect {
  right: 330px;
}

.box {
  position: absolute;
  width: 860px;
  height: 560px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  bottom: 20px;
  box-sizing: border-box;
  padding: 100px 40px 0 40px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: -100px 0;
}
.box.red {
  background-image: url("@/assets/img/matchOverview/redBox.png");
  left: 10px;
}
.box.blue {
  background-image: url("@/assets/img/matchOverview/blueBox.png");
  right: 10px;
}

.box > .map {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: -40px;
}

.win {
  top: 542px;
}

.winBg {
  height: 500px;
  animation: glowPulse 1.5s ease-in-out infinite;
}

@keyframes glowPulse {
  0% {
    filter: drop-shadow(0px 0px 15px #ffdd84);
  }
  50% {
    filter: drop-shadow(0px 0px 25px #ffdd84);
  }
  100% {
    filter: drop-shadow(0px 0px 15px #ffdd84);
  }
}

.winHeader {
  top: 40px;
}

.pfp {
  position: absolute;
  height: 125px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
.pfp.blue {
  border: 5px solid var(--color-B);
}
.pfp.red {
  border: 5px solid var(--color-R);
}

.colorKanji {
  height: 120px;
  bottom: 40px;
}
</style>

<script setup>
import redKanji from "@/assets/img/redKanji.png";
import blueKanji from "@/assets/img/blueKanji.png";

import MapComponent from "@/components/MapComponent/MapComponent.vue";
import NamePlateHeader from "@/components/NamePlateHeader.vue";

import { computed } from "vue";
import { useOverlayDataStore } from "@/stores/socket";
import { getMappool, intObjectToArray, teamName2bool } from "@/assets/utils";
import HeaderImage from "@/components/HeaderImage.vue";

const state = useOverlayDataStore();

const lang = computed(() => state.data?.lang);

const mappool = computed(() => intObjectToArray(state.data?.mappool));
const preMatch = computed(() => state.data?.progress?.pre_match);
const matchFinished = computed(() => state.data?.progress?.done);

const firstPick = computed(() => teamName2bool(state.data, 0, preMatch.value?.first_pick));
const picks = computed(() => intObjectToArray(state.data?.progress?.pick));
const winners = computed(() => intObjectToArray(state.data?.progress?.winner));

const tbPlayed = computed(
  () => picks.value.length === winners.value.length && picks.value[picks.value.length - 1] === "TB1"
);

const outerBinds = computed(() => {
  return {
    redProtect: {
      protectTeam: true,
      protect: true,
      compact: true,
      map: getMappool(mappool.value, preMatch.value?.red_protect),
    },
    redBan: {
      banpickTeam: true,
      altBan: true,
      compact: true,
      map: getMappool(mappool.value, preMatch.value?.red_ban),
    },
    blueProtect: {
      protectTeam: false,
      protect: true,
      compact: true,
      map: getMappool(mappool.value, preMatch.value?.blue_protect),
    },
    blueBan: {
      banpickTeam: false,
      altBan: true,
      compact: true,
      map: getMappool(mappool.value, preMatch.value?.blue_ban),
    },
    tiebreaker: {
      compact: true,
      map: getMappool(mappool.value, "TB1"),
      win: true,
      winTeam: teamName2bool(state.data, 0, winners.value[winners.value.length - 1]),
      // Because the TB map will only be displayed when tbPlayed is true,
      // which is only true when the last picked map is TB1 and its winner was set (picks count = winners count)
    },
  };
});

const innerBinds = computed(() => {
  const returnData = [[], []];

  let pickTurn = firstPick.value;
  for (let i = 0; i < picks.value.length; i++) {
    let win = undefined;
    let winTeam = undefined;

    if (picks.value[i] === "TB1") break; // We don't put TB into this box

    if (winners.value?.[i]) {
      win = true;
      winTeam = teamName2bool(state.data, 0, winners.value[i]);
    }

    returnData[Number(!pickTurn)].push({
      compact: true,
      map: getMappool(mappool.value, picks.value[i]),
      win,
      winTeam,
    });
    pickTurn = !pickTurn;
  }

  return returnData;
});

const matchWinTeam = computed(() => {
  if (!matchFinished.value) return undefined;

  const teams = intObjectToArray(state.data?.teams);
  const lastWinner = intObjectToArray(state.data?.progress?.winner).pop();
  const winningTeamBool = teamName2bool(state.data, 0, lastWinner);

  return {
    bool: winningTeamBool,
    team: teams[Number(!winningTeamBool)],
  };
});
</script>
