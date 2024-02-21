import styles from "./Slot.module.css";
import { useDrop } from "react-dnd";

const Slot = ({
  index,
  sigil,
  onRemoveSigil,
  onDropSigil,
  onSigilLevelAdjust,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "sigil",
    drop: (item) => onDropSigil(index, item.sigil),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const increaseLevel = (index) => {
    onSigilLevelAdjust(index, 1);
  };

  const decreaseLevel = (index) => {
    onSigilLevelAdjust(index, -1);
  };

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
            className="btn btn-secondary btn-sm"
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
              <div>{sigil.name}</div>
              <div>
                <div>T. Lvl {sigil.level}</div>
                {sigil.baseLevel < sigil.level && (
                  <button
                    className="btn btn-light btn-sm"
                    onClick={() => decreaseLevel(index)}
                  >
                    -
                  </button>
                )}
                {sigil.maxLevel > sigil.level && (
                  <button
                    className="btn btn-light btn-sm"
                    onClick={() => increaseLevel(index)}
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Slot;
