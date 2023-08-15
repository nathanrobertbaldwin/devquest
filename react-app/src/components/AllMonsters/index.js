import { useSelector } from "react-redux";
import MonstersCard from "../MonsterCard";
import "./AllMonsters.css";

export default function AllMonsters() {
  const monstersData = useSelector((store) => store.gamedata.monsterArr);
  console.log(monstersData);
  return (
    <div id="all-monsters-container">
      {monstersData.map((monster, idx) => {
        return <MonstersCard key={idx} monster={monster} />;
      })}
    </div>
  );
}
