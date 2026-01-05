import MenuWindow from "./components/MenuWindowComponents/MenuWindow/MenuWindow";
import Game from "./components/GameComponents/Game/Game";
import { useState } from "react";

function App() {
  const [player1Figure, setPlayer1Figure] = useState("x");
  const [gameStarted, setGameStarted] = useState(false);

  function handlePlayer1FigureChange() {
    if (player1Figure === "x") {
      setPlayer1Figure("o");
    } else {
      setPlayer1Figure("x");
    }
  }

  return (
    <>
      {gameStarted ? (
        <Game />
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
