<template>
  <div class="master-team-component horizontal-box" :class="{ red: isRed, blue: !isRed }">
    <img class="color" :src="isRed ? redKanji : blueKanji" />
    <div class="pfp" :style="{ backgroundImage: cssUrl(`https://a.ppy.sh/${team.players[0].id}`) }">
      <div class="seedBadge zen-maru-gothic-black">{{ team.seed }}</div>
    </div>
    <img class="flag" :src="`https://assets.ppy.sh/old-flags/${team.flag}.png`" />
    <div class="teamInfo">
      <div class="nick">{{ team.players[0].nick }}</div>
      <div class="sub zen-maru-gothic-black">PLAYER {{ isRed ? 1 : 2 }}</div>
      <div v-if="inMatch" class="stars horizontal-box">
        <div v-for="j in slots" :key="j" class="star" :class="{ enabled: j <= points }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-team-component {
  position: absolute;
  padding: 40px;
}

.master-team-component.blue {
  right: 0;
}

.master-team-component > * {
  z-index: 2;
}

.blue.horizontal-box,
.blue .horizontal-box {
  flex-direction: row-reverse;
}

.pfp {
  position: relative;
  width: 125px;
  height: 125px;
  box-sizing: border-box;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.red .pfp {
  border: 5px solid var(--color-R);
}

.blue .pfp {
  border: 5px solid var(--color-B);
}

.seedBadge {
  position: absolute;
  top: -36px;
  width: 70px;
  height: 90px;
  background-image: url("@/assets/img/namePlateHeader/seedBg.png");
  background-size: contain;
  background-repeat: no-repeat;
  text-align: center;
  font-size: 32px;
  padding-top: 25px;
}

.red .seedBadge {
  right: -20px;
}

.blue .seedBadge {
  left: -20px;
}

.flag {
  width: 72px;
  object-fit: contain;
  margin: 16px;
}

.color {
  position: absolute;
  height: 96px;
  top: 50px;
  z-index: 1;
}

.red .color {
  left: 190px;
}

.blue .color {
  right: 200px;
}

.teamInfo {
  margin-top: 16px;
  height: 93px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.blue > .teamInfo {
  text-align: right;
}

.nick {
  font-size: 32px;
}

.sub {
  font-size: 20px;
  margin-top: -8px;
}

.stars {
  margin: 4px -5px 0 -5px;
}

.star {
  width: 20px;
  height: 20px;
  margin: 0 5px 0 5px;
  border-radius: 50%;
  background-color: #d9d9d9;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
}

.star.enabled {
  background-color: var(--color-Y);
}
</style>

<script setup>
import { cssUrl } from "@/assets/utils";
import redKanji from "@/assets/img/redKanji.png";
import blueKanji from "@/assets/img/blueKanji.png";

defineProps({
  team: Object,
  isRed: Boolean,
  inMatch: Boolean,
  slots: Number,
  points: Number,
});
</script>
