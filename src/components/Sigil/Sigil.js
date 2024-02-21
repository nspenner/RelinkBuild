import styles from "./Sigil.module.css";

const Sigil = ({ name, trait, effect, baseLevel, maxLevel, level, innerRef }) => {
  return (
    <div ref={innerRef} className={styles.container}>
      <h3>{name}</h3>
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
