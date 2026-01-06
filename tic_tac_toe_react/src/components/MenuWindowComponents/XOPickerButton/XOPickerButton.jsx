import styles from "./XOPickerButton.module.css";
import clsx from "clsx";

export default function XOPickerButton({
  player1Figure,
  onClick,
  selection,
  d,
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.picker, styles[selection], {
        [styles.pickerActive]: player1Figure,
      })}
    >
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        <path d={d} />
      </svg>
    </button>
  );
}
