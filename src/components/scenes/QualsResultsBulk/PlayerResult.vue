<template>
  <div class="master-player-result">
    <div class="wrapper horizontal-box">
      <div class="placement-box">
        <div
          class="pfp"
          :style="{
            backgroundImage: cssUrl(`https://a.ppy.sh/${id}`),
          }"
        >
          <div class="bgGradient"></div>
        </div>
        <div class="placement">
            {{ convertOrdinalNumber(placement) }}
        </div>
      </div>
      <img
        class="flag"
        :src="`https://assets.ppy.sh/old-flags/${flag}.png`"
      />
      <div class="nick">
        {{ nick }}
      </div>
      <table class="table">
        <tr>
          <td
            v-for="stage in Array.from({length: 8}, (_, i) => i)"
            class="table-header"
            :key="stage"
            :style="{
              background: stage % 2 === 0 ? 'var(--color-BG-ALT)' : 'transparent'
            }"
          >
            {{ stage === 0 ? 'AVERAGE' : `STAGE ${stage}` }}
          </td>
        </tr>
        <tr>
          <td
            v-for="stage in Array.from({length: 8}, (_, i) => i)"
            class="table-data"
            :key="stage"
            :style="{
              background: stage % 2 === 1 ? 'var(--color-BG-ALT)' : 'transparent'
            }"
          >
            <span>
              {{ stage === 0 ? avg_rank.toFixed(2) : "#" + maps?.[stage - 1]?.rank?.toLocaleString("EN-US") ?? "---" }}
            </span><br>
            <span>
              {{ stage === 0 ? avg_score.toLocaleString("EN-US") : maps?.[stage - 1]?.score?.toLocaleString("EN-US") ?? "---" }}
            </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 83px;
  background-color: var(--color-BG);
  align-items: center;
  box-sizing: border-box;
  display: flex;
}

.pfp {
  position: relative;
  width: 200px;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.bgGradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(25, 25, 25, 0) 0%, var(--color-BG) 100%);
}

.placement-box {
  position: relative;
  width: 334px;
  height: 100%;
}

.placement {
  z-index: 2;
  position: absolute;
  top: -2px;
  right: 0;
  font-size: 64px;
}

.flag {
  width: 72px;
  height: 50px;
  margin-left: 28px;
  align-self: center;
}

.nick {
  margin-left: 28px;
  font-size: 36px;
  align-self: center
}

.table {
  border: none;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0;
  padding: 0;
  margin-left: auto;
}

.table-header,
.table-data {
  width: 120px;
  text-align: center;
  overflow: hidden;
  vertical-align: middle;
  padding: 0;
}

.table-header {
  height: 25px;
  font-size: 18px;
  line-height: 25px;
  padding: 0;
}

.table-data {
  height: 58px;
  line-height: 18px;
}

.table-data > span:first-child {
  font-family: "Zen Maru Gothic";
  font-weight: 900;
  font-size: 32px;
  color: #FFE17B;
}

.table-data > span:last-child {
  font-size: 20px;
}
</style>

<script setup>
  import { convertOrdinalNumber, cssUrl, rootUrl } from "@/assets/utils";
  import { computed, ref, watchEffect } from "vue";

  const playerDetails = ref(null);

  const props = defineProps({
    id: Number,
    placement: Number,
    nick: String,
    flag: String,
    avg_rank: Number,
    avg_score: Number,
    maps: Object
  });
/*
  watchEffect(async () => {
    if (!props.id) return;
    const response = await fetch(`${rootUrl}/api/osu/user?id=${props.id}`);
    playerDetails.value = await response.json();
  });
*/
</script>