import { create } from "zustand";

type backgroundStateTypes = {
  background: {
    icon_name: string;
    time: string;
  };
  setBackground: (bg: string, time: string) => void;
};

const initialValue = {
  icon_name: "",
  time: "",
};

export const useWeatherBackground = create<backgroundStateTypes>((set) => {
  return {
    background: initialValue,
    setBackground: (bg, time) =>
      set({ background: { icon_name: bg, time: time } }),
  };
});

type locationStatesType = {
  location: {
    latitude: number;
    longitude: number;
  };
  setLocation: (location: { latitude: number; longitude: number }) => void;
};

const locationInitialValue = {
  latitude: 0,
  longitude: 0,
};
export const useLocation = create<locationStatesType>((set) => {
  return {
    location: locationInitialValue,
    setLocation: (location) => set({ location }),
  };
});
