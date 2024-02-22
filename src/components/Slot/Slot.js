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
        border: (isOver && !sigil) ? "2px dashed black" : "2px solid black",
        margin: "5px",
        position: "relative",
      }}
    >
      {sigil && (
        <>
          <div
            className={styles.sigilSlotActive}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <div className={styles.sigilSlotText}>
              <div
                className={`btn btn-secondary btn-sm ${styles.sigilSlotCloseButton}`}
                onClick={() => onRemoveSigil(index)}
              >
                X
              </div>
              <div className={styles.sigilSlotButtons}>
                <button
                  className="btn btn-light btn-sm"
                  disabled={sigil.baseLevel >= sigil.level}
                  onClick={() => decreaseLevel(index)}
                >
                  -
                </button>

                <button
                  className="btn btn-light btn-sm ms-2"
                  onClick={() => increaseLevel(index)}
                  disabled={sigil.maxLevel <= sigil.level}
                >
                  +
                </button>
              </div>
              <h4 className={styles.sigilSlotName}>{sigil.name}</h4>
              <div className={styles.sigilSlotTrait}>T. Lvl {sigil.level}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Slot;
