import { useState } from "react"
import type { ILanguages } from "../interfaces/languages"

const apiUrl: string = "https://restcountries.com/v3.1"
const fields1: string[] = ["flags", "name", "population", "region", "subregion"]
const fields2: string[] = ["capital", "tld", "currencies", "languages", "borders", "cca3"]
const fields: string[] = fields1.concat(fields2)

const APIServices = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const processedData = (data: any) => {
        if (typeof data !== "object") {
            return undefined
        }

        const languageKeys = Object.keys(data.languages!)
        const currenciesKeys = Object.keys(data.currencies)

        const name = data.name.nativeName[languageKeys[0] as keyof ILanguages]
        const languages = languageKeys.map(key => data.languages[key])

        const currencies = currenciesKeys.map(key => ({
            name: data.currencies[key].name,
            symbol: data.currencies[key].symbol
        }))

        return {
            ...data,
            currencies,
            languages,
            name: {
                ...data.name,
                nativeName: name
            }
        }
    }

    const getAllCountries = async () => {
        setLoading(true)

        try {
            const res1 = await fetch(`${apiUrl}/all?fields=${fields1.join(",")}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then(res => res.json())
                .catch(err => err)

            const res2 = await fetch(`${apiUrl}/all?fields=${fields2.join(",")}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then(res => res.json())
                .catch(err => err)

            if (!res1 || !res2) {
                throw new Error("Error during fetch countries.")
            }

            setLoading(false)

            return Array.from(res1).map((item, index) => processedData({
                ...item as object,
                ...res2[index]
            }))
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const getCountry = async (code: string) => {
        setLoading(true)

        try {
            const res = await fetch(`${apiUrl}/alpha/${code}?fields=${fields.join(",")}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then(res => res.json())
                .catch(err => err)

            setLoading(false)
            return processedData(res)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const getBorderCountries = async (borders: string[]) => {
        const res = await getAllCountries()
        const borderCountries = res?.filter(country => borders.some(border => border === country.cca3))

        if (!borderCountries) {
            return []
        }

        return borderCountries
    }

    const getCountriesByRegion = async (region: string) => {
        const res = await getAllCountries()
        const countriesByRegion = res?.filter(country => country.region === region)

        if (!countriesByRegion) {
            return []
        }

        return countriesByRegion
    }

    const searchCountries = async (terms: string) => {
        const res = await getAllCountries()

        const foundCountries = res?.filter(country => {
            return country.name.common.toLowerCase().includes(terms.toLowerCase())
                || country.name.nativeName?.common?.toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .includes(terms.toLowerCase())
        })

        if (!foundCountries) {
            return []
        }

        return foundCountries
    }

    return { loading, getAllCountries, getCountry, getBorderCountries, getCountriesByRegion, searchCountries }
}

export default APIServices