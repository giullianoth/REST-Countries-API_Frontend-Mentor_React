import styles from "./Card.module.css"

const Card = () => {
  return (
    <article className={styles.card}>
        <div className={styles.card__image}>
            <img src="https://flagcdn.com/w320/lt.png" alt="Lithuania" />
        </div>

        <div className={styles.card__info}>
            <header className={styles.card__name}>
                <h2>Lithuania</h2>
            </header>

            <p className={styles.card__data}>
                <strong>Population:</strong>&nbsp;
                2794700
            </p>

            <p className={styles.card__data}>
                <strong>Region:</strong>&nbsp;
                Europe
            </p>

            <p className={styles.card__data}>
                <strong>Capital:</strong>&nbsp;
                Vilnius
            </p>
        </div>
    </article>
  )
}

export default Card