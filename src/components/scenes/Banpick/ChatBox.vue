<template>
  <div class="master-chat-box" ref="masterElem">
    <!--Iteration-->
    <div v-for="item in chatData" :key="item">
      <div class="horizontal-box chat zen-maru-gothic-regular">
        <div class="timestamp">&nbsp;{{ formatTime(item[0]) }}</div>
        <div class="nick dm-serif-display-regular" :style="{ color: nickCol(item[1]) }">
          {{ item[1] }}
        </div>
        <div class="cell message">{{ item[2] }}</div>
      </div>
    </div>
    <!---->
  </div>
</template>

<style scoped>
.master-chat-box {
  font-size: 22px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.master-chat-box::-webkit-scrollbar {
  display: none;
}

.chat {
  padding-bottom: 10px;
}

.chat > * {
  line-height: 22px;
  margin: 0 4px 0 4px;
}

.timestamp {
  font-size: 18px;
}

.message {
  width: 0;
  line-height: 18px;
  flex-grow: 1;
}
</style>

<script setup>
import { intObjectToArray } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";
import { computed, nextTick, ref, watch } from "vue";

const state = useOverlayDataStore();

const chatData = computed(() => state.data.chat);
const formatTime = (time) => {
  const chatDate = new Date(time);
  return `${chatDate.getHours().toString().padStart(2, "0")}:${chatDate.getMinutes().toString().padStart(2, "0")}:${chatDate.getSeconds().toString().padStart(2, "0")}`;
};

const masterElem = ref(null);

// Watch for changes in chat object keys length and scroll to bottom
watch(
  () => chatData.value ? Object.keys(chatData.value).length : 0,
  (newLength, oldLength) => {
    if (newLength && newLength > (oldLength || 0)) {
      nextTick(() => {
        if (masterElem.value?.lastElementChild) {
          masterElem.value.lastElementChild.scrollIntoView({ 
            behavior: "smooth",
            block: "end"
          });
        }
      });
    }
  }
);

const teamNicks = computed(() => {
  const teams = intObjectToArray(state.data?.teams);
  return teams.map((x) => intObjectToArray(x.players).map((y) => y.nick));
});

const nickCol = (nick) => {
  if (teamNicks.value?.[0]?.includes(nick)) {
    return "var(--color-R)";
  } else if (teamNicks.value?.[1]?.includes(nick)) {
    return "var(--color-B)";
  }
  return "var(--color-Y)"; // Fallback for referees and banchobot
};
</script>
