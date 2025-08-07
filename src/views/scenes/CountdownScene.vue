<template>
  <div class="scene master-countdown-scene">
    <!--Case: Shocase-->
    <template v-if="showcase">
      <CountdownWheel class="absolute-center wheel showcase" size="750px"></CountdownWheel>
      <CountdownTimeLeft class="absolute-center-vertical timeLeft showcase"></CountdownTimeLeft>
    </template>

    <!--Case: Non-showcase (VS)-->
    <template v-if="!showcase">
      <CountdownWheel class="absolute-center wheel" size="1500px"></CountdownWheel>
      <div class="absolute-center timeLeftBG"></div>
      <CountdownTimeLeft class="absolute-center timeLeft"></CountdownTimeLeft>
    </template>

    <!--Common-->
    <CountdownNowPlaying class="absolute-center-horizontal nowPlaying"></CountdownNowPlaying>
  </div>
</template>

<style scoped>
.wheel {
  z-index: 0;
}

.wheel.showcase {
  left: 480px;
}

.timeLeft {
  font-size: 200px;
  width: 500px;
}

.timeLeft.showcase {
  right: 128px;
  font-size: 256px;
  width: 650px;
}

.nowPlaying {
  position: absolute;
  bottom: 0;
}

.timeLeftBG {
  width: 800px;
  height: 225px;

  background: radial-gradient(50% 50% at 50% 50%, black 0%, rgba(0, 0, 0, 0) 100%);
}
</style>

<script setup>
import { ref } from "vue";

import CountdownTimeLeft from "@/components/scenes/Countdown/CountdownTimeLeft.vue";
import CountdownWheel from "@/components/scenes/Countdown/CountdownWheel.vue";
import CountdownNowPlaying from "@/components/scenes/Countdown/CowntdownNowPlaying.vue";

const showcase = ref(false);
</script>
