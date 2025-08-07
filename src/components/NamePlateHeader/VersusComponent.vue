<template>
  <div class="master-versus-component">
    <div
      class="rankContainer absolute-center-vertical"
      v-for="(team, i) in teams"
      :class="{ red: i === 0, blue: i === 1 }"
      :key="team"
    >
      <div class="rankHeader zen-maru-gothic-bold">RANK</div>
      <div class="rankNumber">{{ team.players[0].rank }}</div>
    </div>
    <HeaderImage class="absolute-center" :lang="lang" img="versus"></HeaderImage>
  </div>
</template>

<style scoped>
.master-versus-component {
  position: absolute;
  width: 100%;
  height: 100%;
}

.rankHeader {
  font-size: 16px;
}

.rankNumber {
  line-height: 84px;
  font-size: 96px;
}

.red .rankNumber {
  color: var(--color-R);
}

.blue .rankNumber {
  color: var(--color-B);
}

.rankContainer {
  position: absolute;
}

.red.rankContainer {
  right: 58%;
  text-align: right;
}

.blue.rankContainer {
  left: 58%;
}
</style>

<script setup>
import HeaderImage from "../HeaderImage.vue";

defineProps({
  teams: Array,
  lang: { type: String, default: "en" },
});
</script>
