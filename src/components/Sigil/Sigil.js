import styles from "./Sigil.module.css"

const Sigil = ({ name, trait, effect, innerRef}) => {
    return(
        <div ref={innerRef} className={styles.container}>
            <h3>{name}</h3>
            <h4>{trait}</h4>
            <p>{effect}</p>
        </div>
    )
}

export default Sigil;