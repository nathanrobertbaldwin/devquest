import "./CharacterAttackCard.css";

export default function CharacterAttackCard({ attack }) {
  return (
    <div id="attack-card-container">
      <h5>{attack.name}</h5>
      <span className="attack-card-span">
        Energy Cost: {attack.energy_cost}
      </span>
      <span className="attack-card-span">Attack Power: {attack.power}</span>
      <span className="attack-card-span">
        Primary Stat: {attack.primary_stat}
      </span>
    </div>
  );
}
