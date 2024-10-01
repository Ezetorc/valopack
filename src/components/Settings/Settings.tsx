import useSettings from "../../hooks/useSettings";
import { Language } from "../../types/Language";
import Modal from "../Modal/Modal";
import sounds from "../../constants/sounds";
import Select, { SingleValue, StylesConfig } from "react-select";
import "./Settings.css";

export default function Settings() {
  const { setSettingsOpen, texts, setLanguage, language } = useSettings();

  const handleClose = () => {
    setSettingsOpen(false);
    sounds.click.play();
  };

  const handleReactSelectChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    const newLanguage = selectedOption?.value as Language;
    setLanguage(newLanguage);
  };

  const options = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
  ];

  const customStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: (provided) => ({
      ...provided,
      cursor: "pointer",
      aspectRatio: "16 / 16", 
      textAlign: "center",
      fontSize: "clamp(30px, 2vw, 50px)",
      fontFamily: "stroke",
      background: "var(--red-gradient)",
      border: "2px solid var(--main-color)",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: state.isSelected
        ? "var(--main-color)"
        : provided.backgroundColor,
      "&:hover": {
        borderColor: "#fff",
      },
    }),
  };

  return (
    <Modal className="settings-modal">
      <header>
        <span>{texts.settings}</span>
        <button onClick={handleClose}>{texts.close}</button>
      </header>

      <div className="settings__language">
        <span>{texts.language}</span>

        <Select
          className="language-selector"
          name="select-language"
          options={options}
          value={options.find((option) => option.value === language)}
          onChange={handleReactSelectChange}
          styles={customStyles}
        />
      </div>
    </Modal>
  );
}
