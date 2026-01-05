import styles from "./GameField.module.css";
import clsx from "clsx";

export default function GameField() {
  return (
    <button id="x1" className={clsx(styles.gameField, styles.empty)}></button>
  );
}
