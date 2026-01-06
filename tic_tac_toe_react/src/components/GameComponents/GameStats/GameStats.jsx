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
      <GameStat figure="x" label={playerXLabel} score={xScore} />
      <GameStat figure="ties" score={tiesScore} />
      <GameStat figure="o" label={playerOLabel} score={oScore} />
    </div>
  );
}
