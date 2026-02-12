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
      <div className={styles.finishGamePanel} data-testid="finish-game-panel">
        <p
          className={clsx("heading-xs", styles.additionalText)}
          data-testid="finish-game-panel-additional-text"
        >
          {additionalText}
        </p>
        <p
          className={clsx("heading-l", styles.primaryText, {
            [styles.textWinsX]: winningFigure && winningFigure === "x",
            [styles.textWinsO]: winningFigure && winningFigure === "o",
          })}
          data-testid="finish-game-panel-primary-text"
        >
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
