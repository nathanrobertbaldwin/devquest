import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EquipmentCard from "../EquipmentCard";
import "./AllEquipment.css";
import { useEffect } from "react";
import { getGameDataThunk } from "../../store/gamedata";
const _ = require("lodash");

export default function AllEquipment() {
  const dispatch = useDispatch();
  const equipmentData = useSelector((store) => store.gamedata.equipmentArr);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function wrapper() {
      if (_.isEmpty(equipmentData)) {
        dispatch(getGameDataThunk()).then(() => setIsLoaded(true));
      } else {
        setIsLoaded(true);
      }
    }
    wrapper();
  }, [dispatch, equipmentData]);

  if (!isLoaded) return <></>;
  return (
    <div id="all-equipment-container">
      {equipmentData.map((item, idx) => {
        return <EquipmentCard key={idx} item={item} />;
      })}
    </div>
  );
}
