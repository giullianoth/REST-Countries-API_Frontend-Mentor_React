import { useState } from "react"

const apiUrl: string = "https://restcountries.com/v3.1/all"
const fields1: string[] = ["flags", "name", "population", "region", "subregion"]
const fields2: string[] = ["capital", "tld", "currencies", "languages", "borders", "cca3"]

const APIServices = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const getAllCountries = async () => {
        setLoading(true)

        try {
            const res1 = await fetch(`${apiUrl}?fields=${fields1.join(",")}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then(res => res.json())
                .catch(err => err)

            const res2 = await fetch(`${apiUrl}?fields=${fields2.join(",")}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then(res => res.json())
                .catch(err => err)

            if (!res1 || !res2) {
                throw new Error("Error during fetch data.")
            }

            setLoading(false)

            return Array.from(res1).map((item, index) => ({
                ...item as object,
                ...res2[index]
            }))
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    return { loading, getAllCountries }
}

export default APIServices