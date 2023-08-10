function ChosenAttackCard(key) {
  return (
    <div
      key={key}
      onClick={() => {
        if (attacksRemaining < 4) {
          console.log(chosenAttacks);
          setChosenAttacks(chosenAttacks.splice(idx, 1));
          setAttacksRemaining(attacksRemaining + 1);
        }
      }}
      className="character-creation-attack-card"
    >
      <span>idx: {idx}</span>
      <span>Name: {attack.name}</span>
      <span>Power: {attack.power}</span>
      <span>Energy Cost: {attack.energy_cost}</span>
      <span>Primary Stat: {attack.primary_stat}</span>
    </div>
  );
}

export default ChosenAttackCard;
