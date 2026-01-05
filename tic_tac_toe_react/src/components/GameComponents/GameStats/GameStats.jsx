import GameStat from "../GameStat/GameStat";
import styles from "./GameStats.module.css";
import clsx from "clsx";

export default function GameStats() {
  return (
    <div className={styles.gameStats}>
      <GameStat figure="x" />
      <GameStat figure="ties" />
      <GameStat figure="o" />
    </div>
  );
}
