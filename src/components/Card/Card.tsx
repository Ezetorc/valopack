import React from "react";
import useSettings from "../../hooks/useSettings";
import { Role } from "../../types/Role";
import "./Card.css";

interface CardProps {
  name: string;
  role: Role;
  image: string;
  level: number;
}

function Card({ name, role, image, level }: CardProps) {
  const { texts } = useSettings();

  return (
    <div className="card">
      <div className="card__bg" />
      <img src={image} alt="Agent Image" />
      <div className="card__info">
        <span>{name}</span>
        <span>{texts[role]}</span>
      </div>
      <span className="card__level">Level: {level}</span>
    </div>
  );
}

export default React.memo(Card);
