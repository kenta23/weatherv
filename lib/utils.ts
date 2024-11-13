import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function formatTime(t: number) {
  const unixTimestamp = t;

  // Convert seconds to milliseconds
  const date = new Date(unixTimestamp * 1000);

  // Format the time as HH:mm AM/PM
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;

  return formattedTime; // Example output: "03:31 PM"
}
