import "./MonsterCard.css";

export default function MonsterCard({ monster }) {
  return (
    <>
      <div id="monster-card-container">
        <div id="monster-image-container">
          monster image here
          <img alt="monster" src="" />
        </div>
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
