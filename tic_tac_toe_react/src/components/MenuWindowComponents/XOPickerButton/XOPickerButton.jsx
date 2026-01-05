import styles from "./XOPickerButton.module.css";
import clsx from "clsx";

export default function XOPickerButton({ active, onSelect, selection, d }) {
  return (
    <button
      onClick={onSelect}
      className={clsx(styles.picker, styles[selection], {
        [styles.pickerActive]: active,
      })}
    >
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        <path d={d} />
      </svg>
    </button>
  );
}
