import React from "react";
import useSettings from "../../hooks/useSettings";
import { Language } from "../../types/Language";
import Modal from "../Modal/Modal";
import sounds from "../../constants/sounds";
import "./Settings.css";

export default function Settings() {
  const { setSettingsOpen, texts, setLanguage, language } = useSettings();

  const handleClose = () => {
    setSettingsOpen(false);
    sounds.click.play();
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage: Language = event.currentTarget.value as Language;
    setLanguage(newLanguage);
  };

  return (
    <Modal className="settings-modal">
      <header>
        <span>{texts.settings}</span>
        <button onClick={handleClose}>{texts.close}</button>
      </header>

      <div className="settings__language">
        <span>Language</span>
        <select onChange={handleChange} name="select-language" value={language}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </Modal>
  );
}
