<template>
  <div class="master-map-component">
    <div class="wrapper">
      <div class="content absolute-center-horizontal"
      :class="{ scrolledUp, completed: ban || win && !isMatchOverview }"
      :style="isMatchOverview ? { filter: 'brightness(1)'} : {}">
        <div v-if="hidden" class="hiddenText antihero">SERVING<br />SOON!</div>
        <template v-if="!hidden">
          <div class="artist zen-maru-gothic-regular">{{ artist }}</div>
          <OverflowText class="title covered-by-your-grace-regular" :key="title">
            {{ title }}
          </OverflowText>
          <div class="diff zen-maru-gothic-regular">
            [{{ diff }}] - by <b>{{ mapper }}</b>
          </div>
          <StatTable v-if="!compact" :stats="stats"></StatTable>
        </template>
      </div>
      <ThumbnailComponent
        :hidden="hidden"
        :bg="bgUrl"
        :ban="ban"
        :pick="pick"
        :win="win"
        :team="banpickTeam"
        :isMatchOverview
      ></ThumbnailComponent>
      <CodeBadge class="codeBadge" :code="code"
      :class="{ completed: ban || win && !isMatchOverview }"
      :style="isMatchOverview ? { filter: 'brightness(1)'} : {}"></CodeBadge>
      <StageBadge v-if="quals" class="stageBadge">{{ stage }}</StageBadge>
      <WinBadge v-if="win" class="winBadge" :team="winTeam"
      :class="{ completed: ban || win && !isMatchOverview }"
      :style="isMatchOverview ? { filter: 'brightness(1)'} : {}"></WinBadge>
      <ProtectBadge
        v-if="protect"
        class="protectBadge"
        :class="{ up: scrolledUp, down: !scrolledUp }"
        :team="protectTeam"
      ></ProtectBadge>
      <AltBanBadge v-if="altBan" class="altBanBadge" :team="banpickTeam"></AltBanBadge>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 220px;
  height: 250px;
}

.codeBadge {
  position: absolute;
  right: 50px;
  top: 70px;
}

.stageBadge {
  position: absolute;
  top: -30px;
  left: -30px;
}

.winBadge {
  position: absolute;
  right: -20px;
  top: -30px;
}

.protectBadge {
  position: absolute;
}

.protectBadge.up {
  left: 20px;
  top: -50px;
}

.protectBadge.down {
  left: 25px;
  bottom: -25px;
}

.altBanBadge {
  position: absolute;
  left: 20px;
  top: -50px;
}

.content {
  box-sizing: border-box;
  top: 70px;
  width: 220px;
  height: 170px;
  background-image: url("@/assets/img/map/data_bg.png");
  background-size: cover;
  /* padding: 10px 10px 20px 10px; */
  padding: 35px 35px 20px 35px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  color: black;
}

.content.scrolledUp {
  top: 35px;
}

.hiddenText {
  font-size: 24px;
  text-align: center;
  rotate: -5deg;
}

.title {
  white-space: nowrap;
  width: 100%;
  height: 28px;
  line-height: 28px;
  text-align: center;
}

.artist {
  font-size: 8px;
}

.diff {
  font-size: 8px;
  margin-bottom: 4%;
  white-space: nowrap;
}

.completed {
  filter: brightness(0.3);
}

.completed_alt {
  filter: brightness(0.5);
}
</style>

<script setup>
import { computed } from "vue";

import CodeBadge from "./CodeBadge.vue";
import StageBadge from "./StageBadge.vue";
import StatTable from "./StatTable.vue";
import ThumbnailComponent from "./ThumbnailComponent.vue";
import WinBadge from "./WinBadge.vue";
import ProtectBadge from "./ProtectBadge.vue";
import AltBanBadge from "./AltBanBadge.vue";
import OverflowText from "../OverflowText.vue";

const props = defineProps({
  map: {
    type: Object,
    default: () => ({
      artist: "",
      title: "",
      difficulty: "",
      mapper: "",
      code: "",
      stats: { sr: 0, hp: 0, od: 0, length: 0 },
      background: "",
      original: false,
    }),
  },
  quals: Boolean,
  stage: Number,
  showcase: { type: Boolean, default: false },
  compact: { type: Boolean, default: false }, // should we omit stats?
  win: { type: Boolean, default: false }, // is this map won by either of team?
  winTeam: { type: Boolean, default: true }, // winning team, true: red, false: blue
  protect: { type: Boolean, default: false }, // protected?
  protectTeam: { type: Boolean, default: true },
  pick: { type: Boolean, default: false }, // picked?
  ban: { type: Boolean, default: false }, // banned?
  banpickTeam: { type: Boolean, default: true }, // banned/protected team, true: red, false: blue
  altBan: { type: Boolean, default: false }, // use badges to indicate ban?
  isMatchOverview: { type: Boolean, default: false }, // are we in match overview scene?
});

const artist = computed(() => props.map.artist);
const title = computed(() => props.map.title);
const diff = computed(() => props.map.difficulty);
const mapper = computed(() => props.map.mapper);
const code = computed(() => props.map.code);
const stats = computed(() => props.map.stats);
const bgUrl = computed(() => props.map.background);

const hidden = computed(() => props.showcase && props.map.original); // should we hide info?
const scrolledUp = computed(() => hidden.value || props.compact);
</script>
