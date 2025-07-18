<template>
  <div class="master-general-mappool-header">
    <img :src="roundImages[lang][round]" />
  </div>
</template>

<style scoped>
img {
  height: 128px;
}
</style>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  poolName: String,
});

const roundImages = Object.entries(
  import.meta.glob("@/assets/img/rounds_*/*.png", { eager: true, query: "?url", import: "default" })
)
  .map(([path, url]) => ({ path, url }))
  .reduce((acc, { path, url }) => {
    const match = path.match(/rounds_([a-zA-Z0-9]+)\/(.+)\.png$/);
    if (!match) return acc;

    const lang = match[1]; // e.g., 'cn', 'en'
    const name = match[2]; // e.g., 'f', 'quals'

    if (!acc[lang]) acc[lang] = {};
    acc[lang][name] = url;

    return acc;
  }, {});

const roundCodeToFileName = {
  Q: "quals",
  RO64: "ro64",
  RO32: "ro32",
  RO16: "ro16",
  QF: "qf",
  SF: "sf",
  F: "f",
  GF: "gf",
};

const lang = ref("cn");
const round = computed(() => roundCodeToFileName[props.poolName]);
</script>
