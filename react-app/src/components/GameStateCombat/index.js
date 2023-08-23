import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useChangeGameState, useGameState } from "../../context/GameState";

import CharacterAttackCard from "./CharacterAttackCard";
import MonsterCard from "./MonsterCard";

import {
  deleteCharacterDataThunk,
  udpateCharacterSanityThunk,
  updateCharacterEnergyThunk,
  udpateCharacterStageThunk,
} from "../../store/character";

import {
  createNewMonsterThunk,
  updateMonsterHpThunk,
} from "../../store/monster";

import "../../styles/GameStateCombatv3.css";

const _ = require("lodash");

export default function GameStateCombat() {
  const dispatch = useDispatch();

  const toggleGameState = useChangeGameState();

  const char = useSelector((store) => store.character);
  const stage = useSelector((store) => store.character.stage);
  const charAttacks = useSelector((store) => store.character.attacks);
  const inventory = useSelector((store) => store.character.inventory);

  const currEnergy = useSelector((store) => store.character.currEnergy);
  const currSanity = useSelector((store) => store.character.currSanity);

  const monstersArr = useSelector(
    (store) => store.gamedata.monsterTemplatesArr
  );
  const monster = useSelector((store) => store.monster);
  const monsterAttacksArr = useSelector(
    (store) => store.gamedata.monsterAttacksArr
  );

  const [turnCounter, setTurnCounter] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [combatLog, setCombatLog] = useState([]);

  const [monsterIsLoaded, setMonsterIsLoaded] = useState(false);

  useEffect(() => {
    async function wrapper() {
      const monster = makeMonster(stage);
      await dispatch(createNewMonsterThunk(monster)).then(() =>
        setMonsterIsLoaded(true)
      );
    }
    wrapper();
  }, []);

  useEffect(() => {
    if (turnCounter % 2 === 0) {
      handleMonsterAttack(turnCounter);
    }
  }, [turnCounter]);

  // Stage based logic.

  async function handleStageChange(change) {
    const newStage = await dispatch(udpateCharacterStageThunk(char.id, change));
    if (newStage % 2 === 0) {
      toggleGameState("boon");
    } else {
      await dispatch(createNewMonsterThunk(makeMonster(newStage)));
      if (newStage === 10) {
        setCombatLog([`It's the last hurdle, the Capstone Project!`]);
      } else {
        setCombatLog([`Oh no! Another problem appeared.`]);
      }
      setTurnCounter(1);
    }
  }

  function makeMonster(currStage) {
    let monsterTemplate;

    if (currStage === 10) monsterTemplate = monstersArr[monstersArr.length - 1];
    else
      monsterTemplate =
        monstersArr[Math.floor(Math.random() * (monstersArr.length - 1))];

    const hp = Math.ceil(monsterTemplate.hp * (currStage * 0.1));

    const monster = {
      name: monsterTemplate["name"],
      character_id: char.id,
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
      if (attack.energyCost <= char.currEnergy) {
        setClicked(true);
        dispatch(updateCharacterEnergyThunk(char.id, attack.energyCost));
        const charDamage = calculateCharDamage(attack);
        dispatch(updateMonsterHpThunk(char.id, charDamage));
        if (monster.currHp <= charDamage) {
          if (stage === 10) {
            setCombatLog([
              `You deal ${charDamage} to ${monster.name}. You've defeated the Capstone Project!`,
            ]);
            setTimeout(toggleGameState, 2000, "win");
            return;
          } else {
            setCombatLog([
              `You deal ${charDamage} to ${monster.name}. You defeated the ${monster.name}!`,
              ...combatLog,
            ]);
            if (stage % 2 === 0) {
              setTimeout(setCombatLog, 2000, [
                `Did you think you were finished? You might go insane, but bugs never cease!`,
              ]);
            }
            setTimeout(handleStageChange, 3000, 1);
          }
        }
      } else {
        setCombatLog([
          `You are exhausted! You must rest. Escape this bug and lose 10 sanity?`,
          ...combatLog,
        ]);
      }
      setTimeout(setTurnCounter, 1500, turnCounter + 1);
    }
  }

  function calculateCharDamage(attack) {
    const randomizer = Math.random() + 1;
    if (attack.primaryStat === monster.weakness) {
      const charDamage = Math.floor(
        attackMapper[attack.primaryStat] + attack.power * randomizer * 2
      );
      setCombatLog([
        `Turn ${turnCounter}: It's super effective! You deal ${charDamage} logic Damage to the ${monster.name}.`,
        ...combatLog,
      ]);
      return charDamage;
    }
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
      if (monsterDamage >= char.currSanity) {
        setCombatLog([
          `You descend into madness. You lose! Deleting character data. Create a new character to try again.`,
          ...combatLog,
        ]);
        dispatch(udpateCharacterSanityThunk(char.id, monsterDamage));

        const charIdIntoDispatchCB = () => {
          return dispatch(deleteCharacterDataThunk(char.id));
        };

        setTimeout(toggleGameState, 2999, "loss");
        setTimeout(charIdIntoDispatchCB, 3000);
        return;
      }
      dispatch(udpateCharacterSanityThunk(char.id, monsterDamage));
      setCombatLog([
        `Turn ${turnCounter}: ${monster.name} uses ${monsterAttack.name}! You take ${monsterDamage} sanity damage. You are slowly losing your mind!`,
        ...combatLog,
      ]);
      setTurnCounter(turnCounter + 1);
    }
  }

  function handleEscapeCombat() {
    if (char.currSanity <= 10) {
      setCombatLog(
        ["If you avoid this bug, you will lose your mind. You cannot escape!"],
        ...combatLog
      );
    } else {
      setCombatLog([
        "You gave up defeating this problem! You lose 10 sanity. You take a moment to rest...",
        ...combatLog,
      ]);
      dispatch(udpateCharacterSanityThunk(char.id, 10));
      setTimeout(toggleGameState, 2000, "rest");
    }
  }

  // Character attributes

  if (!monster) return <div>Monster isn't loaded yet.</div>;

  const equippedGear = Object.values(inventory).find((item) => {
    return item.equipped === true && item.slot === "gear";
  });

  const equippedFood = Object.values(inventory).find((item) => {
    return item.equipped === true && item.slot === "food";
  });

  const equippedReference = Object.values(inventory).find((item) => {
    return item.equipped === true && item.slot === "equipment";
  });

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

  if (!monsterIsLoaded) return <></>;

  return (
    <div id="game-state-combat-container">
      <div id="gsc-character-container">
        <div id="gsc-combat-log-container">
          {combatLog.map((entry, idx) => {
            return (
              <div key={idx} className="combat-log-entry">
                <span>{entry}</span>
              </div>
            );
          })}
        </div>
        <div id="gsc-character-info-container">
          <div id="gsc-character-resources-container">
            <span className="gsc-cr-span">
              Energy: {currEnergy}/{char.maxEnergy}
            </span>
            <span className="gsc-cr-span">
              Sanity: {currSanity}/{char.maxSanity}
            </span>
          </div>
          <span>Attacks</span>
          <div id="gsc-character-attacks-container">
            {charAttacks.map((attack) => {
              return (
                <div
                  key={attack.id}
                  className="gsc-character-attack-wrapper"
                  onClick={() => handleCharacterAttack(attack)}
                >
                  <CharacterAttackCard key={attack.id} attack={attack} />
                </div>
              );
            })}
          </div>
          <div id="gsc-character-escape">
            <span className="gsc-cr-span">Lose 10 Sanity to </span>
            <button onClick={() => handleEscapeCombat()}>Escape Combat</button>
          </div>
        </div>
      </div>
      <div id="monster-container">
        <MonsterCard monster={monster} />
      </div>
    </div>
  );
}
