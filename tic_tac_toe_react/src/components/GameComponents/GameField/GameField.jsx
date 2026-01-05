import styles from "./GameField.module.css";
import clsx from "clsx";
import x from "../../../assets/icon-x.svg";
import o from "../../../assets/icon-o.svg";

export default function GameField({ value, onSelect, activePlayer }) {
  return (
    <button
      className={clsx(styles.gameField, {
        [styles.empty]: !value,
        [styles.showPlaceholderX]: !value && activePlayer === "x",
        [styles.showPlaceholderO]: !value && activePlayer === "o",
      })}
      onClick={onSelect}
    >
      {value === "x" && <img src={x} alt="x" />}
      {value === "o" && <img src={o} alt="o" />}
    </button>
  );
}
