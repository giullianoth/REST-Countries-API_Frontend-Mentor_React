import { Link } from "react-router-dom"
import Container from "../../components/Container"
import styles from "./Country.module.css"
import { AiOutlineArrowLeft } from "react-icons/ai"

const Country = () => {
    return (
        <section className={styles.country}>
            <Container className={styles.country__container}>
                <div className={styles.country__back}>
                    <Link to="/" className="button">
                        <AiOutlineArrowLeft />
                        Back
                    </Link>
                </div>

                <div className={styles.country__details}>
                    <div className={styles.country__flag}>
                        <img src="https://flagcdn.com/w320/lt.png" alt="Lithuania" />
                    </div>

                    <div className={styles.country__info}>
                        <header className={styles.country__name}>
                            <h2>Lithuania</h2>
                        </header>

                        <div className={styles.country__infoContent}>
                            <p className={styles.country__data}>
                                <strong>Native Name:</strong> Lietuva
                            </p>

                            <p className={styles.country__data}>
                                <strong>Population:</strong> {new Intl.NumberFormat().format(2794700)}
                            </p>

                            <p className={styles.country__data}>
                                <strong>Region:</strong> Europe
                            </p>

                            <p className={styles.country__data}>
                                <strong>Sub Region:</strong> Northern Europe
                            </p>

                            <p className={styles.country__data}>
                                <strong>Capital:</strong> Vilnius
                            </p>
                        </div>

                        <div className={styles.country__infoContent}>
                            <p className={styles.country__data}>
                                <strong>Top Level Domain:</strong> .lt
                            </p>

                            <p className={styles.country__data}>
                                <strong>Currencies:</strong> Euro (€)
                            </p>

                            <p className={styles.country__data}>
                                <strong>Languages:</strong> Lithuanian
                            </p>
                        </div>

                        <div className={styles.country__border}>
                            <p>
                                <strong>Border Countries:</strong>
                            </p>

                            <div className={styles.country__borderCountries}>
                                <Link to="/country" className="button">
                                    Belarus
                                </Link>

                                <Link to="/country" className="button">
                                    Latvia
                                </Link>

                                <Link to="/country" className="button">
                                    Russian Federation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Country