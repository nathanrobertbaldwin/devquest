import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CharacterAttackCard from "./CharacterAttackCard";
import MonsterCard from "./MonsterCard";
import { getCharacterDataThunk } from "../../store/character";
import { createNewMonsterThunk } from "../../store/monster";
import { updateMonsterHpThunk } from "../../store/monster";
import { getGameDataThunk } from "../../store/gamedata";
import { spendCharacterEnergyThunk } from "../../store/character";
import { udpateCharacterSanityThunk } from "../../store/character";
import "./GameStateCombat.css";
const _ = require("lodash");

export default function GameStateCombat() {
  const dispatch = useDispatch();

  const [stage, setStage] = useState(1);
  const [turnCounter, setTurnCounter] = useState(1);

  const char = useSelector((store) => store.character);
  const charAttacks = useSelector((store) => store.character.attacks);
  const inventory = useSelector((store) => store.character.inventory);

  const monstersArr = useSelector((store) => store.gamedata.monsterArr);
  const monster = useSelector((store) => store.monster);
  const monsterAttacksArr = useSelector(
    (store) => store.gamedata.monsterAttacksArr
  );

  const [combatLog, setCombatLog] = useState([]);

  useEffect(() => {
    if (_.isEmpty(char)) dispatch(getCharacterDataThunk(1));
    if (_.isEmpty(monster)) dispatch(createNewMonsterThunk(makeMonster(stage)));
  }, [dispatch]);

  useEffect(() => {
    let monsterAttackTimer = 0;
    if (turnCounter % 2 === 0) {
      monsterAttackTimer = setTimeout(handleMonsterAttack, 1000);
    }
    return () => clearTimeout(monsterAttackTimer);
  }, [turnCounter]);

  if (_.isEmpty(char) || _.isEmpty(monster)) return <></>;

  // Stage based logic.

  function handleStageChange(stage) {
    setStage(stage + 1);
    dispatch(createNewMonsterThunk(makeMonster(stage)));
    setCombatLog([`Oh no! Another problem appeared.`]);
    setTurnCounter(1);
  }

  function makeMonster(currStage) {
    const monster =
      monstersArr[Math.floor(Math.random() * monsterAttacksArr.length - 1)];
    monster.maxHp = Math.ceil(monster.hp * (currStage * 1.2));
    monster.currHp = monster.maxHp;
    return monster;
  }

  // Combat Logic: Character.

  function handleCharacterAttack(attack) {
    if (char.currSanity > 0 && turnCounter % 2 === 1) {
      const charDamage = calculateCharDamage(attack);
      dispatch(spendCharacterEnergyThunk(char.id, attack.energyCost));
      dispatch(updateMonsterHpThunk(charDamage));
      setTurnCounter(turnCounter + 1);
      if (monster.currHp <= charDamage) {
        setCombatLog([`You defeated the ${monster.name}!`, ...combatLog]);
        setTimeout(setCombatLog, 1000, [
          `Did you think you were finished? You might go insane, but bugs never cease!`,
        ]);
        setTimeout(handleStageChange, 3000, stage);
      }
    }
  }

  function calculateCharDamage(attack) {
    const randomizer = Math.random() + 1;
    if (attack.primaryStat === monster.weakness) {
      const charDamage = Math.floor(
        char[attack.primaryStat] + attack.power * randomizer * 2
      );
      setCombatLog([
        `Turn ${turnCounter}: It's super effective! You deal ${charDamage} logic Damage to the ${monster.name}.`,
        ...combatLog,
      ]);
      return charDamage;
    }
    const charDamage = Math.floor(
      char[attack.primaryStat] + attack.power * randomizer
    );
    setCombatLog([
      `Turn ${turnCounter}: You deal ${charDamage} logic Damage to the ${monster.name}.`,
      ...combatLog,
    ]);
    return charDamage;
  }

  // Combat Logic: Monster

  function handleMonsterAttack() {
    if (monster.currHp > 0) {
      const randomizer = Math.random() + 1;
      const monsterAttack =
        monsterAttacksArr[Math.floor(Math.random() * monsterAttacksArr.length)];
      const monsterDamage = Math.ceil(monsterAttack.power * randomizer);
      if (monsterDamage > char.currSanity) {
        console.log("You Lose!");
      } else {
        dispatch(udpateCharacterSanityThunk(char.id, monsterDamage));
        setCombatLog([
          `Turn ${turnCounter}: ${monster.name} uses ${monsterAttack.name}! You take ${monsterDamage} sanity damage. You are slowly losing your mind!`,
          ...combatLog,
          ,
        ]);
        setTurnCounter(turnCounter + 1);
      }
    }
  }

  // Character attributes

  const equippedGear = Object.values(inventory).find(
    (item) => item.equipped === true && item.slot === "gear"
  );

  const equippedFood = Object.values(inventory).find(
    (item) => item.equipped === true && item.slot === "food"
  );

  const equippedReference = Object.values(inventory).find(
    (item) => item.equipped === true && item.slot === "reference"
  );

  const algorithmsTotal =
    char.algorithms +
    (equippedGear ? equippedGear.algorithmsBoost : 0) +
    (equippedFood ? equippedFood.algorithmsBoost : 0) +
    (equippedReference ? equippedReference.algorithmsBoost : 0);

  const backendTotal =
    char.backend +
    (equippedGear ? equippedGear.backendBoost : 0) +
    (equippedFood ? equippedFood.backendBoost : 0) +
    (equippedReference ? equippedReference.backendBoost : 0);

  const frontendTotal =
    char.frontend +
    (equippedGear ? equippedGear.frontendBoost : 0) +
    (equippedFood ? equippedFood.frontendBoost : 0) +
    (equippedReference ? equippedReference.frontendBoost : 0);

  const cssTotal =
    char.css +
    (equippedGear ? equippedGear.cssBoost : 0) +
    (equippedFood ? equippedFood.cssBoost : 0) +
    (equippedReference ? equippedReference.cssBoost : 0);

  const debuggingTotal =
    char.debugging +
    (equippedGear ? equippedGear.debuggingBoost : 0) +
    (equippedFood ? equippedFood.debuggingBoost : 0) +
    (equippedReference ? equippedReference.debuggingBoost : 0);

  const energyTotal =
    char.maxEnergy +
    (equippedGear ? equippedGear.energyBoost : 0) +
    (equippedFood ? equippedFood.energyBoost : 0) +
    (equippedReference ? equippedReference.energyBoost : 0);

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
          <div className="equipped-item">{equippedGear?.imgUrl}</div>
          <div className="equipped-item">{equippedFood?.imgUrl}</div>
          <div className="equipped-item">{equippedReference?.imgUrl}</div>
        </div>
        <div id="character-attacks-container">
          {charAttacks.map((attack) => {
            return (
              <div
                key={attack.id}
                id="character-attack-container"
                onClick={() => handleCharacterAttack(attack)}
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
