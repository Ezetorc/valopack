import { teamColors } from "../../constants/general";
import useGame from "../../hooks/useGame";
import Player from "../../interfaces/Player";
import "./Actions.css";

interface ActionsProps {
  onOpenInfo: () => void;
}

export default function Actions({ onOpenInfo }: ActionsProps) {
  const { selectedBox, setAction } = useGame();
  const selectedPlayer = selectedBox as Player;
  const { team } = selectedPlayer;
  const borderColor = teamColors[team];
  const { icon, name, abilities } = selectedPlayer.agent;
  const [ability0, ability1] = abilities;

  return (
    <footer className="game__actions">
      <img style={{ borderColor: borderColor }} src={icon} alt={name} />

      {team == "ally" && (
        <>
          <button onClick={() => setAction("move")}>Move</button>
          <button onClick={() => setAction("attack")}>Attack</button>
          <button
            className={`available-${ability0 ? ability0.available : ""}`}
            onClick={() => setAction("ability0")}
          >
            {ability0 ? ability0.name : ""}
          </button>
          <button
            className={`available-${ability1 ? ability1.available : ""}`}
            onClick={() => setAction("ability1")}
          >
            {ability1 ? ability1.name : ""}
          </button>
        </>
      )}

      <button onClick={onOpenInfo}>Info</button>
    </footer>
  );
}
