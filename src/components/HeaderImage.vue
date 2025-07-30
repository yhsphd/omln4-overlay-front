<template>
  <div class="master-header-image">
    <div class="wrapper" :style="{ backgroundImage: cssUrl(backgroundUrl) }">
      <div
        class="text zen-maru-gothic-bold absolute-center-horizontal"
        :style="{ bottom: textBottom[lang] }"
      >
        {{ text?.[lang] }}
      </div>
    </div>
  </div>
</template>

<style>
.wrapper {
  position: relative;
  width: 1000px;
  height: 128px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.text {
  font-size: 16px;
  text-align: center;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
</style>

<script setup>
import { cssUrl } from "@/assets/utils";
import { computed } from "vue";

const props = defineProps({
  lang: { type: String, default: "en" },
  img: String,
  text: Object,
});

const headerImages = Object.entries(
  import.meta.glob("@/assets/img/header/**/*.png", {
    eager: true,
    query: "?url",
    import: "default",
  })
)
  .map(([path, url]) => ({ path, url }))
  .reduce((acc, { path, url }) => {
    // Split path into segments and remove empty ones
    const segments = path.split("/").filter(Boolean);
    // Get language from the first folder after 'header'
    const headerIndex = segments.indexOf("header");
    if (headerIndex === -1) return acc;

    const lang = segments[headerIndex + 1];
    // Get the path segments after language folder
    const pathSegments = segments.slice(headerIndex + 2);
    const fileName = pathSegments.pop().replace(".png", "");

    if (!acc[lang]) acc[lang] = {};
    let current = acc[lang];

    // Create nested objects for each directory level
    for (const segment of pathSegments) {
      current[segment] = current[segment] || {};
      current = current[segment];
    }
    current[fileName] = url;

    return acc;
  }, {});

const backgroundUrl = computed(() => {
  let current = headerImages[props.lang];
  if (!current) return "";

  const segments = props.img.split("/");
  const fileName = segments.pop();

  for (const segment of segments) {
    current = current[segment];
    if (!current) return "";
  }

  return current[fileName];
});

const textBottom = {
  en: "16px",
  cn: "8px",
};
</script>
