import useSettings from "../../hooks/useSettings";
import { Language } from "../../types/Language";
import Modal from "../Modal/Modal";
import sounds from "../../constants/sounds";
import Select, { SingleValue, StylesConfig } from "react-select";
import "./Settings.css";

interface Option {
  value: string;
  label: string;
}

export default function Settings() {
  const { setSettingsOpen, texts, setLanguage, language } = useSettings();
  const options: Option[] = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
  ];

  const styles: StylesConfig<Option, false> = {
    control: (baseStyles) => ({
      ...baseStyles,
      cursor: "pointer",
      aspectRatio: "16 / 6",
      textAlign: "center",
      fontSize: "clamp(30px, 2vw, 50px)",
      fontFamily: "stroke",
      background: "var(--red-gradient)",
      border: "2px solid var(--main-color)",
      "&:hover": {
        borderColor: "#fff",
      },
    }),

    menu: (baseStyles) => ({
      ...baseStyles,
      background: "var(--red-gradient)",
      borderRadius: "5px",
      marginTop: "10px",
      display: "flex",
      flexDirection: "column",
    }),

    menuList: (baseStyles) => ({
      ...baseStyles,
      display: "flex",
      flexDirection: "column",
    }),

    option: (baseStyles, { isFocused, isSelected }) => ({
      ...baseStyles,
      padding: "10px 15px",
      textAlign: "center",
      backgroundColor: isFocused
        ? "rgba(255, 255, 255, 0.2)"
        : isSelected
        ? "rgba(255, 255, 255, 0.5)"
        : "transparent",
      cursor: "pointer",
      display: "block",
      width: "100%",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
      },
    }),

    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: "#fff",
    }),
  };

  const getValue = () => options.find((option) => option.value === language);

  const handleClose = () => {
    setSettingsOpen(false);
    sounds.click.play();
  };

  const handleChange = (selectedOption: SingleValue<Option>) => {
    const newLanguage = selectedOption?.value as Language;
    setLanguage(newLanguage);
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
          options={options}
          value={getValue()}
          onChange={handleChange}
          styles={styles}
          isClearable={false}
          isSearchable={false}
        />
      </div>
    </Modal>
  );
}
