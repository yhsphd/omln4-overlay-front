<template>
  <div class="master-name-plate-header">
    <VersusComponent v-if="!inMatch" :teams="teams" :lang="lang" />
    <HeaderImage
      v-if="inMatch"
      class="absolute-center"
      :lang="lang"
      :text="headerText"
      :img="'rounds/' + poolName?.toLowerCase()"
    />
    <TeamComponent
      v-for="(team, i) in teams"
      :key="team"
      :team="team"
      :isRed="i === 0"
      :inMatch="inMatch"
      :slots="slots"
      :points="points[i]"
    />
  </div>
</template>

<style scoped>
.master-name-plate-header {
  position: relative;
  width: 1920px;
  height: 180px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.75) 100%
  );
}

.headerImage {
  height: 128px;
}
</style>

<script setup>
import HeaderImage from "./HeaderImage.vue";
import VersusComponent from "./NamePlateHeader/VersusComponent.vue";
import TeamComponent from "./NamePlateHeader/TeamComponent.vue";

import { computed } from "vue";
import { useOverlayDataStore } from "@/stores/socket";
import { intObjectToArray } from "@/assets/utils";

const state = useOverlayDataStore();

defineProps({
  headerText: {
    type: Object,
    default: () => ({
      en: "o!mLN4 Match - Overview",
      cn: "o!mLN4 Match - Overview",
    }),
  },
  lang: {
    type: String,
    default: "en",
  },
  inMatch: {
    type: Boolean,
    default: true, // true: during match, false: pre-match
  },
});

const teams = computed(() => intObjectToArray(state.data?.teams));
const slots = computed(() => (state.data?.lobby?.bo + 1) / 2);
const points = computed(() => intObjectToArray(state.data?.lobby?.set_scores));
const poolName = computed(() => state.data?.mappool_name);
</script>
