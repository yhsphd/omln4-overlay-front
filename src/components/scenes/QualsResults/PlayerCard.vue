<template>
  <div class="master-player-card">
    <div class="flagWrapper">
      <svg class="absolute-center" width="320" height="12" viewBox="0 0 320 12">
        <path d="M6 0L12 6L6 12L0 6L6 0Z" fill="#C02230" />
        <path d="M26 0L32 6L26 12L20 6L26 0Z" fill="#C02230" />
        <path d="M46 0L52 6L46 12L40 6L46 0Z" fill="#C02230" />
        <path d="M274 0L280 6L274 12L268 6L274 0Z" fill="#C02230" />
        <path d="M294 0L300 6L294 12L288 6L294 0Z" fill="#C02230" />
        <path d="M314 0L320 6L314 12L308 6L314 0Z" fill="#C02230" />
      </svg>

      <img
        class="flag absolute-center"
        :src="`https://assets.ppy.sh/old-flags/${playerDetails?.country_code}.png`"
      />
    </div>
    <div class="pfpWrapper">
      <div class="nick">{{ nick }}</div>
      <div
        class="pfp"
        :style="{
          backgroundImage: cssUrl(`https://a.ppy.sh/${id}`),
        }"
      ></div>
      <div class="zen-maru-gothic-bold" style="font-size: 20px; line-height: 40px">
        PLAYER STATISTICS
      </div>
    </div>

    <div class="key">Rank</div>
    <div class="value">
      #{{ playerDetails?.statistics?.global_rank.toLocaleString("EN-US") ?? "---" }}
    </div>

    <div class="key">pp count</div>
    <div class="value">
      {{ Math.round(playerDetails?.statistics?.pp ?? 0).toLocaleString("EN-US") }}
    </div>
  </div>
</template>

<style scoped>
.master-player-card {
  width: 420px;
  height: 840px;
  background-color: #191919;
}

.flagWrapper {
  position: relative;
  height: 75px;
}

.pfpWrapper {
  height: 535px;
  background-color: #c02230;
  text-align: center;
}
.nick {
  width: 100%;
  line-height: 75px;
  font-size: 40px;
  white-space: nowrap;
}
.pfp {
  width: 420px;
  height: 420px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.key {
  font-size: 24px;
  color: #ffe17b;
  margin-top: 24px;
  margin-left: 16px;
}
.value {
  font-size: 36px;
  margin-left: 16px;
}
</style>

<script setup>
import { cssUrl, rootUrl } from "@/assets/utils";
import { ref, watchEffect } from "vue";

const playerDetails = ref(null);

const props = defineProps({
  nick: String,
  id: Number,
});

watchEffect(async () => {
  if (!props.id) return;
  const response = await fetch(`${rootUrl}/api/osu/user?id=${props.id}`);
  playerDetails.value = await response.json();
});
</script>
