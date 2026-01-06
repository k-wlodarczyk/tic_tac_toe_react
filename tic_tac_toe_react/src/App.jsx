import MenuWindow from "./components/MenuWindowComponents/MenuWindow/MenuWindow";
import Game from "./components/GameComponents/Game/Game";
import { useState } from "react";
import FinishGamePanel from "./components/GameComponents/FinishGamePanel/FinishGamePanel";
import { checkWinner, isDraw } from "./utils/gameLogic";

function App() {
  const [player1Figure, setPlayer1Figure] = useState("x");
  const [gameStarted, setGameStarted] = useState(false);
  const [finishGamePanelActive, setFinishGamePanelActive] = useState(false);
  const [gameFields, setGameFields] = useState(Array(9).fill(null));
  const [activePlayer, setActivePlayer] = useState("x");

  const winner = checkWinner(gameFields);
  const draw = isDraw(gameFields);

  function handleFieldClick(index) {
    if (gameFields[index] || winner) return;
    const nextFields = [...gameFields];
    nextFields[index] = activePlayer;
    setGameFields(nextFields);

    activePlayer === "x" ? setActivePlayer("o") : setActivePlayer("x");
  }

  function handlePlayer1FigureChange() {
    if (player1Figure === "x") {
      setPlayer1Figure("o");
    } else {
      setPlayer1Figure("x");
    }
  }

  function handleResetGame() {
    setGameFields(Array(9).fill(null));
    setPlayer1Figure("x");
    setGameStarted(false);
    setFinishGamePanelActive(false);
  }

  return (
    <>
      {gameStarted ? (
        <Game
          onReset={() => setFinishGamePanelActive(true)}
          activePlayer={activePlayer}
          gameFields={gameFields}
          onFieldClick={handleFieldClick}
        >
          {finishGamePanelActive && (
            <FinishGamePanel
              type="restart"
              primaryText="restart game?"
              ctaBtnContent="yes, restart"
              secondaryBtnContent="no, cancel"
              onCancel={() => setFinishGamePanelActive(false)}
              onConfirm={handleResetGame}
            />
          )}
          {draw && <p>DRAAAW</p>}
        </Game>
      ) : (
        <MenuWindow
          player1Figure={player1Figure}
          onPlayer1FigureChange={handlePlayer1FigureChange}
          onGameStart={() => setGameStarted(true)}
        />
      )}
    </>
  );
}

export default App;
