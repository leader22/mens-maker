export const getInitialState = (manifest) => {
  const settings = {
    "1_face": {
      id: "1",
      colors: { ...manifest["1_face"]["1"] },
    },
    "2_clothes": {
      id: "1",
      colors: { ...manifest["2_clothes"]["1"] },
    },
    "3_mouth": {
      id: "1",
      colors: { ...manifest["3_mouth"]["1"] },
    },
    "4_eyes": {
      id: "1",
      colors: { ...manifest["4_eyes"]["1"] },
    },
    "5_beard": {
      id: "1",
      colors: { ...manifest["5_beard"]["1"] },
    },
    "6_eyebrows": {
      id: "1",
      colors: { ...manifest["6_eyebrows"]["1"] },
    },
    "7_hair": {
      id: "1",
      colors: { ...manifest["7_hair"]["1"] },
    },
    "8_item": {
      id: "1",
      colors: { ...manifest["8_item"]["1"] },
    },
  };

  return { settings };
};
