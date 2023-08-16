import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameDataThunk } from "../../store/gamedata";
import MonstersCard from "../MonsterCard";
import "./AllMonsters.css";
const _ = require("lodash");

export default function AllMonsters() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const monstersData = useSelector(
    (store) => store.gamedata.monsterTemplatesArr
  );

  useEffect(() => {
    async function wrapper() {
      if (_.isEmpty(monstersData)) {
        dispatch(getGameDataThunk()).then(() => setIsLoaded(true));
      } else {
        setIsLoaded(true);
      }
    }
    wrapper();
  }, [dispatch]);

  if (!isLoaded) return <></>;

  return (
    <div id="all-monsters-container">
      {monstersData.map((monster, idx) => {
        return <MonstersCard key={idx} monster={monster} />;
      })}
    </div>
  );
}
