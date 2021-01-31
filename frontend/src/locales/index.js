import { en } from "./en/translation";
import { vi } from "./vi/translation";

export const listLanguages = ["en", "vi"];
export const setLanguage = (lng) =>
  typeof window !== undefined
    ? window.localStorage.setItem("blog-language", lng)
    : null;

export const getLanguage = () => {
  if (typeof window !== "undefined") {
    const lang = window.localStorage.getItem("blog-language");
    if (!listLanguages.includes(lang)) {
      return "en";
    }
    return lang;
  }
  return null;
};

export default {
  en,
  vi,
};
