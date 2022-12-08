import {City, Country, Zone} from "./zone";

class ActivityOverview{
    countries: Country[];
    cities: City[];
    zones: Zone[];
    constructor(){
        this.countries = [];
        this.cities = [];
        this.zones = [];
    }

    getCountries() : Country[] {
        if (this.countries.length > 0){
            return this.countries;
        }

        return this.countries;
    }

    getCities() : City[] {
        if (this.cities.length > 0){
            return this.cities;
        }

        return this.cities;
    }

    getZones() : Zone[] {
        if (this.zones.length > 0){
            return this.zones;
        }

        return this.zones;
    }
}

export {ActivityOverview};