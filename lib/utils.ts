import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dayBackground = "bg-gradient-to-tr from-blue-500 to-yellow-500";
export const nightBackground = "bg-gradient-to-tr from-[#222223] to-[#3D3E40]";

export function formatDate(dt: number) {
  const date = new Date(dt * 1000);

  // Format the date
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return formattedDate.toString();
}
