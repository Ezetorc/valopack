import { ReactNode } from "react";
import "./SquareDisplay.css";

interface SquareDisplayProps {
  children: ReactNode;
  color: string;
}

export default function SquareDisplay({ children, color }: SquareDisplayProps) {
  return (
    <div className="square" style={{ backgroundColor: color }}>
      {children}
    </div>
  );
}
