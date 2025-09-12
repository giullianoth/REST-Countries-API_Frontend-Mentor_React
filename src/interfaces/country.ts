import type { ICurrencies } from "./currencies"
import type { ILanguages } from "./languages"

export interface ICountry {
    borders: string[]
    capital: string[]
    cca3: string
    currencies: ICurrencies
    flags: {
        png: string,
        svg: string
    }
    languages: ILanguages
    name: {
        common: string
        nativeName: ILanguages
        official: string
    }
    population: number
    region: string
    subregion: string
    tld: string[]
}