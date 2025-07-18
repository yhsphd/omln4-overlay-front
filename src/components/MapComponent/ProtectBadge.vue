<template>
  <div class="master-protect-badge">
    <img :src="team ? badgeImage_r : badgeImage_b" />
  </div>
</template>

<style scoped>
img {
  height: 90px;
}
</style>

<script setup>
import badgeImage_r from "@/assets/img/map/protect_r.png";
import badgeImage_b from "@/assets/img/map/protect_b.png";

defineProps({
  team: Boolean, // true: red, false: blue
});
</script>
