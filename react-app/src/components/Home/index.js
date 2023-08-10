import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameDataThunk } from "../../store/gamedata";
import "./Home.css";

export default function Home() {
  const gameData = useSelector((store) => store.gamedata);
  const dispatch = useDispatch();
  const [isGameDataLoaded, setIsGameDataLoaded] = useState(false);

  useEffect(() => {
    if (!Object.values(gameData).length) {
      dispatch(getGameDataThunk()).then(() => {
        setIsGameDataLoaded(true);
      });
    }
  }, [dispatch, gameData]);

  if (!isGameDataLoaded) return <></>

  return <div id="game-component">Testing</div>;
}
