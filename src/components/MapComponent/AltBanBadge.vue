<template>
  <div class="master-alt-ban-badge">
    <img :src="team ? badgeImage_r : badgeImage_b" />
  </div>
</template>

<style scoped>
img {
  height: 90px;
}
</style>

<script setup>
import badgeImage_r from "@/assets/img/map/ban_alt_r.png";
import badgeImage_b from "@/assets/img/map/ban_alt_b.png";

defineProps({
  team: Boolean, // true: red, false: blue
});
</script>
