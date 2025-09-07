import { computed, ref } from "vue";

// "undefined" means the URL will be computed from the `window.location` object
export const rootUrl = import.meta.env.PROD ? "" : "http://localhost:3000";

export function secondsToMMSS(seconds) {
  if (!seconds) return "00:00";
  return new Date(seconds * 1000).toISOString().substring(14, 19);
}

export function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export function teamName2color(overlayData, mode, name) {
  let names;

  if (mode === 0) {
    // Team Name
    names = [overlayData.teams[0].name, overlayData.teams[1].name];
  } else if (mode === 1) {
    // Team Acronym
    names = [overlayData.teams[0].acronym, overlayData.teams[1].acronym];
  }

  if (name === names[0]) {
    return "red";
  } else if (name === names[1]) {
    return "blue";
  }
  return "";
}

export function teamName2acronym(overlayData, name) {
  for (let i = 0; i < overlayData.teams.length; i++) {
    if (overlayData.teams[i].name === name) {
      return overlayData.teams[i].acronym;
    }
  }
  return "";
}

export function teamName2bool(overlayData, mode, name) {
  let names;

  if (mode === 0) {
    // Team Name
    names = [overlayData.teams[0].name, overlayData.teams[1].name];
  } else if (mode === 1) {
    // Team Acronym
    names = [overlayData.teams[0].acronym, overlayData.teams[1].acronym];
  }

  if (name === names[0]) {
    return true;
  } else if (name === names[1]) {
    return false;
  }
  return undefined;
}

export function getMappool(mappool, code) {
  if (!code) return {};
  const searchCode = /\d/.test(code) ? code : code + "1"; // TB -> TB1
  for (let i = 0; i < mappool.length; i++) {
    if (mappool[i].code === searchCode) {
      return mappool[i];
    }
  }
  return {};
}

export function rankDuplicate(arr) {
  const sorted = [...new Set(arr)].sort((a, b) => b - a);
  const rank = new Map(sorted.map((x, i) => [x, i + 1]));
  return arr.map((x) => rank.get(x));
}

export function splitCode(code) {
  try {
    const modMatch = code.match(/[a-zA-Z]+/g);
    const indexMatch = code.match(/\d+/g);
    if (!modMatch) return ["", 1];
    const mod = modMatch[0];
    const index = indexMatch ? parseInt(indexMatch[0]) : 1;
    return [mod, index];
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return ["", 1];
  }
}

export function deepMerge(target, source) {
  if (typeof target !== "object" || target === null) {
    // If the target is not an object or is null, replace it entirely
    return source;
  }

  if (Array.isArray(target) && Array.isArray(source)) {
    // For arrays, replace with the source array or implement custom merging logic if needed
    if (target.length <= source.length) {
      return [...source];
    }
    return source;
  }

  // Remove keys from the target that are not in the source
  for (const key of Object.keys(target)) {
    if (!(key in source)) {
      delete target[key];
    }
  }

  // Merge each key in the source into the target
  for (const key of Object.keys(source)) {
    if (typeof source[key] === "object" && source[key] !== null) {
      // Recursively merge objects
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      // Replace primitives and non-object values
      target[key] = source[key];
    }
  }

  return target;
}

export function toISOStringTimezoneOffset(dateVal) {
  if (typeof dateVal === "string") dateVal = new Date(dateVal);
  if (isNaN(dateVal)) return "";

  let timezoneOffset = dateVal.getTimezoneOffset();
  let timezoneDateString = new Date(dateVal - timezoneOffset * 60000).toISOString().slice(0, -5);

  return (
    timezoneDateString +
    (timezoneOffset == 0 ? "Z" : timezoneOffset > 0 ? "-" : "+") +
    secondsToMMSS(Math.abs(timezoneOffset))
  );
}

export function secondsLeft(dateVal) {
  if (typeof dateVal === "string") dateVal = new Date(dateVal);
  if (isNaN(dateVal)) return 0;

  return (dateVal - new Date()) / 1000;
}

