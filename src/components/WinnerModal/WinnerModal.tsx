import { Link } from "react-router-dom";
import useSettings from "../../hooks/useSettings";
import { Team } from "../../types/Team";
import Modal from "../Modal/Modal";
import { paths } from "../../constants/general";
import "./WinnerModal.css";
import useUser from "../../hooks/useUser";

interface WinnerModalProps {
  winner: Team | "draw" | undefined;
}

export default function WinnerModal({ winner }: WinnerModalProps) {
  const { texts } = useSettings();
  const { addCredits, removeCredits } = useUser();
  if (!winner) return;
  let creditsWinned = "";

  if (winner === "ally") {
    addCredits(1000);
    creditsWinned = "+1000";
  } else if (winner === "enemy") {
    removeCredits(500);
    creditsWinned = "-500";
  } else if (winner === "draw") {
    addCredits(500);
    creditsWinned = "+500";
  }

  return (
    <Modal className="winner-modal">
      <span className="winner-modal__winner">{texts.winner[winner]}</span>
      <span className="winner-modal__credits">{`${creditsWinned} ${texts.credits}`}</span>
      <Link to={paths.home}>{texts.home}</Link>
    </Modal>
  );
}
