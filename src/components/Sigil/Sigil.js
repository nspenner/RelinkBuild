import styles from "./Sigil.module.css";

const Sigil = ({ name, trait, effect, baseLevel, maxLevel, level, innerRef, onSigilClick }) => {
  return (
    <div ref={innerRef} className={styles.container}>
      <div className="d-flex justify-content-between">
        <h3>{name}</h3>
        <button onClick={onSigilClick} className="btn btn-secondary btn-sm">+</button>
      </div>
      <h4>{trait}</h4>
      <p>{effect}</p>
      {maxLevel && baseLevel && (
        <div className={styles.levels}>
          <span>Base Level: {baseLevel}</span>
          <span>Max Level: {maxLevel}</span>
        </div>
      )}
    </div>
  );
};

export default Sigil;
