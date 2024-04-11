import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function range(n: number) {
  return Array.from(Array(n).keys());
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function removeHyphen(str: string) {
  return str.replace(/-/, " ");
}

export function heightToMeters(height: number) {
  return height / 10;
}

export function weightToKilograms(weight: number) {
  return weight / 10;
}
