import GameStat from "../GameStat/GameStat";
import styles from "./GameStats.module.css";

export default function GameStats({
  playerXLabel,
  playerOLabel,
  xScore,
  tiesScore,
  oScore,
}) {
  return (
    <div className={styles.gameStats}>
      <GameStat
        figure="x"
        label={playerXLabel}
        score={xScore}
        scoreTestId="x-score"
        labelTestId="x-label"
      />
      <GameStat
        figure="ties"
        score={tiesScore}
        scoreTestId="ties"
        labelTestId="ties-label"
      />
      <GameStat
        figure="o"
        label={playerOLabel}
        score={oScore}
        scoreTestId="o-score"
        labelTestId="o-label"
      />
    </div>
  );
}
