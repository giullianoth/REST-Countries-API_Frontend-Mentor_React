import { Link, useParams } from "react-router-dom"
import Container from "../../components/Container"
import styles from "./Country.module.css"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useEffect, useState } from "react"
import type { ICountry } from "../../interfaces/country"
import APIServices from "../../api/api-services"
import Loading from "../../components/Loading"

const Country = () => {
    const { code } = useParams()
    const [country, setCountry] = useState<ICountry | null>(null)
    const [borderCountries, setBorderCountries] = useState<ICountry[] | null>(null)
    const [error, setError] = useState<boolean>(false)
    const { getCountry, getBorderCountries, loading } = APIServices()

    useEffect(() => {
        const getData = async () => {
            const data = await getCountry(code as string)

            if (!data) {
                setError(true)
                return
            }

            const borders = await getBorderCountries(data.borders)
            setCountry(data)
            setBorderCountries(borders as ICountry[])
        }

        getData()
    }, [code])

    return (
        <section className={styles.country}>
            <Container className={styles.country__container}>
                <div className={styles.country__back}>
                    <Link to="/" className="button">
                        <AiOutlineArrowLeft />
                        Back
                    </Link>
                </div>

                {loading
                    ? <Loading />

                    : (error
                        ? <p className={styles.country__error}>
                            <strong>Invalid request.</strong>
                        </p>

                        : <div className={styles.country__details}>
                            <div className={styles.country__flag}>
                                <img src={country?.flags.svg} alt={country?.name.common} />
                            </div>

                            <div className={styles.country__info}>
                                <header className={styles.country__name}>
                                    <h2>{country?.name.common}</h2>
                                </header>

                                <div className={styles.country__infoContent}>
                                    {country?.name.nativeName &&
                                        <p className={styles.country__data}>
                                            <strong>Native Name:</strong> {country?.name.nativeName.common}
                                        </p>}

                                    <p className={styles.country__data}>
                                        <strong>Population:</strong> {new Intl.NumberFormat().format(country?.population!)}
                                    </p>

                                    <p className={styles.country__data}>
                                        <strong>Region:</strong> {country?.region}
                                    </p>

                                    {country?.subregion &&
                                        <p className={styles.country__data}>
                                            <strong>Sub Region:</strong> {country?.subregion}
                                        </p>}

                                    <p className={styles.country__data}>
                                        <strong>Capital:</strong> {country?.capital}
                                    </p>
                                </div>

                                <div className={styles.country__infoContent}>
                                    <p className={styles.country__data}>
                                        <strong>Top Level Domain:</strong> {country?.tld.join(", ")}
                                    </p>

                                    <p className={styles.country__data}>
                                        <strong>Currencies:</strong>&nbsp;
                                        {country?.currencies.map(currency => `${currency.name} (${currency.symbol})`).join(", ")}
                                    </p>

                                    <p className={styles.country__data}>
                                        <strong>Languages:</strong> {country?.languages.join(", ")}
                                    </p>
                                </div>

                                <div className={styles.country__border}>
                                    {borderCountries?.length

                                        ? <>
                                            <p>
                                                <strong>Border Countries:</strong>
                                            </p>

                                            <div className={styles.country__borderCountries}>
                                                {borderCountries.map(borderCountry => (
                                                    <Link
                                                        key={borderCountry.cca3}
                                                        to={`/country/${borderCountry.cca3.toLowerCase()}`}
                                                        className="button"
                                                        title={borderCountry.name.common}>
                                                        {borderCountry.name.common}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>

                                        : <p>
                                            <strong>No Border Countries</strong>
                                        </p>}
                                </div>
                            </div>
                        </div>
                    )}
            </Container>
        </section>
    )
}

export default Country