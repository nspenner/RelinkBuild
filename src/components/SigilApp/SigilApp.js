import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sigil from "../Sigil/Sigil";
import sigilData from "../../data/sigils.json";
import styles from "./SigilApp.module.css"

const SigilOption = ({ sigil }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "sigil",
    item: { sigil },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Sigil
      name={sigil.Name}
      trait={sigil.Trait}
      effect={sigil["Sigil Effect"]}
      innerRef={drag}
      style={{
        backgroundColor: "lightgray",
        width: "50px",
        height: "50px",
        margin: "5px",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    ></Sigil>
  );
};

const Slot = ({ index, sigil, onRemoveSigil, onDropSigil }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "sigil",
    drop: (item) => onDropSigil(index, item.sigil),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      className={styles.sigilSlot}
      ref={drop}
      style={{
        border: isOver ? "2px dashed black" : "2px solid black",
        margin: "5px",
        position: "relative",
      }}
    >
      {sigil && (
        <>
          <div
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              cursor: "pointer",
            }}
            onClick={() => onRemoveSigil(index)}
          >
            X
          </div>
          <div
            className={styles.sigilSlotActive}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <div className={styles.sigilSlotText}>
              <div>{sigil.Name}</div>
              <div>T. Level 6</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const SigilApp = () => {
  const [sigils, setSigils] = useState(new Array(12).fill(null));

  const handleDropSigil = (slotIndex, sigil) => {
    const newSigils = [...sigils];
    newSigils[slotIndex] = sigil;
    setSigils(newSigils);
  };

  const handleRemoveSigil = (slotIndex) => {
    const newSigils = [...sigils];
    newSigils[slotIndex] = null;
    setSigils(newSigils);
  };

  const handleSigilClick = () => {};

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
            />
          ))}
        </div>
        <div className={styles.sigilListContainer} style={{ display: "flex" }}>
          <h1>Sigil List</h1>
          {sigilData.map((sigil, index) => (
            <SigilOption key={index} sigil={sigil} onClick={handleSigilClick} />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default SigilApp;
