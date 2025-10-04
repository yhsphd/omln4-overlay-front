<template>
  <div class="master-overflow-text" ref="masterRef">
    <div class="content" ref="contentRef" :class="{ scroll: scrollNeeded, 'absolute-center-horizontal': !scrollNeeded }">
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
  position: relative;
  white-space: nowrap;
  width: fit-content;
  transition-property: transform;
  transition-timing-function: linear;
  transition-duration: 1s; /* move element with this property */
}

.scroll{
  transform: translateX(0); /* move element with this property */
}

.hidden{
  opacity: 0;
}
</style>

<script setup>
import { computed, nextTick, onMounted, ref, useTemplateRef } from "vue";

const props = defineProps({
  speed: { type: Number, default: 20 },
  wait: { type: Number, default: 5000 },
});

const masterRef = useTemplateRef("masterRef")
const contentRef = useTemplateRef("contentRef")

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
  setTimeout(() => {
    lenDiff.value = calcLenDiff();
    if (lenDiff.value > 0) {
      scrollNeeded.value = true;
      scroll();
    };
  }, 100);
});
</script>
