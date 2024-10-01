import { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import SettingsContextType from "../interfaces/SettingsContextType";
import { Dictionary } from "../interfaces/Dictionary";
import { appName } from "../constants/general";
import { dictionaries } from "../constants/dictionaries";

export default function useSettings() {
  const context: SettingsContextType | undefined = useContext(SettingsContext);
  if (!context) throw new Error("Context doesn't have a Provider");

  const { language, headerVisible, setHeaderVisible } = context;
  const texts: Dictionary = dictionaries[language];

  const updateSection = (
    name: string,
    background: string,
    newHeaderVisible: boolean
  ): void => {
    document.title = `${appName}: ${name}`;

    if (headerVisible != newHeaderVisible) {
      setHeaderVisible(newHeaderVisible);
    }

    const htmlElement = document.documentElement;
    if (htmlElement) {
      htmlElement.style.background = background;
    }
  };

  return { ...context, texts, updateSection };
}
