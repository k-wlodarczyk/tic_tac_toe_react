import MenuWindow from "./components/MenuWindowComponents/MenuWindow/MenuWindow";
import Game from "./components/GameComponents/Game/Game";
import { useEffect, useState } from "react";
import FinishGamePanel from "./components/GameComponents/FinishGamePanel/FinishGamePanel";
import {
  checkWinner,
  isDraw,
  getEndGameProps,
  getLabel,
} from "./utils/gameLogic";
import { getIndexMove } from "./utils/cpuMove";

const EMPTY_BOARD = Array(9).fill(null);

function App() {
  const [player1Figure, setPlayer1Figure] = useState("x");
  const [gameStarted, setGameStarted] = useState(false);
  const [finishGamePanelActive, setFinishGamePanelActive] = useState(false);
  const [gameFields, setGameFields] = useState(EMPTY_BOARD);
  const [activePlayer, setActivePlayer] = useState("x");
  const [vsCpu, setVsCpu] = useState(null);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [tiesScore, setTiesScore] = useState(0);

  const winInfo = checkWinner(gameFields);
  const draw = isDraw(gameFields);

  const winner = winInfo ? winInfo.winner : null;
  const winningPath = winInfo ? winInfo.path : [];

  const playerXLabel = getLabel("x", player1Figure, vsCpu);
  const playerOLabel = getLabel("o", player1Figure, vsCpu);

  function changePlayer() {
    activePlayer === "x" ? setActivePlayer("o") : setActivePlayer("x");
  }

  function isCpuTurn() {
    return vsCpu && activePlayer !== player1Figure ? true : false;
  }

  function markField(index) {
    const nextFields = [...gameFields];
    nextFields[index] = activePlayer;
    setGameFields(nextFields);

    const currentWinner = checkWinner(nextFields);
    const currentDraw = isDraw(nextFields);

    if (currentWinner) {
      currentWinner.winner === "x"
        ? setXScore((prev) => prev + 1)
        : setOScore((prev) => prev + 1);
      return;
    }

    if (currentDraw) {
      setTiesScore((prev) => prev + 1);
      return;
    }

    changePlayer();
  }

  function handleFieldClick(index) {
    if (gameFields[index] || winner || isCpuTurn()) return;
    markField(index);
  }

  function handleStartGame(isVsCpu) {
    setGameStarted(true);
    setVsCpu(isVsCpu);
  }

  function handleResetGame() {
    setGameFields(EMPTY_BOARD);
    setPlayer1Figure("x");
    setActivePlayer("x");
    setGameStarted(false);
    setVsCpu(null);
    setFinishGamePanelActive(false);
    setXScore(0);
    setOScore(0);
    setTiesScore(0);
  }

  function handleNextRound() {
    setGameFields(EMPTY_BOARD);
    setFinishGamePanelActive(false);
    changePlayer();
  }

  const endGameProps = getEndGameProps(
    winner,
    draw,
    vsCpu,
    player1Figure,
    playerXLabel,
    playerOLabel
  );

  useEffect(() => {
    if (!vsCpu) return;

    if (isCpuTurn() && !winner && !draw) {
      const timeout = setTimeout(() => {
        markField(getIndexMove(gameFields, player1Figure));
      }, 600);
    }
  }, [activePlayer, vsCpu, winner, draw, gameFields]);

  return (
    <>
      {gameStarted ? (
        <Game
          onReset={() => setFinishGamePanelActive(true)}
          activePlayer={activePlayer}
          gameFields={gameFields}
          onFieldClick={handleFieldClick}
          player1Figure={player1Figure}
          playerXLabel={playerXLabel}
          playerOLabel={playerOLabel}
          vsCpu={vsCpu}
          xScore={xScore}
          oScore={oScore}
          tiesScore={tiesScore}
          winningPath={winningPath}
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
          {endGameProps && (
            <FinishGamePanel
              type="finish"
              additionalText={endGameProps.additionalText}
              primaryText={endGameProps.primaryText}
              ctaBtnContent="next round"
              secondaryBtnContent="quit"
              onCancel={handleResetGame}
              onConfirm={handleNextRound}
              winningFigure={winner}
            />
          )}
        </Game>
      ) : (
        <MenuWindow
          player1Figure={player1Figure}
          onPlayer1setX={() => setPlayer1Figure("x")}
          onPlayer1setO={() => setPlayer1Figure("o")}
          onGameStartVsCpu={() => handleStartGame(true)}
          onGameStartVsPlayer={() => handleStartGame(false)}
        />
      )}
    </>
  );
}

export default App;
