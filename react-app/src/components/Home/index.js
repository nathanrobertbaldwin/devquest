import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameDataThunk } from "../../store/gamedata";
import { getUserDataThunk } from "../../store/userdata";

export default function Home() {
  const gameData = useSelector((store) => store.gamedata);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const [isGameDataLoaded, setIsGameDataLoaded] = useState(false);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

  useEffect(() => {
    if (!Object.values(gameData).length) {
      dispatch(getGameDataThunk()).then(() => {
        setIsGameDataLoaded(true);
      });
    }
  }, [dispatch, gameData]);

  useEffect(() => {
    if (user) {
      dispatch(getUserDataThunk()).then(() => {
        setIsUserDataLoaded(true);
      });
    }
  }, [dispatch, user]);

  return <div id="game_component_container">Main Game Component</div>;
}
