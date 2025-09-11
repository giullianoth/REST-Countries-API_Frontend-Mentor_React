import { useState, type ChangeEvent } from "react"
import Container from "../../components/Container"
import styles from "./Home.module.css"
import { AiOutlineSearch } from "react-icons/ai"
import Card from "../../components/Card"
import { Link } from "react-router-dom"

const Home = () => {
    const [query, setQuery] = useState<string>("")

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setQuery(value)
        console.log(value)
    }

    const handleFilter = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target
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
                        <select
                            name="filter"
                            onChange={handleFilter}>
                            <option>Filter by Region</option>
                            <option value="Africa">Africa</option>
                            <option value="America">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </div>
                </Container>
            </section>

            <section className={styles.list}>
                <Container className={styles.list__container}>
                    <Link to="/country">
                        <Card />
                    </Link>
                    <Link to="/country">
                        <Card />
                    </Link>
                    <Link to="/country">
                        <Card />
                    </Link>
                    <Link to="/country">
                        <Card />
                    </Link>
                </Container>
            </section>
        </>
    )
}

export default Home