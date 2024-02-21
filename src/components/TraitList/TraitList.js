import Trait from "../Trait/Trait";
import styles from "./TraitList.module.css";

const TraitList = ({ traits }) => {
  const renderedTraits = Object.entries(traits).map(([key, value]) => {
    return (
      <Trait
        key={key}
        name={key}
        effect={value.effect}
        level={value.level}
        maxLevel={value.maxLevel}
        description={value.description}
      ></Trait>
    );
  });

  return (
    <div className={styles.container}>
      <h1>Active Traits</h1>
      <ul>{renderedTraits}</ul>
    </div>
  );
};

export default TraitList;
