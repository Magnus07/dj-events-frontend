import Link from "next/link";
import Search from "./Search";
import styles from "../styles/Header.module.css";
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" legacyBehavior>
          <a>DJ Events</a>
        </Link>
      </div>
      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events" legacyBehavior>
              <a>Events</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
