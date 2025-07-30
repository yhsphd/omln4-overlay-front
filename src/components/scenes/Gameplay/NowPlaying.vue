<template>
  <div class="master-now-playing">
    <div class="wrapper">
      <CodeBadge class="code" :code="code"></CodeBadge>
      <img class="thumbnail" :src="bg" />
      <div class="infoContainer">
        <Transition name="switchPage" mode="out-in">
          <div v-if="npPageSwitcher.currPage === 'texts'" class="page textInfo">
            <div class="artist zen-maru-gothic-medium">{{ artist }}</div>
            <div class="title covered-by-your-grace-regular">{{ title }}</div>
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
  border: 5px solid #ffffff;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25);
}

.infoContainer {
  position: absolute;
  right: 10px;
  top: 15px;
  width: 360px;
  height: 100px;
  /* border: 4px solid red; */
}
.infoContainer > .page {
  position: absolute;
  left: 0;
  height: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.artist,
.diffMapper {
  font-size: 16px;
}
.title {
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

import { computed, onMounted, ref } from "vue";
import { pageSwitcher } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";

const state = useOverlayDataStore();

const npPageSwitcher = ref(new pageSwitcher(["texts", "stats"], [10000, 10000]));

const np = computed(() => state.data?.now_playing?.osu);

const bg = computed(() => np.value?.background);
const title = computed(() => np.value?.title);
const artist = computed(() => np.value?.artist);
const diff = computed(() => np.value?.difficulty);
const mapper = computed(() => np.value?.mapper);
const code = computed(() => np.value?.code);

onMounted(() => {
  npPageSwitcher.value.init();
});
</script>
