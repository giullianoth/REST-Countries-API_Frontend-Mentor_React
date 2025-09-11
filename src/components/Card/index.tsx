import styles from "./Card.module.css"

const Card = () => {
  return (
    <article className={styles.card}>
        <div className={styles.card__flag}>
            <img src="https://flagcdn.com/w320/lt.png" alt="Lithuania" />
        </div>

        <div className={styles.card__info}>
            <header className={styles.card__name}>
                <h2>Lithuania</h2>
            </header>

            <p className={styles.card__data}>
                <strong>Population:</strong> {new Intl.NumberFormat().format(2794700)}
            </p>

            <p className={styles.card__data}>
                <strong>Region:</strong> Europe
            </p>

            <p className={styles.card__data}>
                <strong>Capital:</strong> Vilnius
            </p>
        </div>
    </article>
  )
}

export default Card