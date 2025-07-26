<template>
  <div class="master-stat-table-showcase">
    <table>
      <tbody>
        <tr>
          <td class="statKey">
            <div>SR</div>
          </td>
          <td class="statValue">
            <div>
              {{ stats.sr.toFixed(2) }}<span><img class="star" :src="starImage" /></span>
            </div>
          </td>
          <td class="spacer"></td>
          <td class="statKey">
            <div>HP</div>
          </td>
          <td class="statValue">
            <div>{{ stats.hp.toFixed(2) }}</div>
          </td>
        </tr>
        <tr>
          <td class="statKey">
            <div>OD</div>
          </td>
          <td class="statValue">
            <div>{{ stats.od.toFixed(2) }}</div>
          </td>
          <td class="spacer"></td>
          <td class="statKey">
            <div>DRAIN</div>
          </td>
          <td class="statValue">
            <div>{{ secondsToMMSS(stats.length / 1000) }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.master-stat-table-showcase {
  width: 100%;
  box-sizing: border-box;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

tr > * {
  line-height: 30px;
  padding: 16px 18px;
}

.statKey {
  font-family: "Zen Maru Gothic";
  font-weight: 900;
  font-size: 32px;
  width: 10%;
  text-align: left;
}

.statValue {
  font-family: "Antihero";
  font-size: 64px;
  text-align: right;
  width: 35%;
  white-space: nowrap;
}

.star {
  height: 40px;
}

.spacer {
  width: 10%;
}
</style>

<script setup>
import starImage from "@/assets/img/map/star.png";
import { secondsToMMSS } from "@/assets/utils";

defineProps({
  stats: { type: Object, default: () => ({ sr: 0, hp: 0, od: 0, length: 0 }) },
});
</script>
