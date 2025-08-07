<template>
  <div class="master-original-badge">
    <div class="wrapper">
      <div
        v-if="lang === 'en'"
        class="badge absolute-center en"
        :class="{ red: team, blue: !team }"
      >
        <img class="absolute-center" src="@/assets/img/showcase/original_en.png" />
      </div>
      <div
        v-if="lang === 'cn'"
        class="badge absolute-center cn"
        :class="{ red: team, blue: !team }"
      >
        <img class="absolute-center-horizontal" src="@/assets/img/showcase/original_cn.png" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 0;
  height: 0;
}

.badge.en {
  width: 275px;
  height: 175px;
}
.badge.cn {
  width: 250px;
  height: 250px;
}

.en > img {
  height: 140px;
}
.cn > img {
  height: 200px;
  top: 40px;
}

.red {
  background-color: var(--color-R);
}

.blue {
  background-color: #001e7d; /* Use darker blue for readability */
}
</style>

<script setup>
defineProps({
  team: Boolean,
  lang: { type: String, default: "en" },
});
</script>
