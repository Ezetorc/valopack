import { teamColors } from "../../constants/general";
import useGame from "../../hooks/useGame";
import useSettings from "../../hooks/useSettings";
import Ability from "../../interfaces/Ability";
import Player from "../../interfaces/Player";
import Action from "../Action/Action";
import "./Actions.css";

interface ActionsProps {
  onOpenInfo: () => void;
}

export default function Actions({ onOpenInfo }: ActionsProps) {
  const { texts } = useSettings();
  const { selectedBox, setAction } = useGame();
  const selectedPlayer = selectedBox as Player;
  const { team } = selectedPlayer;
  const borderColor = teamColors[team];
  const { icon, name, abilities } = selectedPlayer.agent;
  const [ability0, ability1] = abilities;
  const isAvailable = (ability: Ability) => ability.usesLeft > 0;

  return (
    <footer className="game__actions">
      <img style={{ borderColor: borderColor }} src={icon} alt={name} />

      {team == "ally" && (
        <>
          <Action usesLeft={-1} onClick={() => setAction("move")}>
            {texts.actions.move}
          </Action>
          <Action usesLeft={-1} onClick={() => setAction("attack")}>
            {texts.actions.attack}
          </Action>
          <Action
            className={`available-${ability0 ? isAvailable(ability0) : ""}`}
            onClick={() => setAction("ability0")}
          >
            {ability0 ? ability0.name : ""}
          </Action>

          <Action
            className={`available-${ability1 ? isAvailable(ability1) : ""}`}
            onClick={() => setAction("ability1")}
          >
            {ability1 ? ability1.name : ""}
          </Action>
        </>
      )}

      <Action className="action info" onClick={onOpenInfo}>
        Info
      </Action>
    </footer>
  );
}
