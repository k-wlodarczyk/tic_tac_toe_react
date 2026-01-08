import styles from "./GameField.module.css";
import clsx from "clsx";
import x from "../../../assets/icon-x.svg";
import xWin from "../../../assets/icon-x-winning.svg";
import o from "../../../assets/icon-o.svg";
import oWin from "../../../assets/icon-o-winning.svg";

export default function GameField({
  value,
  onSelect,
  activePlayer,
  isCpuTurn,
  isWinningPathField,
}) {
  return (
    <button
      className={clsx(styles.gameField, {
        [styles.empty]: !value && !isCpuTurn,
        [styles.showPlaceholderX]: !value && !isCpuTurn && activePlayer === "x",
        [styles.showPlaceholderO]: !value && !isCpuTurn && activePlayer === "o",
        [styles.winningFieldX]: isWinningPathField && activePlayer === "x",
        [styles.winningFieldO]: isWinningPathField && activePlayer === "o",
      })}
      onClick={onSelect}
    >
      {value === "x" && <img src={isWinningPathField ? xWin : x} alt="x" />}
      {value === "o" && <img src={isWinningPathField ? oWin : o} alt="o" />}
    </button>
  );
}
