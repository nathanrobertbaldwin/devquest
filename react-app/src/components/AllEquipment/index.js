import { useSelector } from "react-redux";
import EquipmentCard from "../EquipmentCard";
import "./AllEquipment.css";

export default function AllEquipment() {
  const equipmentData = useSelector((store) => store.gamedata.equipmentArr);
  return (
    <div id="all-equipment-container">
      {equipmentData.map((item, idx) => {
        return <EquipmentCard key={idx} item={item} />;
      })}
    </div>
  );
}
