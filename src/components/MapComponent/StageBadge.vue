<template>
  <div class="master-stage-badge">
    <div class="badge dm-serif-display-regular"><slot></slot></div>
  </div>
</template>

<style scoped>
.badge {
  width: 80px;
  height: 100px;
  background-image: url("@/assets/img/map/stage.png");
  background-size: cover;
  font-size: 48px;
  box-sizing: border-box;
  padding-top: 25px;
  text-align: center;
}
</style>

<script setup></script>
