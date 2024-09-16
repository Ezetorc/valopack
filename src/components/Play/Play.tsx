import { useEffect } from "react";
import { sectionsBg } from "../../constants/sectionsBg";
import useSettings from "../../hooks/useSettings";
import { Link } from "react-router-dom";
import { paths } from "../../constants/general";
import "./Play.css";

export default function Play() {
  const { texts, updateSection } = useSettings();

  useEffect(() => updateSection(texts.play, sectionsBg.play, true));

  return (
    <section className="play">
      <Link to={paths.game}>{texts.start}</Link>
    </section>
  );
}
