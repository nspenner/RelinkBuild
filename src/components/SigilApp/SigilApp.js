import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Slot from "../Slot/Slot";
import SigilOption from "../SigilOption/SigilOption";
import TraitList from "../TraitList/TraitList";
import sigilData from "../../data/sigils.json";
import traitData from "../../data/traits.json";
import styles from "./SigilApp.module.css";



const SigilApp = () => {
  const [sigils, setSigils] = useState(new Array(12).fill(null));
  const [traits, setTraits] = useState([]);

  const handleDropSigil = (slotIndex, sigil) => {
    const newSigils = [...sigils];
    newSigils[slotIndex] = sigil;
    setSigils(newSigils);
    const newTraits = { ...traits };
    const trait = traitData.find((trait) => trait.Name === sigil.trait);
    // If no trait found, add trait and initial properties
    if (!Object.hasOwn(newTraits, sigil.trait)) {
      newTraits[sigil.trait] = {
        level: +sigil.level,
        description: trait["Description"],
        maxLevel: trait["Max Level"],
        levels: trait["Levels"]
      };
      // If a trait is found, add the sigil's current level to the existing level
    } else {
      newTraits[sigil.trait].level += +sigil.level;
    }
    // Set trait effect from traitData mapping
    const level = newTraits[sigil.trait].level;
    if (level >= trait.Levels.length) {
      newTraits[sigil.trait].effect =
        trait.Levels[trait.Levels.length - 1].Effect;
    } else {
      newTraits[sigil.trait].effect = trait.Levels[level - 1].Effect;
    }

    setTraits(newTraits);
  };

  const handleRemoveSigil = (slotIndex) => {
    const newSigils = [...sigils];
    const sigil = newSigils[slotIndex];
    newSigils[slotIndex] = null;
    setSigils(newSigils);

    const newTraits = { ...traits };
    // Grab trait from removed sigil and subtract the removed sigil's level
    const trait = traits[sigil.trait];
    trait.level = trait.level - +sigil.level;
    // If trait level is zero, remove trait entirely
    if (trait.level <= 0) {
      delete newTraits[sigil.trait];
    } else {
      if (trait.level < trait.maxLevel) {
        trait.effect = trait.levels[trait.level - 1]["Effect"];
      }
      newTraits[sigil.trait] = trait;
    }
    setTraits(newTraits);
  };

  const handleSigilClick = (sigil) => {
    const index = sigils.findIndex(value => value === null);
    handleDropSigil(index, sigil);
  };

  const handleSigilLevelAdjust = (slotIndex, value) => {
    const newSigils = [...sigils];
    const sigil = newSigils[slotIndex];
    sigil.level = sigil.level + value;
    newSigils[slotIndex] = sigil;
    setSigils(newSigils);

    const newTraits = { ...traits };
    const trait = traits[sigil.trait];
    trait.level = trait.level + value;
    if (trait.level <= trait.maxLevel) {
      trait.effect = trait.levels[trait.level - 1]["Effect"];
    }
    newTraits[sigil.trait] = trait;
    setTraits(newTraits);
  };

  const extractSigilData = (sigilData) => {
    return {
      name: sigilData.Name,
      trait: sigilData.Trait,
      effect: sigilData["Sigil Effect"],
      maxLevel: sigilData["Max Level"],
      baseLevel: sigilData["Base Level"],
      level: sigilData["Base Level"],
    };
  };

  return (
    <div className={styles.container}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.sigilSlotsContainer} style={{ display: "flex" }}>
          <h1>Equipped Sigils</h1>
          {sigils.map((sigil, index) => (
            <Slot
              key={index}
              index={index}
              sigil={sigil}
              onRemoveSigil={handleRemoveSigil}
              onDropSigil={handleDropSigil}
              onSigilLevelAdjust={handleSigilLevelAdjust}
            />
          ))}
        </div>
        <div className={styles.sigilListContainer} style={{ display: "flex" }}>
          <h1>Sigil List</h1>
          {sigilData.map((sigil, index) => (
            <SigilOption
              key={index}
              sigil={extractSigilData(sigil)}
              onSigilClick={handleSigilClick}
            />
          ))}
        </div>
      </DndProvider>
      <TraitList traits={traits}></TraitList>
    </div>
  );
};

export default SigilApp;
