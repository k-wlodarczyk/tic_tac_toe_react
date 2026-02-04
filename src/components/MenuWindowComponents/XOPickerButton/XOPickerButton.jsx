import styles from "./XOPickerButton.module.css";
import x from "../../../assets/icon-x.svg";
import x_navy from "../../../assets/icon-x-winning.svg";
import o from "../../../assets/icon-o.svg";
import o_navy from "../../../assets/icon-o-winning.svg";
import clsx from "clsx";

export default function XOPickerButton({ player1Figure, onClick, selection }) {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.picker, styles[selection], {
        [styles.pickerActive]: player1Figure,
      })}
    >
      {selection === "x" && (
        <img
          src={player1Figure ? x_navy : x}
          alt="x"
          className={styles.pickerIcon}
        />
      )}
      {selection === "o" && (
        <img
          src={player1Figure ? o_navy : o}
          alt="o"
          className={styles.pickerIcon}
        />
      )}
    </button>
  );
}
