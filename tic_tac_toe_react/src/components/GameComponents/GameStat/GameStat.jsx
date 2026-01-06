import clsx from "clsx";
import styles from "./GameStat.module.css";

export default function GameStat({ figure, label, score }) {
  return (
    <div className={clsx(styles.gameStat, styles[figure])}>
      <p className={clsx(styles.gameStatPlayer, "paragraph-text")}>
        {figure} {label && `(${label})`}
      </p>
      <p className="game-stat-score heading-m score-x" data-cy="x-score">
        {score}
      </p>
    </div>
  );
}
