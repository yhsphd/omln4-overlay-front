<template>
  <div
    class="scene master-oii-details-scene"
    :style="{
      backgroundImage: cssUrl(lang === 'en' ? oiiDetailsImage_en : oiiDetailsImage_cn),
    }"
  ></div>
</template>

<script setup>
import oiiDetailsImage_en from "@/assets/img/oiiDetails_en.png";
import oiiDetailsImage_cn from "@/assets/img/oiiDetails_cn.png";

import { useOverlayDataStore } from "@/stores/socket";
import { computed } from "vue";
import { cssUrl } from "@/assets/utils";

const state = useOverlayDataStore();
const lang = computed(() => state.data?.lang);
</script>
