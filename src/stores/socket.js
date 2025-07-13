import { deepMerge, rootUrl } from "@/assets/utils.js";
import { ref } from "vue";
import { io } from "socket.io-client";
import { defineStore } from "pinia";

const URL = rootUrl + "/update";

export const socket = io(URL);

export const useOverlayDataStore = defineStore("overlayData", () => {
  const connected = ref(false);
  const data = ref({});

  function bindEvents() {
    socket.on("connect", () => {
      connected.value = true;
    });
    socket.on("disconnect", () => {
      connected.value = false;
    });
    socket.on("update", (res) => {
      // Update existing object without replacing it
      deepMerge(data.value, res);
    });
  }

  function sendEvent(name, value) {
    socket.emit(name, value);
  }

  function sendControlEvent(type, data) {
    sendEvent("control", { type, data });
  }

  function connect() {
    socket.connect();
  }

  function getURI() {
    return socket.io.uri;
  }

  function reconnectTo(url) {
    socket.io.uri = url + "/update";
    socket.disconnect().connect();
  }

  return {
    connected,
    data,
    bindEvents,
    sendEvent,
    sendControlEvent,
    connect,
    getURI,
    reconnectTo,
  };
});
