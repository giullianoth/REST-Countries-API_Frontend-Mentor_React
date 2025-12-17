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

    const regionOptions = [
        { value: "Africa", label: "Africa" },
        { value: "Americas", label: "Americas" },
        { value: "Asia", label: "Asia" },
        { value: "Europe", label: "Europe" },
        { value: "Oceania", label: "Oceania" },
    ]

    useEffect(() => {
        const getData = async () => {
            setCountriesList([])

            let data: (ICountry | undefined)[] | undefined

            if (!search && !region) {
                data = await getAllCountries()
            } else if (search && region) {
                data = (await searchCountriesFilteredByRegion(region, search))
            } else if (search) {
                data = (await searchCountries(search))
            } else if (region) {
                data = (await getCountriesByRegion(region))
            }

            if (data && data.length) {
                setCountriesList(data as ICountry[])
            }
        }

        getData()
    }, [
        search,
        region,
        getAllCountries,
        getCountriesByRegion,
        searchCountries,
        searchCountriesFilteredByRegion
    ])

    const handleRegionChange = (newRegion: string) => {
        setRegion(newRegion)
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
                            options={regionOptions}
                            value={region}
                            onChange={handleRegionChange}
                            placeholder="Filter by Region" />
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