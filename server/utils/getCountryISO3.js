import {countryCodes} from "../data/index.js"

export const getCountryISO3 = (country) => {
    if (countryCodes[country]){
        return countryCodes[country]
    }
    return country
}