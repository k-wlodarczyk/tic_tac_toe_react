import XOPicker from "../XOPicker/XOPicker";
import styles from "./PickPlayerWindow.module.css";

export default function PickPlayerWindow({
  player1Figure,
  onPlayer1setX,
  onPlayer1setO,
}) {
  return (
    <div className={styles.pickPlayerWindow} data-cy="pick-player-window">
      <p className={`heading-xs ${styles.menuText}`}>PICK PLAYER 1'S MARK</p>
      <XOPicker
        player1Figure={player1Figure}
        onPlayer1setX={onPlayer1setX}
        onPlayer1setO={onPlayer1setO}
      />

      <p className="paragraph-text menuText menuTextReminder">
        REMEMBER : X GOES FIRST
      </p>
    </div>
  );
}
