import { writable } from "svelte/store";

export const createStore = (manifest) => {
  // split these to re-render separately
  const partsSettings = writable({
    "0_bg": "1",
    "1_face": "1",
    "2_clothes": "1",
    "3_mouth": "1",
    "4_eyes": "1",
    "5_beard": null,
    "6_eyebrows": "1",
    "7_hair": "1",
    "8_item": null,
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
    colorsSettings.update((state) => {
      state[partsName][colorId] = color;
      return { ...state };
    });
  };

  return {
    // states
    partsSettings,
    colorsSettings,

    // actions
    setItem,
    setColor,
  };
};
