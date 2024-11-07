import { create } from "zustand";

type backgroundStateTypes = {
  background: {
    desription: string;
    time: string;
  };
  setBackground: (bg: string, time: string) => void;
};

const initialValue = {
  desription: "clear sky",
  time: "day",
};

export const useWeatherBackground = create<backgroundStateTypes>((set) => {
  return {
    background: initialValue,
    setBackground: (bg, time) =>
      set({ background: { desription: bg, time: time } }),
  };
});
