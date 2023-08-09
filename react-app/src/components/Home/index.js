import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameDataThunk } from "../../store/gamedata";

export default function Home() {
  const gameData = useSelector((store) => store.gamedata);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!Object.values(gameData).length) {
      dispatch(getGameDataThunk())
    }
  }, [dispatch]);

  return <>Home Will Go Here</>;
}
