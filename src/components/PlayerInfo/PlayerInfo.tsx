import Player from "../../classes/Player";
import useGame from "../../hooks/useGame";
import useSettings from "../../hooks/useSettings";
import Attribute from "../Attribute/Attribute";
import Modal from "../Modal/Modal";
import "./PlayerInfo.css";

interface PlayerInfoProps {
  onClose: () => void;
}

export default function PlayerInfo({ onClose }: PlayerInfoProps) {
  const { texts } = useSettings();
  const { selectedBox } = useGame();
  if (!selectedBox) return;
  const player = selectedBox as Player;
  const { name, portrait } = player.agent;
  const { team } = player;
  const { attack, health, defense, speed, precision, critic, resistance } =
    player.attributes;

  return (
    <Modal className="agent-info">
      <article className="agent-info__info">
        <button onClick={onClose}>{texts.close}</button>
        <span className="info__name">{name}</span>
        <span className="info__team">{team}</span>
        <img src={portrait} alt={`${name} Image`} />
      </article>

      <article className="agent-info__attributes">
        <Attribute text={texts.attributes.health} value={health} />
        <Attribute text={texts.attributes.attack} value={attack} />
        <Attribute text={texts.attributes.defense} value={defense} />
        <Attribute text={texts.attributes.speed} value={speed} />
        <Attribute text={texts.attributes.precision} value={precision} />
        <Attribute text={texts.attributes.critic} value={critic} />
        <Attribute text={texts.attributes.resistance} value={resistance} />
        <span>{texts.clickToDescriptions}</span>
      </article>
    </Modal>
  );
}
