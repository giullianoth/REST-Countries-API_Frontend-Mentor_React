import { useState } from "react"
import type { ICountry } from "../interfaces/country"

const apiUrl: string = "https://restcountries.com/v3.1"
const fields1: string[] = ["flags", "name", "population", "region", "subregion"]
const fields2: string[] = ["capital", "tld", "currencies", "languages", "borders", "cca3"]
const fields: string[] = fields1.concat(fields2)

const APIServices = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const processedData = (data: any): ICountry | undefined => {
        if (typeof data !== "object") {
            return undefined
        }

        const languageKeys = Object.keys(data.languages)
        const currenciesKeys = Object.keys(data.currencies)

        const name = data.name.nativeName[languageKeys[0]]
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
        if (!borders.length) {
            return []
        }

        setLoading(true)
        borders = borders.map(border => border.toLowerCase())

        try {
            const res = await fetch(`${apiUrl}/alpha?codes=${borders.join(",")}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then(res => res.json())
                .catch(err => err)

            setLoading(false)
            return Array.from(res).map(item => processedData(item))
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const getCountriesByRegion = async (region: string) => {
        setLoading(true)
        region = region.toLowerCase()

        try {
            const res = await fetch(`${apiUrl}/region/${region}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then(res => res.json())
                .catch(err => err)

            setLoading(false)
            return Array.from(res).map(item => processedData(item))
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const searchCountries = async (name: string) => {
        // setLoading(true)
        // name = name.toLowerCase()

        // try {
        //     const res = await fetch(`${apiUrl}/name/${name}`, {
        //         method: "GET",
        //         headers: { "Content-Type": "application/json" }
        //     }).then(res => res.json())
        //         .catch(err => err)

        //     setLoading(false)
        //     return Array.from(res).map(item => processedData(item))
        // } catch (error) {
        //     setLoading(false)
        //     console.error(error)
        // }

        const res = await getAllCountries()

        const foundCountries = res?.filter(country => {
            return country?.name.common.toLowerCase().includes(
                name.normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase())
                || country?.name.nativeName?.common?.toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .includes(
                        name.toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                    )
        })

        if (!foundCountries) {
            return []
        }

        return foundCountries
    }

    const searchCountriesFilteredByRegion = async (region: string, terms: string) => {
        const resFiltered = await getCountriesByRegion(region)
        const resSearch = await searchCountries(terms)

        const filteredCountries = resFiltered?.filter(filtered => {
            return resSearch?.some(found => found?.cca3 === filtered?.cca3)
        })

        return filteredCountries
    }

    return { loading, getAllCountries, getCountry, getBorderCountries, getCountriesByRegion, searchCountries, searchCountriesFilteredByRegion }
}

export default APIServices