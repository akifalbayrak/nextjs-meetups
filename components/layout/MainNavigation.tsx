import { useState, MouseEventHandler } from "react";
import Link from "next/link";
import classes from "./MainNavigation.module.css";

import { usePathname } from "next/navigation";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useTranslation } from "react-i18next";

function MainNavigation() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenuHandler: MouseEventHandler<HTMLAnchorElement | HTMLDivElement> = () => {
    setMenuOpen(false);
  };

  return (
    <header className={classes.header}>
      <Link href="/" onClick={closeMenuHandler} className={classes.logo}>
        <img src="/meetup.png" alt={t("logoAlt")} className={classes.logoImage} />
      </Link>

      <button
        className={`${classes.menuToggle} ${menuOpen ? classes.open : ""}`}
        onClick={toggleMenuHandler}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
      >
        <span className={classes.hamburger}></span>
      </button>

      <ul
        id="primary-navigation"
        className={`${classes.navList} ${menuOpen ? classes.open : ""}`}
      >
        <li className={classes.navItem}>
          <LanguageSwitcher />
        </li>
        <li className={classes.navItem}>
          <ThemeToggle />
        </li>
        <li className={classes.navItem}>
          <Link
            href="/"
            className={`${classes.navLink} ${pathname === "/" ? classes.active : ""}`}
            onClick={closeMenuHandler}
          >
            {t("nav.allMeetups")}
          </Link>
        </li>
        <li className={classes.navItem}>
          <Link
            href="/new-meetup"
            className={`${classes.navLink} ${
              pathname === "/new-meetup" ? classes.active : ""
            }`}
            onClick={closeMenuHandler}
          >
            {t("nav.addNewMeetup")}
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default MainNavigation;
