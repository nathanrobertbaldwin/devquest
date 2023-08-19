import "../../../styles/CharacterAttackCard.css";

export default function CharacterAttackCard({ attack }) {
  return (
    <div className="gsc-character-attack-card">
      <span>{attack.name}</span>
      <span>Energy Cost: {attack.energyCost}</span>
      <span>Attack Power: {attack.power}</span>
      <span>Main Stat: {attack.primaryStat}</span>
    </div>
  );
}
