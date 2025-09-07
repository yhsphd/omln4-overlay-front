<template>
  <div class="master-showcase-progressing">
    <div class="horizontal-box">
      <div class="head">UP NEXT</div>
      <div
        class="map"
        v-for="(map, index) in mappool"
        :key="map.id"
        :class="{ 'bg-invisible': index > currentMapIndex }"
        :style="{
          borderColor: `var(--color-${splitCode(map.code)[0]})`,
          backgroundImage: `url('${map.background}')`,
        }"
      >
        <div v-if="map.original" class="bg-gradient"></div>
        <div class="bg-dimmer"></div>
        <div
          class="map-text antihero"
          :style="{
            color: `var(--color-${splitCode(map.code)[0]})`,
          }"
        >
          {{ map.code }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.head {
  width: 214px;
  height: 56px;
  font-size: 40px;
  background-color: var(--color-R);
  border-radius: 10px;
  text-align: center;
}

.map {
  position: relative;
  width: 50px;
  height: 50px;
  border-width: 3px;
  border-style: solid;
  border-radius: 10px;
  margin-left: 12px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.bg-dimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 7px;
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #999999, #333333);
  border-radius: 7px;
}

.map-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  text-shadow: 0px 0px 3px #000000, 0px 0px 3px #000000;
}

.bg-invisible {
  background-image: none !important;
  border-color: #333333 !important;
}

.bg-invisible .map-text {
  color: #333333 !important;
}
</style>

<script setup>
import { ref, nextTick, onMounted, watch, computed } from "vue";
import { intObjectToArray, splitCode } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";

const state = useOverlayDataStore();

const mappool = computed(() =>intObjectToArray(state.data?.mappool))

const currentmd5 = computed(() => {
  return state.data?.now_playing?.osu?.md5;
});
const currentMapIndex = ref(-1);

const checkMapIndex = () => {
  nextTick(() => {
    const foundIndex = mappool.value.findIndex((map) => map.md5 === currentmd5.value);
    if (currentMapIndex.value !== foundIndex) {
      currentMapIndex.value = foundIndex;
    }
  });
};

onMounted(() => {
  checkMapIndex();
});

watch(currentmd5, () => {
  checkMapIndex();
});

</script>
