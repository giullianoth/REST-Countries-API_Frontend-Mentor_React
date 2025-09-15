import { useEffect, useState, type ChangeEvent } from "react"
import Container from "../../components/Container"
import styles from "./Home.module.css"
import { AiOutlineSearch } from "react-icons/ai"
import Card from "../../components/Card"
import { Link } from "react-router-dom"
import APIServices from "../../api/api-services"
import type { ICountry } from "../../interfaces/country"
import Select from "../../components/Select"

const Home = () => {
    const [query, setQuery] = useState<string>("")
    const [filter, setFilter] = useState<string>("")
    const [countriesList, setCountriesList] = useState<ICountry[] | null>(null)
    const { getAllCountries, getCountriesByRegion, loading } = APIServices()

    useEffect(() => {
        const getData = async () => {
            setCountriesList([])

            let data: ICountry[] = []

            if (!query && !filter) {
                data = await getAllCountries() as ICountry[]
            } else {
                if (filter) {
                    data = await getCountriesByRegion(filter)
                }
            }

            if (data.length) {
                setCountriesList(data)
            }
        }

        getData()
    }, [query, filter])

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setQuery(value)
        console.log(value)
    }

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
                            onChange={handleSearch} />

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
                        ? <p>Loading...</p>

                        : countriesList && countriesList.map(country => (
                            <Link key={country.cca3} to={`/country/${country.cca3.toLowerCase()}`} title={country.name.common}>
                                <Card country={country} />
                            </Link>
                        ))}
                </Container>
            </section>
        </>
    )
}

export default Home