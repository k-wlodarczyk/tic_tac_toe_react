import clsx from "clsx";
import styles from "./GameStat.module.css";

export default function GameStat({
  figure,
  label,
  score,
  scoreTestId,
  labelTestId,
}) {
  return (
    <div className={clsx(styles.gameStat, styles[figure])}>
      <p
        className={clsx(styles.gameStatPlayer, "paragraph-text")}
        data-testid={labelTestId}
      >
        {figure} {label && `(${label})`}
      </p>
      <p className="game-stat-score heading-m" data-testid={scoreTestId}>
        {score}
      </p>
    </div>
  );
}
