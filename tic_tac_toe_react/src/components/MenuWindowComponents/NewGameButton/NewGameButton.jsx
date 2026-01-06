import styles from "./NewGameButton.module.css";
import clsx from "clsx";

export default function NewGameButton({ vsCpu, children, onClick }) {
  return (
    <button
      className={clsx(styles.newGameBtn, {
        [styles.newGameBtnCpu]: vsCpu,
        [styles.newGameBtnPlayer]: !vsCpu,
      })}
      data-cy="btn-new-game-cpu"
      onClick={onClick}
    >
      <p className="heading-s">{children}</p>
    </button>
  );
}