export function osuPfpUrl(uid) {
  if (!uid) {
    return "/nopfp.png";
  }
  return "https://a.ppy.sh/" + uid;
}

export function intObjectToArray(obj) {
  if (!obj || Object.keys(obj).length === 0) {
    return [];
  }

  const elems = Math.max(...Object.keys(obj).map((x) => Number(x)));
  const res = new Array(elems + 1);

  for (const key of Object.keys(obj)) {
    res[parseInt(key)] = obj[key];
  }

  return res;
}

export class pageSwitcher {
  constructor(activePages, intervals) {
    this.intervals = ref(intervals);
    this.activePages = ref(activePages);
    this.currPageInd = ref(0);
    this.currPage = computed(() => this.activePages.value[this.currPageInd.value]);
    this.advancePageTimeout = ref();
  }

  init() {
    this.advancePageTimeout = setTimeout(() => this.advancePage(), this.intervals[0]);
  }

  advancePage() {
    this.currPageInd = (this.currPageInd + 1) % this.activePages.length;
    clearTimeout(this.advancePageTimeout);
    this.advancePageTimeout = setTimeout(
      () => this.advancePage(),
      this.intervals[this.currPageInd]
    );
  }
}

export const colors = {
  cslRed: "#cd2e3a",
  cslRedLight: "#d1564f",
  cslBlue: "#0047a0",
  cslBlueLight: "#6973b9",
};

export const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);

export const flipColor = (col) => {
  if (col === "red") return "blue";
  else if (col === "blue") return "red";
  return "";
};

export const numToTeamCol = (num) => {
  switch (num) {
    case 0:
      return "red";
    case 1:
      return "blue";
    default:
      return "";
  }
};

export const cssUrl = (url) => {
  if (!url) return "";
  return `url("${String(url).replace(/"/g, '\\"')}")`;
};

export const upcomingMatches = (overlayData, now, n) => {
  const matches = intObjectToArray(overlayData?.extended?.matches);
  if (!matches) return [];

  const currentBracket = overlayData?.bracket;
  const bo =
    intObjectToArray(overlayData?.brackets)?.find((b) => b.name === currentBracket)?.bo || "7";

  return matches
    .filter((match) => match.bracket === currentBracket)
    .filter((match) => {
      const matchDate = new Date(match.schedule);
      const result = intObjectToArray(match.result) || [0, 0];
      const targetScore = Math.ceil(parseInt(bo) / 2);

      // Include if -1 in result and future date
      if (result.includes(-1)) {
        return matchDate > now;
      }

      // Include if not reached target score yet
      const maxScore = Math.max(...result);
      return maxScore < targetScore;
    })
    .sort((a, b) => new Date(a.schedule) - new Date(b.schedule))
    .slice(0, n);
};

export const recentMatches = (overlayData, now, n) => {
  const matches = intObjectToArray(overlayData?.extended?.matches);
  if (!matches) return [];

  const currentBracket = overlayData?.bracket;
  const bo =
    intObjectToArray(overlayData?.brackets)?.find((b) => b.name === currentBracket)?.bo || "7";

  return matches
    .filter((match) => match.bracket === currentBracket)
    .filter((match) => {
      const matchDate = new Date(match.schedule);
      const result = intObjectToArray(match.result) || [0, 0];
      const targetScore = Math.ceil(parseInt(bo) / 2);

      const isFinishedByScore = Math.max(...result) >= targetScore;
      const isForfeitedAndPast = result.includes(-1) && matchDate <= now;

      return isFinishedByScore || isForfeitedAndPast;
    })
    .sort((a, b) => new Date(b.schedule) - new Date(a.schedule))
    .slice(0, n);
};

export const convertOrdinalNumber = (n) => {
  n = parseInt(n, 10);
  const suffix = ["th", "st", "nd", "rd"];
  const mod100 = n % 100;

  return n + (suffix[(mod100 - 20) % 10] || suffix[mod100] || suffix[0]);
};
