import { useEffect, useState } from "react"
import Container from "../../components/Container"
import styles from "./Home.module.css"
import { AiOutlineSearch } from "react-icons/ai"
import Card from "../../components/Card"
import { Link } from "react-router-dom"
import APIServices from "../../api/api-services"
import type { ICountry } from "../../interfaces/country"
import Select from "../../components/Select"
import Loading from "../../components/Loading"

const Home = () => {
    const [query, setQuery] = useState<string>("")
    const [filter, setFilter] = useState<string>("")
    const [countriesList, setCountriesList] = useState<ICountry[] | null>(null)
    const { getAllCountries, getCountriesByRegion, searchCountries, searchCountriesFilteredByRegion, loading } = APIServices()

    useEffect(() => {
        const getData = async () => {
            setCountriesList([])

            let data: ICountry[] = []

            if (!query && !filter) {
                data = await getAllCountries() as ICountry[]
            }

            if (query) {
                data = await searchCountries(query)
            }

            if (filter) {
                data = await getCountriesByRegion(filter)
            }

            if (query && filter) {
                data = await searchCountriesFilteredByRegion(filter, query)
            }

            if (data.length) {
                setCountriesList(data)
            }
        }

        getData()
    }, [query, filter])

    return (
        <>
            <section className={styles.filter}>
                <Container className={styles.filter__container}>
                    <label className={styles.filter__search}>
                        <input
                            required
                            type="text"
                            name="search"
                            placeholder="Search for a country..."
                            value={query}
                            onChange={event => setQuery(event.target.value)} />

                        <AiOutlineSearch />
                    </label>

                    <div className={styles.filter__by}>
                        <Select
                            name="filter"
                            onChange={event => setFilter(event.target.value)}>
                            <option value="">Filter by Region</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">Americas</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </Select>
                    </div>
                </Container>
            </section>

            <section className={styles.list}>
                <Container className={styles.list__container}>
                    {loading
                        ? <Loading className={styles.list__loading} />

                        : (countriesList && countriesList.length
                            ? countriesList.map(country => (
                                <Link
                                    key={country.cca3}
                                    to={`/country/${country.cca3.toLowerCase()}`}
                                    title={country.name.common}>
                                    <Card country={country} />
                                </Link>
                            ))

                            : <p className={styles.list__empty}>
                                <strong>Your search returned no results.</strong>
                            </p>)}
                </Container>
            </section>
        </>
    )
}

export default Home