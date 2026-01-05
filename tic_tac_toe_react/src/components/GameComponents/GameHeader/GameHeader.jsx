import CurrentTurn from "../CurrentTurn/CurrentTurn";
import ResetGameBtn from "../ResetGameBtn/ResetGameBtn";
import logo from "../../../assets/logo.svg";

export default function GameHeader() {
  return (
    <section className="game-header-section">
      <img src={logo} alt="" className="logo-img" />
      <CurrentTurn />
      <ResetGameBtn />
    </section>
  );
}
