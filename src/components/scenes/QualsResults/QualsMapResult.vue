<template>
  <div class="master-quals-map-result">
    <div class="wrapper horizontal-box">
      <div
        class="bg"
        :style="{
          backgroundImage: cssUrl(mappool?.background),
        }"
      >
        <div class="bgGradient"></div>
      </div>
      <div class="titleArtist">
        <div>
          <div class="title">{{ mappool.title }}</div>
          <div class="artist zen-maru-gothic-bold">{{ mappool.artist }}</div>
        </div>
      </div>
      <div class="scoreAcc">
        <div class="score">{{ record.score.toLocaleString("EN-US") }}</div>
        <div class="acc">
          <span class="zen-maru-gothic-regular">Accuracy: </span>
          <span class="zen-maru-gothic-black">{{ (record.acc * 100).toFixed(2) }}%</span>
        </div>
      </div>
      <div class="seedChip">
        <div class="stage zen-maru-gothic-black">{{ index + 1 }}</div>
        <div class="seed">{{ record.rank }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 120px;
  background-color: var(--color-BG);
  align-items: center;
  box-sizing: border-box;
  border: solid 1px black;
}

.bg {
  position: relative;
  width: 300px;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.bgGradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(25, 25, 25, 0) 0%, var(--color-BG) 100%);
}

.titleArtist {
  position: relative;
  flex-grow: 1;
  height: 100%;
}
.titleArtist > div {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  font-size: 36px;
}
.artist {
  font-size: 20px;
}

.scoreAcc {
  text-align: right;
}
.score {
  font-size: 64px;
  line-height: 64px;
  color: var(--color-Y);
}
.acc {
  font-size: 20px;
}

.seedChip {
  position: relative;
  width: 105px;
  height: 100px;
  background-image: url("@/assets/img/qualsResults/seedChip.png");
  background-size: cover;
  box-sizing: border-box;
  background-repeat: no-repeat;
  margin: 0 16px;
  text-align: center;
}
.stage {
  position: absolute;
  font-size: 16px;
  top: -6px;
  right: 43px;
  rotate: 5deg;
}
.seed {
  font-size: 48px;
  margin-top: 25px;
}
</style>

<script setup>
import { cssUrl } from "@/assets/utils";

defineProps({
  mappool: Object,
  record: Object,
  index: Number,
});
</script>
