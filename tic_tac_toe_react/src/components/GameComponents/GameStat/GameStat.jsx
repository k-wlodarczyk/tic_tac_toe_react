import clsx from "clsx";
import styles from "./GameStat.module.css";

export default function GameStat({ figure }) {
  return (
    <div className={clsx(styles.gameStat, styles[figure])}>
      <p className={clsx(styles.gameStatPlayer, "paragraph-text")}>{figure}</p>
      <p className="game-stat-score heading-m score-x" data-cy="x-score">
        0
      </p>
    </div>
  );
}
