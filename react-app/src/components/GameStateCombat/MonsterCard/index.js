import "./MonsterCard.css";

export default function MonsterCard({ monster }) {
  return (
    <>
      <div id="monster-card-container">

          <img className="monster-image" alt="monster" src={monster.imageUrl} />

        <div id="monster-card-hp-bar">
          <span>
            HP: {monster.currHp} / {monster.maxHp}
          </span>
          <div id="monster-hp-bar"></div>
        </div>
      </div>
    </>
  );
}
