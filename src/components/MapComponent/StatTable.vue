<template>
  <div class="master-stat-table">
    <table>
      <tbody>
        <tr>
          <td>
            <div class="statKey">SR</div>
          </td>
          <td>
            <div class="statValue">
              {{ stats.sr.toFixed(2) }}<img class="star" :src="starImage" />
            </div>
          </td>
          <td>
            <div class="statKey">HP</div>
          </td>
          <td>
            <div class="statValue">{{ stats.hp.toFixed(2) }}</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="statKey">OD</div>
          </td>
          <td>
            <div class="statValue">{{ stats.od.toFixed(2) }}</div>
          </td>
          <td>
            <div class="statKey">DRAIN</div>
          </td>
          <td>
            <div class="statValue">{{ secondsToMMSS(stats.length / 1000) }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
tr > * {
  line-height: 12px;
}

.statKey {
  font-family: "Zen Maru Gothic";
  font-weight: 900;
  font-size: 8px;
}

.statValue {
  font-family: "Antihero";
  font-size: 16px;
  text-align: right;
  margin-right: 4px;
}

.star {
  height: 10px;
}
</style>

<script setup>
import starImage from "@/assets/img/map/star.png";
import { secondsToMMSS } from "@/assets/utils";

defineProps({
  stats: Object,
});
</script>
