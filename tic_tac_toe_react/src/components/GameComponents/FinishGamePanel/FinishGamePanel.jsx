import FinishGamePanelBtn from "../FinishGamePanelBtn/FinishGamePanelBtn";
import styles from "./FinishGamePanel.module.css";
import clsx from "clsx";

export default function FinishGamePanel({
  type,
  winner,
  primaryText,
  ctaBtnContent,
  secondaryBtnContent,
  onCancel,
  onConfirm,
}) {
  return (
    <div className={styles.finishGamePanel}>
      <p className={clsx("heading-l", styles.primaryText)}>{primaryText}</p>
      <div className={styles.btns}>
        <FinishGamePanelBtn type="secondary" onClick={onCancel}>
          {secondaryBtnContent}
        </FinishGamePanelBtn>
        <FinishGamePanelBtn type="primary" onClick={onConfirm}>
          {ctaBtnContent}
        </FinishGamePanelBtn>
      </div>
    </div>
  );
}
