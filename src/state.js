export const getInitialState = (manifest) => {
  const settings = {
    face: {
      id: "1",
      colors: { ...manifest["face"].items["1"] },
    },
    clothes: {
      id: "1",
      colors: { ...manifest["clothes"].items["1"] },
    },
    mouth: {
      id: "1",
      colors: { ...manifest["mouth"].items["1"] },
    },
    eyes: {
      id: "1",
      colors: { ...manifest["eyes"].items["1"] },
    },
    beard: {
      id: "1",
      colors: { ...manifest["beard"].items["1"] },
    },
    eyebrows: {
      id: "1",
      colors: { ...manifest["eyebrows"].items["1"] },
    },
    hair: {
      id: "1",
      colors: { ...manifest["hair"].items["1"] },
    },
    item: {
      id: "1",
      colors: { ...manifest["item"].items["1"] },
    },
  };

  return { settings };
};
