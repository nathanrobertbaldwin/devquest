import { useSelector } from "react-redux";
import EquipmentCard from "./EquipmentCard";
import "./AllEquipment.css";
const _ = require("lodash");

export default function AllEquipment() {
  const equipmentData = useSelector((store) => store.gamedata.equipmentArr);
  return (
    <div id="all-equipment-container">
      {equipmentData.map((item) => {
        return <EquipmentCard item={item} />;
      })}
    </div>
  );
}
