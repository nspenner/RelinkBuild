import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Fuse from "fuse.js";
import Slot from "../Slot/Slot";
import SigilOption from "../SigilOption/SigilOption";
import TraitList from "../TraitList/TraitList";
import sigilData from "../../data/sigils.json";
import traitData from "../../data/traits.json";
import styles from "./SigilApp.module.css";

const SigilApp = () => {
  const sigilOptions = [...new Set(sigilData.map((sigil) => sigil.Trait))].map(
    (trait) => ({
      label: trait,
      value: trait
    })
  );

  const [sigils, setSigils] = useState(new Array(12).fill(null));
  const [traits, setTraits] = useState([]);
  const [filteredSigilData, setFilteredSigilData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fuse = new Fuse(sigilData, {
      keys: ["Name", "Trait"], // keys to search in each item
      threshold: 0.33,
    });
    const results = fuse.search(searchTerm);
    setFilteredSigilData(results.map((result) => result.item));
  }, [searchTerm]);

  const addTrait = (traitName, initialLevel) => {
    const newTraits = { ...traits };
    const trait = traitData.find((trait) => trait.Name === traitName);
    // If no trait found, add trait and initial properties
    if (!Object.hasOwn(newTraits, traitName)) {
      newTraits[traitName] = {
        level: +initialLevel,
        description: trait["Description"],
        maxLevel: trait["Max Level"],
        levels: trait["Levels"],
      };
      // If a trait is found, add the sigil's current level to the existing level
    } else {
      newTraits[traitName].level += +initialLevel;
    }
    // Set trait effect from traitData mapping
    const level = newTraits[traitName].level;
    if (level >= trait.Levels.length) {
      newTraits[traitName].effect =
        trait.Levels[trait.Levels.length - 1].Effect;
    } else {
      newTraits[traitName].effect = trait.Levels[level - 1].Effect;
    }

    setTraits(newTraits);
  };

  const adjustTraitLevel = (traitName, value) => {
    const newTraits = { ...traits };
    const trait = traits[traitName];
    trait.level = trait.level + value;
    if (trait.level <= 0) {
      delete newTraits[traitName];
    } else if (trait.level <= trait.maxLevel) {
      trait.effect = trait.levels[trait.level - 1]["Effect"];
      newTraits[traitName] = trait;
    }
    setTraits(newTraits);
  };

  //TODO: Think of a better way to name/handle this data model
  const adjustTraitLevels = (traitNames) => {
    const newTraits = { ...traits };
    traitNames.forEach((traitName) => {
      const trait = traits[traitName.name];
      trait.level = trait.level + traitName.value;
      if (trait.level <= 0) {
        debugger;
        delete newTraits[traitName.name];
      } else if (trait.level <= trait.maxLevel) {
        trait.effect = trait.levels[trait.level - 1]["Effect"];
        newTraits[traitName.name] = trait;
      }
    });
    setTraits(newTraits);
  };

  const handleDropSigil = (slotIndex, sigil) => {
    // Don't allow overwrites
    if (sigils[slotIndex] !== null) {
      return;
    }
    const newSigils = [...sigils];
    newSigils[slotIndex] = sigil;
    setSigils(newSigils);
    addTrait(sigil.trait, sigil.level);
  };

  const handleRemoveSigil = (slotIndex) => {
    const newSigils = [...sigils];
    const sigil = newSigils[slotIndex];
    newSigils[slotIndex] = null;
    setSigils(newSigils);
    const traitsToUpdate = [{ name: sigil.trait, value: -+sigil.level }];
    if (sigil.subtrait) {
      // TODO: Handle subtraits that match main trait
      traitsToUpdate.push({ name: sigil.subtrait, value: -+sigil.level });
    }
    adjustTraitLevels(traitsToUpdate);
  };

  const handleSigilClick = (sigil) => {
    const index = sigils.findIndex((value) => value === null);
    handleDropSigil(index, sigil);
  };

  const handleSigilLevelAdjust = (slotIndex, value) => {
    const newSigils = [...sigils];
    const sigil = newSigils[slotIndex];
    sigil.level = sigil.level + value;
    newSigils[slotIndex] = sigil;
    setSigils(newSigils);

    adjustTraitLevel(sigil.trait, value);
    if (sigil.subtrait) {
      adjustTraitLevel(sigil.subtrait, value);
    }
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectSubTrait = (index, selectedTrait) => {
    console.log(selectedTrait);
    const newSigils = [...sigils];
    // Remove old trait if subtrait changed
    if (
      newSigils[index].subtrait &&
      newSigils[index].subtrait !== selectedTrait
    ) {
      const newTraits = { ...traits };
      delete newTraits[newSigils[index].subtrait];
      setTraits(newTraits);
    }
    newSigils[index].subtrait = selectedTrait;
    setSigils(newSigils);
    addTrait(newSigils[index].subtrait, newSigils[index].level);
  };

  return (
    <div className={`container-fluid ${styles.container}`}>
      <div className="row" style={{ width: "100%" }}>
        <DndProvider backend={HTML5Backend}>
          <div
            className={`col-lg-3 ${styles.sigilSlotsContainer}`}
            style={{ display: "flex" }}
          >
            <h1>Equipped Sigils</h1>
            {sigils.map((sigil, index) => (
              <Slot
                key={index}
                index={index}
                sigil={sigil}
                onRemoveSigil={handleRemoveSigil}
                onDropSigil={handleDropSigil}
                onSigilLevelAdjust={handleSigilLevelAdjust}
                sigilOptions={sigilOptions}
                onSelectSubTrait={handleSelectSubTrait}
              />
            ))}
          </div>
          <div
            className={`col-lg-4 ${styles.sigilListContainer}`}
            style={{ display: "flex" }}
          >
            <h1>Sigil List</h1>

            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearch}
              />
            </div>
            {filteredSigilData.map((sigil, index) => (
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
    </div>
  );
};

export default SigilApp;
