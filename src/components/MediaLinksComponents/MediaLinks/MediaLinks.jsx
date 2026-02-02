import { Link } from "react-router-dom";
import styles from "./MediaLinks.module.css";
import clsx from "clsx";

export default function MediaLinks() {
  return (
    <div className={styles.mediaLinks}>
      <a
        className={clsx("heading-xs", styles.mediaLink)}
        href="https://github.com/k-wlodarczyk/tic_tac_toe_react"
        target="_blank"
      >
        Github
      </a>
      <Link to="/tests">
        <button className={clsx("heading-xs", styles.mediaLink)}>
          Test cases
        </button>
      </Link>
      <a
        className={clsx("heading-xs", styles.mediaLink)}
        href="/report/index.html"
        target="_blank"
      >
        Vitest report
      </a>
      <a
        className={clsx("heading-xs", styles.mediaLink)}
        href="https://github.com/k-wlodarczyk/tic_tac_toe_react"
        target="_blank"
      >
        Playwright report
      </a>
    </div>
  );
}
