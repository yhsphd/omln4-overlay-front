<template>
  <div class="master-next-order">
    <HeaderImage
      class="header absolute-center-horizontal"
      :lang="lang"
      img="next_order"
    ></HeaderImage>
    <div class="content absolute-center">
      <img class="thumbnail" :src="lastPick.background" />
      <CodeBadge class="codeBadge" :code="lastPick.code"></CodeBadge>
      <OriginalBadge
        v-if="lastPick.original"
        class="originalBadge"
        :lang="lang"
        :team="lastPickColor"
      ></OriginalBadge>
      <div class="info">
        <img class="flower absolute-center" :src="lastPickColor ? flower_red : flower_blue" />
        <div style="position: relative; z-index: 10">
          <div class="artist zen-maru-gothic-medium" style="font-size: 16px">
            {{ lastPick.artist }}
          </div>
          <div class="title covered-by-your-grace-regular" style="font-size: 48px">
            {{ lastPick.title }}
          </div>
          <div class="diffMapper zen-maru-gothic-medium" style="font-size: 16px">
            [{{ lastPick.difficulty }}] - by <b>{{ lastPick.mapper }}</b>
          </div>
          <StatTable class="statTable" :stats="lastPick.stats"></StatTable>
          <img class="typeText" :src="typeImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-next-order {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
}

.header {
  top: 24px;
}

.content {
  position: relative;
  background-image: url("@/assets/img/nextOrder/nextOrderBg.png");
  width: 1377px;
  height: 523px;
  background-size: cover;
}

.thumbnail {
  position: absolute;
  top: 50px;
  left: -170px;
  width: 650px;
  rotate: -5deg;
  border: white solid 8px;
  filter: drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.25));
}

.info {
  position: absolute;
  right: 84px;
  top: 70px;
  width: 700px;
  height: 360px;
  text-align: center;
  color: black;
}

.title {
  white-space: nowrap;
}

.flower {
  height: 400px;
  opacity: 0.25;
}

.statTable {
  margin: 20px 0 20px 0;
}

.typeText {
  height: 75px;
}

.codeBadge {
  position: absolute;
  right: 140px;
  top: -20px;
}

.originalBadge {
  position: absolute;
  right: 40px;
  bottom: 40px;
}
</style>

<script setup>
import flower_red from "@/assets/img/nextOrder/flower_red.png";
import flower_blue from "@/assets/img/nextOrder/flower_blue.png";
import ordinary_red from "@/assets/img/nextOrder/ordinary_red.png";
import ordinary_blue from "@/assets/img/nextOrder/ordinary_blue.png";
import custom_red from "@/assets/img/nextOrder/custom_red.png";
import custom_blue from "@/assets/img/nextOrder/custom_blue.png";

import HeaderImage from "@/components/HeaderImage.vue";
import StatTable from "./StatTable.vue";
import CodeBadge from "@/components/scenes/Banpick/CodeBadge.vue";
import OriginalBadge from "./OriginalBadge.vue";

import { computed } from "vue";
import { useOverlayDataStore } from "@/stores/socket";
import { intObjectToArray } from "@/assets/utils";

const state = useOverlayDataStore();

defineProps({
  lang: { type: String, default: "en" },
});

const picks = computed(() =>
  state.data?.progress?.pick ? intObjectToArray(state.data.progress.pick) : []
);
const lastPick = computed(() => {
  const mappool = intObjectToArray(state.data?.mappool);

  for (let i = 0; i < mappool.length; i++) {
    if (mappool[i].code === picks.value[picks.value.length - 1]) return mappool[i];
  }
  return {};
});
const lastPickColor = computed(() => {
  const teamNames = intObjectToArray(state.data?.teams).map((x) => x.name);
  const firstPick = !teamNames.indexOf(state.data?.progress?.pre_match.first_pick); // true: red, false: blue
  return picks.value.length % 2 ? firstPick : !firstPick;
});
const typeImage = computed(() => {
  if (lastPick.value.custom) {
    return lastPickColor.value ? custom_red : custom_blue;
  } else {
    return lastPickColor.value ? ordinary_red : ordinary_blue;
  }
});
</script>
