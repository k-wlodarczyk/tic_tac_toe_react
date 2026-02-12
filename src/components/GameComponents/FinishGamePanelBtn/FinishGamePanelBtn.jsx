import styles from "./FinishGamePanelBtn.module.css";
import clsx from "clsx";

export default function FinishGamePanelBtn({ type, children, onClick }) {
  return (
    <button
      className={clsx(styles.finishGamePanelBtn, {
        [styles.ctaBtn]: type === "primary",
        [styles.secondaryBtn]: type === "secondary",
      })}
      onClick={onClick}
      data-testid={type === "primary" ? "primary-btn" : "secondary-btn"}
    >
      {children}
    </button>
  );
}
