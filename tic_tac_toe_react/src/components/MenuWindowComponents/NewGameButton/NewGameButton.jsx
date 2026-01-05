import styles from "./NewGameButton.module.css";
import clsx from "clsx";

export default function NewGameButton({ vsCpu, children, onGameStart }) {
  return (
    <button
      className={clsx(styles.newGameBtn, {
        [styles.newGameBtnCpu]: vsCpu,
        [styles.newGameBtnPlayer]: !vsCpu,
      })}
      data-cy="btn-new-game-cpu"
      onClick={onGameStart}
    >
      <p className="heading-s">{children}</p>
    </button>
  );
}
