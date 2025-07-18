<template>
  <div class="master-win-badge">
    <img :src="team ? badgeImage_r : badgeImage_b" />
  </div>
</template>

<style scoped>
img {
  height: 100px;
}
</style>

<script setup>
import badgeImage_r from "@/assets/img/map/win_r.png";
import badgeImage_b from "@/assets/img/map/win_b.png";

defineProps({
  team: Boolean, // true: red, false: blue
});
</script>
