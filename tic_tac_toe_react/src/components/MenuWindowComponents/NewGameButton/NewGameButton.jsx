import styles from "./NewGameButton.module.css";
import clsx from "clsx";

export default function NewGameButton({ vsCpu, children }) {
  return (
    <button
      className={clsx(styles.newGameBtn, {
        [styles.newGameBtnCpu]: vsCpu,
        [styles.newGameBtnPlayer]: !vsCpu,
      })}
      data-cy="btn-new-game-cpu"
    >
      <p className="heading-s">{children}</p>
    </button>
  );
}
