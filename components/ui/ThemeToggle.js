import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../pages/context/ThemeContext";
import classes from "./ThemeToggle.module.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <button
      className={`${classes.toggle} ${theme === "dark" ? classes.dark : ""}`}
      onClick={toggleTheme}
      aria-label={t(
        theme === "light" ? "themeToggle.darkMode" : "themeToggle.lightMode"
      )}
      title={t(
        theme === "light" ? "themeToggle.darkMode" : "themeToggle.lightMode"
      )}
    >
      <span className={classes.icon}>{theme === "light" ? "🌙" : "☀️"}</span>
      <span className={classes.label}>
        {t(theme === "light" ? "themeToggle.darkMode" : "themeToggle.lightMode")}
      </span>
    </button>
  );
}

export default ThemeToggle;
