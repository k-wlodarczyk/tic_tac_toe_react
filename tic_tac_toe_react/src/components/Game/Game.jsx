export default function Game() {
  return (
    <section className="game" data-cy="game">
      <section className="game-header-section">
        <img src="assets/logo.svg" alt="" className="logo-img" />
        <div className="turn-info">
          <svg
            width="32"
            height="32"
            xmlns="http://www.w3.org/2000/svg"
            className="x-turn-img"
          >
            <g transform="scale(0.4)">
              <path
                d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                fill="#31C3BD"
                fill-rule="evenodd"
              />
            </g>
          </svg>
          <svg
            width="32"
            height="32"
            xmlns="http://www.w3.org/2000/svg"
            className="o-turn-img"
          >
            <g transform="scale(0.4)">
              <path
                d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                fill="#F2B137"
              />
            </g>
          </svg>
          <p className="heading-xs">TURN</p>
        </div>
        <button className="reset-game-btn">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.524 0h-1.88a.476.476 0 0 0-.476.499l.159 3.284A9.81 9.81 0 0 0 9.835.317C4.415.317-.004 4.743 0 10.167.004 15.597 4.406 20 9.835 20a9.796 9.796 0 0 0 6.59-2.536.476.476 0 0 0 .019-.692l-1.348-1.349a.476.476 0 0 0-.65-.022 6.976 6.976 0 0 1-9.85-.63 6.987 6.987 0 0 1 .63-9.857 6.976 6.976 0 0 1 10.403 1.348l-4.027-.193a.476.476 0 0 0-.498.476v1.881c0 .263.213.476.476.476h7.944A.476.476 0 0 0 20 8.426V.476A.476.476 0 0 0 19.524 0Z"
              fill="#1F3641"
            />
          </svg>
        </button>
      </section>
      <section className="game-board">
        <div className="game-fields">
          <button
            id="x1"
            className="game-field game-field-x1 empty"
            data-cy="game-field f-x1"
          ></button>
          <button
            id="x2"
            className="game-field game-field-x2 empty"
            data-cy="game-field f-x2"
          ></button>
          <button
            id="x3"
            className="game-field game-field-x3 empty"
            data-cy="game-field f-x3"
          ></button>
          <button
            id="y1"
            className="game-field game-field-y1 empty"
            data-cy="game-field f-y1"
          ></button>
          <button
            id="y2"
            className="game-field game-field-y2 empty"
            data-cy="game-field f-y2"
          ></button>
          <button
            id="y3"
            className="game-field game-field-y3 empty"
            data-cy="game-field f-y3"
          ></button>
          <button
            id="z1"
            className="game-field game-field-z1 empty"
            data-cy="game-field f-z1"
          ></button>
          <button
            id="z2"
            className="game-field game-field-z2 empty"
            data-cy="game-field f-z2"
          ></button>
          <button
            id="z3"
            className="game-field game-field-z3 empty"
            data-cy="game-field f-z3"
          ></button>
        </div>
        <div className="game-stats">
          <div className="game-stat wins-x">
            <p
              className="game-stat-player game-stat-player-x paragraph-text"
              data-cy="x-label"
            ></p>
            <p className="game-stat-score heading-m score-x" data-cy="x-score">
              0
            </p>
          </div>
          <div className="game-stat ties">
            <p
              className="game-stat-player game-stat-player-ties paragraph-text"
              data-cy="ties-label"
            >
              TIES
            </p>
            <p
              className="game-stat-score heading-m score-ties"
              data-cy="ties-score"
            >
              0
            </p>
          </div>
          <div className="game-stat wins-o">
            <p
              className="game-stat-player game-stat-player-o paragraph-text"
              data-cy="o-label"
            ></p>
            <p className="game-stat-score heading-m score-o" data-cy="o-score">
              0
            </p>
          </div>
        </div>
        <section className="end-game-panel">
          <div className="end-decision-btns">
            <button className="end-decision-btn heading-xs end-decision-btn-quit">
              QUIT
            </button>
            <button className="end-decision-btn heading-xs end-decision-btn-next-round">
              NEXT ROUND
            </button>
          </div>
        </section>
        <section className="reset-game-panel">
          <div className="reset-game-btns">
            <button className="reset-game-btn-decision heading-xs reset-game-btn-decision-no">
              NO, CANCEL
            </button>
            <button className="reset-game-btn-decision heading-xs reset-game-btn-decision-yes">
              YES, RESTART
            </button>
          </div>
        </section>
      </section>
    </section>
  );
}
