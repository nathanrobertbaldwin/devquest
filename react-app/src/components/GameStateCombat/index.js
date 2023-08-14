import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CharacterAttackCard from "./CharacterAttackCard";
import MonsterCard from "./MonsterCard";
import { getCharacterDataThunk } from "../../store/character";
import { createNewMonsterThunk } from "../../store/monster";
import { updateMonsterHpThunk } from "../../store/monster";
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
  const currEnergy = useSelector((store) => store.character.currEnergy);
  const currSanity = useSelector((store) => store.character.currSanity);

  const monstersArr = useSelector((store) => store.gamedata.monsterArr);
  const monster = useSelector((store) => store.monster);
  const monsterAttacksArr = useSelector(
    (store) => store.gamedata.monsterAttacksArr
  );

  const [clicked, setClicked] = useState(false);

  const [combatLog, setCombatLog] = useState([]);

  useEffect(() => {
    if (_.isEmpty(char)) dispatch(getCharacterDataThunk(1));
    if (_.isEmpty(monster)) dispatch(createNewMonsterThunk(makeMonster(stage)));
  }, [dispatch, char, monster, stage]);

  useEffect(() => {
    if (turnCounter % 2 === 0) {
      handleMonsterAttack(turnCounter);
    }
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
    const monsterTemplate =
      monstersArr[Math.floor(Math.random() * monstersArr.length) - 1];

    const hp = Math.ceil(monsterTemplate.hp * (currStage * 1.2));

    const monster = {
      name: monsterTemplate["name"],
      max_hp: hp,
      curr_hp: hp,
      weakness: monsterTemplate["weakness"],
      image_url: monsterTemplate["imageUrl"],
    };

    return monster;
  }

  // Combat Logic: Character.

  function handleCharacterAttack(attack) {
    if (char.currSanity > 0 && turnCounter % 2 === 1 && !clicked) {
      setClicked(true);
      dispatch(spendCharacterEnergyThunk(char.id, attack.energyCost));
      const charDamage = calculateCharDamage(attack);
      dispatch(updateMonsterHpThunk(charDamage));
      if (monster.currHp <= charDamage) {
        setCombatLog([`You defeated the ${monster.name}!`, ...combatLog]);
        setTimeout(setCombatLog, 2000, [
          `Did you think you were finished? You might go insane, but bugs never cease!`,
        ]);
        setTimeout(handleStageChange, 4000, stage);
      }
      setTimeout(setTurnCounter, 1500, turnCounter + 1);
    }
  }

  function calculateCharDamage(attack) {
    const randomizer = Math.random() + 1;
    if (attack.primaryStat === monster.weakness) {
      console.log(attack.primaryStat);
      console.log(attackMapper[attack.primaryStat]);
      const charDamage = Math.floor(
        attackMapper[attack.primaryStat] + attack.power * randomizer * 2
      );
      setCombatLog([
        `Turn ${turnCounter}: It's super effective! You deal ${charDamage} logic Damage to the ${monster.name}.`,
        ...combatLog,
      ]);
      return charDamage;
    }
    console.log(attackMapper[attack.primaryStat]);
    const charDamage = Math.floor(
      attackMapper[attack.primaryStat] + attack.power * randomizer
    );
    setCombatLog([
      `Turn ${turnCounter}: You deal ${charDamage} logic Damage to the ${monster.name}.`,
      ...combatLog,
    ]);
    return charDamage;
  }

  // Combat Logic: Monster

  function handleMonsterAttack(turnCounter) {
    setClicked(false);
    if (monster.currHp > 0) {
      const randomizer = Math.random() + 1;
      const monsterAttack =
        monsterAttacksArr[Math.floor(Math.random() * monsterAttacksArr.length)];
      const monsterDamage = Math.ceil(monsterAttack.power * randomizer);
      dispatch(udpateCharacterSanityThunk(char.id, monsterDamage));
      setCombatLog([
        `Turn ${turnCounter}: ${monster.name} uses ${monsterAttack.name}! You take ${monsterDamage} sanity damage. You are slowly losing your mind!`,
        ...combatLog,
      ]);
      setTurnCounter(turnCounter + 1);
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

  const attackMapper = {
    algorithms: algorithmsTotal,
    backend: backendTotal,
    frontend: frontendTotal,
    css: cssTotal,
    debugging: debuggingTotal,
  };

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
              Energy: {currEnergy}/{char.maxEnergy}
            </span>
            <span className="character-resources-span">
              Sanity: {currSanity}/{char.maxSanity}
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