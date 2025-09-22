import type { ICountry } from "../../interfaces/country"
import styles from "./Card.module.css"

type Props = {
    country: ICountry
}

const Card = ({ country }: Props) => {
    return (
        <article className={styles.card}>
            <div className={styles.card__flag}>
                <img
                    src={country.flags.png}
                    alt={country.flags.alt ? country.flags.alt : country.name.common} />
            </div>

            <div className={styles.card__info}>
                <header className={styles.card__name}>
                    <h2>{country.name.common}</h2>
                </header>

                <p className={styles.card__data}>
                    <strong>Population:</strong> {new Intl.NumberFormat().format(country.population)}
                </p>

                <p className={styles.card__data}>
                    <strong>Region:</strong> {country.region}
                </p>

                <p className={styles.card__data}>
                    <strong>Capital:</strong> {country.capital}
                </p>
            </div>
        </article>
    )
}

export default Card