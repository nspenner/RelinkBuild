import styles from "./Trait.module.css"

const Trait = ( {maxLevel, level, name, description, effect}) => {
    return <div className={styles.container}>
        <h1>{name}</h1>
        <p>{description}</p>
        <h2>{effect}</h2>
        <h3>{level} / {maxLevel}</h3>
    </div>
}

export default Trait;