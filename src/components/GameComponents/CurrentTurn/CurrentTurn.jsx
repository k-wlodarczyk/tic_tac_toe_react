import CurrentTurnIcon from "../CurrentTurnIcon/CurrentTurnIcon";
import styles from "./CurrentTurn.module.css";
import x from "../../../assets/icon-x.svg";
import o from "../../../assets/icon-o.svg";

export default function CurrentTurn({ activePlayer }) {
  return (
    <div className={styles.currentTurn}>
      {
        <img
          src={activePlayer === "x" ? x : o}
          alt="x turn"
          className={styles.currentTurnIcon}
        />
      }
      <p className="heading-xs">TURN</p>
    </div>
  );
}
