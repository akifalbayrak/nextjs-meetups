import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const currentLabel = i18n.language === "tr" ? "Türkçe (TR)" : "English (EN)";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
          <li onClick={() => changeLanguage("en")}>English (EN)</li>
          <li onClick={() => changeLanguage("tr")}>Türkçe (TR)</li>
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;
