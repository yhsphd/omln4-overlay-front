<template>
  <div class="master-overflow-text" ref="masterRef">
    <div v-if="scrollNeeded" class="content" ref="contentRef">
      <slot></slot>
    </div>
    <div v-if="!scrollNeeded" class="noScroll">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.master-overflow-text {
  position: relative;
  overflow: hidden;
}

.content {
  position: absolute;
  white-space: nowrap;
  width: fit-content;
  transform: translateX(0); /* move element with this property */
  transition-property: transform;
  transition-timing-function: linear;
  transition-duration: 1s; /* move element with this property */
}
</style>

<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  speed: { type: Number, default: 20 },
  wait: { type: Number, default: 5000 },
});

const masterRef = ref();
const contentRef = ref();

const calcLenDiff = () => {
  if (!masterRef.value || !contentRef.value) return 0;
  return contentRef.value.clientWidth - masterRef.value.clientWidth;
};
const lenDiff = ref();
const scrollDuration = computed(() => lenDiff.value / props.speed);
const scrollNeeded = ref(false);

const scroll = () => {
  contentRef.value.style.transform = `translateX(-${lenDiff.value}px)`;
  contentRef.value.style.transitionDuration = scrollDuration.value + "s";
  setTimeout(
    () => {
      contentRef.value.style.transitionDuration = "0s";
      contentRef.value.style.transform = "translateX(0)";
      setTimeout(scroll, props.wait);
    },
    props.wait + scrollDuration.value * 1000
  );
};

onMounted(() => {
  lenDiff.value = calcLenDiff();
  if (lenDiff.value > 0) {
    scrollNeeded.value = true;
    scroll();
  }
});
</script>
