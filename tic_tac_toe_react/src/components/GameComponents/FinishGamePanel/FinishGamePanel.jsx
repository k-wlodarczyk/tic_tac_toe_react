import FinishGamePanelBtn from "../FinishGamePanelBtn/FinishGamePanelBtn";
import styles from "./FinishGamePanel.module.css";
import clsx from "clsx";
import x from "../../../assets/icon-x.svg";
import o from "../../../assets/icon-o.svg";

export default function FinishGamePanel({
  primaryText,
  additionalText,
  ctaBtnContent,
  secondaryBtnContent,
  onCancel,
  onConfirm,
  winningFigure,
}) {
  return (
    <div className={styles.panelOverlay}>
      <div className={styles.finishGamePanel}>
        <p className={clsx("heading-xs", styles.additionalText)}>
          {additionalText}
        </p>
        <p className={clsx("heading-l", styles.primaryText)}>
          {winningFigure && (
            <img
              src={winningFigure === "x" ? x : o}
              alt="winning figure"
              className={styles.winningFigure}
            />
          )}

          {primaryText}
        </p>
        <div className={styles.btns}>
          <FinishGamePanelBtn type="secondary" onClick={onCancel}>
            {secondaryBtnContent}
          </FinishGamePanelBtn>
          <FinishGamePanelBtn type="primary" onClick={onConfirm}>
            {ctaBtnContent}
          </FinishGamePanelBtn>
        </div>
      </div>
    </div>
  );
}
