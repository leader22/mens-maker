import { writable, get } from "svelte/store";

export const createStore = (manifest) => {
  // split these to re-render separately
  const partsSettings = writable({
    "0_bg": "1",
    "1_face": "1",
    "2_clothes": "1",
    "3_mouth": "1",
    "4_eyes": "1",
    "5_beard": "1",
    "6_eyebrows": "1",
    "7_hair": "1",
    "8_item": "1",
  });

  const colorsSettings = writable({
    "0_bg": { ...manifest["0_bg"]["1"] },
    "1_face": { ...manifest["1_face"]["1"] },
    "2_clothes": { ...manifest["2_clothes"]["1"] },
    "3_mouth": { ...manifest["3_mouth"]["1"] },
    "4_eyes": { ...manifest["4_eyes"]["1"] },
    "5_beard": { ...manifest["5_beard"]["1"] },
    "6_eyebrows": { ...manifest["6_eyebrows"]["1"] },
    "7_hair": { ...manifest["7_hair"]["1"] },
    "8_item": { ...manifest["8_item"]["1"] },
  });

  const setItem = (partsName, itemId) => {
    if (get(partsSettings)[partsName] === itemId) return;

    partsSettings.update((state) => {
      state[partsName] = itemId;
      return { ...state };
    });
    // reset to defaults
    colorsSettings.update((state) => {
      state[partsName] = itemId === null ? {} : manifest[partsName][itemId];
      return { ...state };
    });
  };

  const setColor = (partsName, colorId, color) => {
    if (get(colorsSettings)[partsName][colorId] === color) return;

    colorsSettings.update((state) => {
      state[partsName][colorId] = color;
      return { ...state };
    });
  };

  const svgContainer = { current: null };

  const finished = writable(false);
  const toggleFinish = () => finished.update(b => !b);

  return {
    // states
    partsSettings,
    colorsSettings,
    finished,

    // refs
    svgContainer,

    // actions
    setItem,
    setColor,
    toggleFinish,
  };
};
