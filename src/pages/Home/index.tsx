import { useEffect, useState } from "react"
import Container from "../../components/Container"
import styles from "./Home.module.css"
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai"
import Card from "../../components/Card"
import { Link } from "react-router-dom"
import APIServices from "../../api/api-services"
import type { ICountry } from "../../interfaces/country"
import Select from "../../components/Select"
import Loading from "../../components/Loading"

const Home = () => {
    const [search, setSearch] = useState<string>("")
    const [region, setRegion] = useState<string>("")
    const [countriesList, setCountriesList] = useState<ICountry[] | null>(null)
    const { getAllCountries, getCountriesByRegion, searchCountries, searchCountriesFilteredByRegion, loading } = APIServices()

    useEffect(() => {
        const getData = async () => {
            setCountriesList([])

            let data: ICountry[] = []

            if (!search && !region) {
                data = await getAllCountries() as ICountry[]
            }

            if (search) {
                data = (await searchCountries(search) as ICountry[])
            }

            if (region) {
                data = (await getCountriesByRegion(region)) as ICountry[]
            }

            if (search && region) {
                data = (await searchCountriesFilteredByRegion(region, search)) as ICountry[]
            }

            if (data.length) {
                setCountriesList(data)
            }
        }

        getData()
    }, [search, region])

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
                            value={search}
                            onChange={event => setSearch(event.target.value)} />

                        <AiOutlineSearch className={styles.filter__iconSearch} />

                        <AiOutlineClose
                            className={styles.filter__iconClear}
                            title="Clear Search"
                            onClick={() => setSearch("")} />
                    </label>

                    <div className={styles.filter__by}>
                        <Select
                            name="region"
                            onChange={event => setRegion(event.target.value)}>
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