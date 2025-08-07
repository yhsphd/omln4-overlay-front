<template>
  <div class="master-chat-box" ref="masterElem">
    <!--Iteration-->
    <div v-for="item in chatData" :key="item">
      <div class="horizontal-box chat zen-maru-gothic-regular">
        <div class="timestamp">{{ formatTime(item[0]) }}</div>
        <div class="nick zen-maru-gothic-black" :style="{ color: nickCol(item[1]) }">
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
  font-size: 20px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.master-chat-box::-webkit-scrollbar {
  display: none;
}

.chat {
  margin-top: 8px;
}

.chat > * {
  line-height: 24px;
  margin: 0 4px 0 4px;
}

.timestamp {
  font-size: 16px;
}

.message {
  width: 0;
  flex-grow: 1;
}
</style>

<script setup>
import { intObjectToArray } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";
import { computed, onUpdated, ref } from "vue";

const state = useOverlayDataStore();

const chatData = computed(() => state.data.chat);
const formatTime = (time) => {
  const chatDate = new Date(time);
  return `${chatDate.getHours().toString().padStart(2, "0")}:${chatDate.getMinutes().toString().padStart(2, "0")}:${chatDate.getSeconds().toString().padStart(2, "0")}`;
};

const masterElem = ref(null);

const chatDataLen = ref(0);
onUpdated(() => {
  if (chatDataLen.value !== chatData.value.length) {
    chatDataLen.value = chatData.value.length;
    masterElem.value.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }
});

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
