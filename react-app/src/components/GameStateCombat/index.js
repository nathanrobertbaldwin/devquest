import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CharacterAttackCard from "./CharacterAttackCard";
import MonsterCard from "./MonsterCard";
import { getCharacterDataThunk } from "../../store/character";
import { createNewMonsterThunk } from "../../store/monster";
import { updateMonsterHpThunk } from "../../store/monster";
import { spendCharacterEnergyThunk } from "../../store/character";
import "./GameStateCombat.css";
const _ = require("lodash");

export default function GameStateCombat() {
  const dispatch = useDispatch();

  const [stage, setStage] = useState(1);
  const [turnCounter, setTurnCounter] = useState(1);

  const char = useSelector((store) => store.character);
  const charAttacks = useSelector((store) => store.character.attacks);
  const charInventory = useSelector((store) => store.character.inventory);

  const monstersArr = useSelector((store) => store.gamedata.monsterArr);
  const [monsterIdx] = useState(Math.ceil(Math.random() * 15));
  const monsterAttacksArr = useSelector(
    (store) => store.gamedata.monsterAttacksArr
  );
  const monster = useSelector((store) => store.monster);

  const [combatLog, setCombatLog] = useState([]);

  console.log(stage);

  useEffect(() => {
    if (_.isEmpty(char)) {
      dispatch(getCharacterDataThunk(1));
      dispatch(createNewMonsterThunk(makeMonster(stage)));
    }
  }, [dispatch]);

  function handleStageChange() {
    setCombatLog([]);
    setStage(stage + 1);
    dispatch(makeMonster(stage));
  }

  function makeMonster(currStage) {
    const monster = monstersArr[monsterIdx];
    monster.maxHp = Math.ceil(monster.hp * (currStage * 1.2));
    monster.currHp = monster.maxHp;
    const monsterAttacks = [];
    for (let i = 0; i < 4; i++) {
      monsterAttacks.push(monsterAttacksArr[Math.ceil(Math.random() * 4)]);
    }
    monster.attacks = monsterAttacks;
    return monster;
  }

  function handleCharAttack(attack) {
    if (turnCounter % 2 === 1) {
      const damage = calculateDamage(attack);
      dispatch(spendCharacterEnergyThunk(attack.energyCost));
      dispatch(updateMonsterHpThunk(damage));
      if (monster.currHp <= damage) {
        setCombatLog([...combatLog, `You defeated the ${monster.name}!`]);
        setTimeout(setCombatLog, 2000, [
          ...combatLog,
          `Did you think you were finished? Time for more coding!`,
        ]);
        setTimeout(handleStageChange, 4000);
      }
    }
  }

  function calculateDamage(attack) {
    const randomizer = Math.random() + 1;
    if (attack.primaryStat === monster.weakness) {
      const damage = Math.floor(attack.power * randomizer * 2);
      setCombatLog([
        ...combatLog,
        `It's super effective! You deal ${damage} logic damage to the ${monster.name}.`,
      ]);
      return damage;
    }
    const damage = Math.floor(attack.power * randomizer);
    setCombatLog([
      ...combatLog,
      `You deal ${damage} logic damage to the ${monster.name}.`,
    ]);
    return damage;
  }

  if (_.isEmpty(char)) return <></>;

  return (
    <div id="game-state-combat-container">
      <div id="monster-container">
        <MonsterCard monster={monster} />
      </div>
      <div id="combat-log-container">
        <h5>Combat Log</h5>
        <div id="combat-log">
          {combatLog.map((entry, idx) => {
            return (
              <span key={idx} className="combat-log-entry">
                {entry}
              </span>
            );
          })}
        </div>
      </div>
      <div id="character-container">
        <div id="character-resources-image-container">
          <div id="character-resources-container">
            <span className="character-resources-span">
              Energy: {char.currEnergy}/{char.maxEnergy}
            </span>
            <span className="character-resources-span">
              Sanity: {char.currSanity}/{char.maxSanity}
            </span>
          </div>
          <div id="character-image-container">
            <img alt="character" src="" />
          </div>
        </div>
        <div id="equipped-items-container">
          <div className="equipped-item">Gear</div>
          <div className="equipped-item">Food</div>
          <div className="equipped-item">Ref</div>
        </div>
        <div id="character-attacks-container">
          {charAttacks.map((attack) => {
            return (
              <div
                key={attack.id}
                id="character-attack-container"
                onClick={() => handleCharAttack(attack)}
              >
                <CharacterAttackCard attack={attack} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
