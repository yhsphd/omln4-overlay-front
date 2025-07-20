<template>
  <div class="master-thumbnail-component">
    <div class="thumbImageContainer">
      <div class="bgToner" :class="{ pick, red: team, blue: !team }"></div>
      <div
        class="bgImage"
        :class="{ grayscale: ban || pick }"
        :style="{ backgroundImage: `url('${bgUrl}')` }"
      ></div>
    </div>
    <img v-if="ban" class="bannedImg" :src="team ? bannedImage_r : bannedImage_b" />
    <img v-if="pick" class="pickedImg" :src="team ? pickedImage_r : pickedImage_b" />
  </div>
</template>

<style scoped>
.master-thumbnail-component {
  position: absolute;
  width: 208px;
  height: 117px;
}

.thumbImageContainer {
  position: absolute;
  width: 100%;
  height: 100%;
  rotate: -5deg;
  border: white solid 5px;
}

.bgImage {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
}

.bgImage.grayscale {
  mix-blend-mode: multiply;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}

.bgToner {
  position: absolute;
  width: 100%;
  height: 100%;
}

.bgToner.picked.red {
  background-color: var(--color-R);
}

.bgToner.picked.blue {
  background-color: var(--color-B);
}

.bannedImg {
  position: absolute;
  left: 20px;
  top: 16px;
  height: 100px;
}

.pickedImg {
  position: absolute;
  left: 9px;
  top: 16px;
  height: 100px;
}
</style>

<script setup>
import hiddenImage from "@/assets/img/map/hidden.png";
import bannedImage_r from "@/assets/img/map/ban_r.png";
import bannedImage_b from "@/assets/img/map/ban_b.png";
import pickedImage_r from "@/assets/img/map/pick_r.png";
import pickedImage_b from "@/assets/img/map/pick_b.png";

import { computed } from "vue";

const props = defineProps({
  hidden: Boolean,
  bg: String,
  ban: Boolean,
  pick: Boolean,
  team: Boolean, // true: red, false: blue
});

const bgUrl = computed(() => (props.hidden ? hiddenImage : props.bg));
</script>
