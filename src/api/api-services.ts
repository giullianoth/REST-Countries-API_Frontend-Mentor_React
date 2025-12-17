import { useCallback, useState } from "react"
import type { ICountry } from "../interfaces/country"

const apiUrl: string = "https://restcountries.com/v3.1"
const fields1: string[] = ["flags", "name", "population", "region", "subregion"]
const fields2: string[] = ["capital", "tld", "currencies", "languages", "borders", "cca3"]
const fields: string[] = fields1.concat(fields2)

const APIServices = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const processedData = (data: any) => {
        if (typeof data !== "object" || !data.languages || !data.currencies) {
            return undefined
        }

        const languageKeys = Object.keys(data.languages)
        const currenciesKeys = Object.keys(data.currencies)

        const name = data.name.nativeName[languageKeys[0]] || data.name
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
        } as ICountry
    }

    const getAllCountries = useCallback(async () => {
        setLoading(true)

        try {
            const [res1, res2] = await Promise.all([
                fetch(`${apiUrl}/all?fields=${fields1.join(",")}`).then(res => res.json()),
                fetch(`${apiUrl}/all?fields=${fields2.join(",")}`).then(res => res.json())
            ])

            if (!res1 || !res2) {
                throw new Error("Error during fetch countries.")
            }

            const data = Array.from(res1).map((item, index) => processedData({
                ...(item as object),
                ...res2[index]
            }))

            setLoading(false)
            return data
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }, [])

    const getCountry = useCallback(async (code: string) => {
        setLoading(true)

        try {
            const res = await fetch(`${apiUrl}/alpha/${code}?fields=${fields.join(",")}`).then(res => res.json())
            setLoading(false)
            return processedData(res)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }, [])

    const getBorderCountries = useCallback(async (borders: string[]) => {
        if (!borders.length) {
            return []
        }

        setLoading(true)
        borders = borders.map(border => border.toLowerCase())

        try {
            const res = await fetch(`${apiUrl}/alpha?codes=${borders.join(",")}`).then(res => res.json())
            const data = Array.from(res).map(item => processedData(item))

            setLoading(false)
            return data
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }, [])

    const getCountriesByRegion = useCallback(async (region: string) => {
        setLoading(true)
        region = region.toLowerCase()

        try {
            const res = await fetch(`${apiUrl}/region/${region}`).then(res => res.json())
            const data = Array.from(res).map(item => processedData(item))

            setLoading(false)
            return data
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }, [])

    const searchCountries = useCallback(async (name: string) => {
        // setLoading(true)
        // name = name.toLowerCase()

        // try {
        //     const res = await fetch(`${apiUrl}/name/${name}`).then(res => res.json())
        //     const data = Array.from(res).map(item => processedData(item))

        //     setLoading(false)
        //     return data
        // } catch (error) {
        //     setLoading(false)
        //     console.error(error)
        // }

        const res = await getAllCountries()
        const accentuation = /[\u0300-\u036f]/g
        const searchTerms = name.normalize("NFD").replace(accentuation, "").toLowerCase()

        const foundCountries = res?.filter(country => {
            const commonName = country?.name.common.normalize("NFD").replace(accentuation, "").toLowerCase()
            const nativeName = country?.name.nativeName?.common?.normalize("NFD").replace(accentuation, "").toLowerCase()
            return commonName?.includes(searchTerms) || nativeName?.includes(searchTerms)
        })

        return foundCountries || []
    }, [getAllCountries])

    const searchCountriesFilteredByRegion = useCallback(async (region: string, terms: string) => {
        const [resFiltered, resSearch] = await Promise.all([
            getCountriesByRegion(region),
            searchCountries(terms)
        ])

        return resFiltered?.filter(filtered => resSearch?.some(found => found?.cca3 === filtered?.cca3)) || []
    }, [getCountriesByRegion, searchCountries])

    return { loading, getAllCountries, getCountry, getBorderCountries, getCountriesByRegion, searchCountries, searchCountriesFilteredByRegion }
}

export default APIServices