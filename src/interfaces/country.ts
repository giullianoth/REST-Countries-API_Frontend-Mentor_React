export interface ICountry {
    borders: ICountry[]
    capital: string[]
    cca3: string
    currencies: {
        name: string,
        symbol: string
    }[]
    flags: {
        png: string,
        svg: string
    }
    languages: string[]
    name: {
        common: string
        nativeName: {
            common: string
            official: string
        }
        official: string
    }
    population: number
    region: string
    subregion: string
    tld: string[]
}