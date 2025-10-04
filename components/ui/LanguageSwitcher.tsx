import { useState, useEffect, useRef, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

const currentLang = i18n.language.split("-")[0];
const currentLabel = currentLang === "tr" ? "Türkçe (TR)" : "English (EN)";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        onClick={() => setOpen(!open)}
        aria-label="Select language"
      >
        {currentLabel} <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <ul className={styles.dropdownList}>
          <li className={currentLang === "en" ? styles.selected : ""} onClick={() => changeLanguage("en")}>English (EN)</li>
          <li className={currentLang === "tr" ? styles.selected : ""} onClick={() => changeLanguage("tr")}>Türkçe (TR)</li>
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;
