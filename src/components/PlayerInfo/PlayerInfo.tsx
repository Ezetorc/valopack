import useSettings from "../../hooks/useSettings";
import Player from "../../interfaces/Player";
import Attribute from "../Attribute/Attribute";
import Modal from "../Modal/Modal";
import "./PlayerInfo.css";

interface PlayerInfoProps {
  player: Player;
  onClose: () => void;
}

export default function PlayerInfo({ player, onClose }: PlayerInfoProps) {
  const { texts } = useSettings();
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
        <Attribute text={texts.health} value={health} />
        <Attribute text={texts.attack} value={attack} />
        <Attribute text={texts.defense} value={defense} />
        <Attribute text={texts.speed} value={speed} />
        <Attribute text={texts.precision} value={precision} />
        <Attribute text={texts.critic} value={critic} />
        <Attribute text={texts.resistance} value={resistance} />
        <span>{texts.clickToDescriptions}</span>
      </article>
    </Modal>
  );
}
