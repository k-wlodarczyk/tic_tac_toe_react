function App() {
  return (
    <div>
      <section className="menu-window" data-cy="menu-window">
        <div className="logo-section">
          <img
            src="../assets/logo.svg"
            alt="Tic Tac Toe logo"
            className="logo-img"
          />
        </div>
        <div className="pick-player-window" data-cy="pick-player-window">
          <p className="heading-xs menu-text">PICK PLAYER 1'S MARK</p>
          <div className="xo-picker">
            <button className="picker x-picker active" data-cy="pick-x">
              <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            <button className="picker o-picker" data-cy="pick-o">
              <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" />
              </svg>
            </button>
          </div>
          <p className="paragraph-text menu-text menu-text-reminder">
            REMEMBER : X GOES FIRST
          </p>
        </div>
        <div className="btns-new-game-section" data-cy="btns-new-game-section">
          <button
            className="new-game-btn new-with-cpu"
            data-cy="btn-new-game-cpu"
          >
            <p className="heading-s">NEW GAME (VS CPU)</p>
          </button>
          <button
            className="new-game-btn new-with-player"
            data-cy="btn-new-game-player"
          >
            <p className="heading-s">NEW GAME (VS PLAYER)</p>
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
