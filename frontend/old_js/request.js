//const { response } = require("express");

const osmBaseUrl = "https://openstreetmap.org/api/0.6";
const nominatimUrl = "https://nominatim.openstreetmap.org/search";
const overpassUrl = "https://overpass-api.de/api/interpreter";

// https://openstreetmap.org/api/0.6/map?bbox=18.0829928,59.312307,18.0830852,59.3134287

// https://nominatim.openstreetmap.org/search?q=Södermalm+Stockholm+Sweden&&polygon_geojson=1&format=geojson

// https://overpass-api.de/api/interpreter?data=node[name=%22Milan%22];out; (GET)
// https://overpass-api.de/api/interpreter?data=[out:json];rel[name=%22Södermalm%22][%22boundary%22=%22administrative%22];out%20geom; : area boundary
// ALL STREETS
// https://overpass-api.de/api/interpreter?data=[out:json];way[highway](poly:%2259.3027296%2018.0248052%2059.3238146%2018.0248052%2059.3238146%2018.1093091%2059.3027296%2018.1093091%22);out%20geom;
// ALL BUILDINGS
//                                                         wr[building]

class Request {
    constructor(params){
        this.params = params;
        this.method = "GET";
        this.url = osmBaseUrl;
    }

    call(){
        //let req = await this.#request();
        return this.#request();
    }

    getUrl(){
        let query = this.getQuery();
        if (query==""){
            return this.url;
        }
        return `${this.url}?${query}`;
    }
    getQuery(){
        return this.params;
    }

    #request(callback){
        const url = this.getUrl();
        console.log("URL: " + url);
        return fetch(url, {method: this.method,
                    headers: {'Content-Type': 'application/json'},
                        }).then(result =>{
                            if (result.status == 200){
                                if (callback != undefined) {
                                    result.json().then(r => callback(r));
                                }
                                return result.json();
                            }
                            else if (result.status == 429){
                                return sleep(1000).then(r=>this.#request());
                            }
                            else if (result.status == 504){
                                return this.#request();
                            }
                            else {
                                console.log("CODE: ", result.status);
                            }
                            
                            return result;
                        });
    }

    // async #request(callback){
    //     const url = this.getUrl();
    //     console.log("URL: " + url);
    //     let result = await fetch(url, {method: this.method,
    //                                    headers: {'Content-Type': 'application/json'},
    //                                 });
    //     console.log("result from API: ", result);                 
    //     if (result.status == 200){
    //         result = result.json();
    //         console.log("result json", result);
    //     }
    //     else if (result.status == 429){
    //         return sleep(1000).then(r=>this.#request());
    //     }
    //     else if (result.status == 504){
    //         return await this.#request();
    //     }
    //     else {
    //         console.log("CODE: ", result.status);
    //     }
    //     if (callback != undefined) {
    //         callback(result);
    //     }
    //     return result;
    // }
}

class LocalRequest extends Request {
    constructor(params){
        super (params);
        this.url = `${webserverUrl}:${port}/${params}`;;
    }
    getQuery(){
        return "";
    }
}

class NominatimRequest extends Request {
    constructor(params){
        super (params);
        this.url = nominatimUrl;
    }
    async call(){
        return await super.call();
    }
    getQuery(){
        let queryParams = this.params.filter(p => p != undefined).join("+");
        return `q=${queryParams}&polygon_geojson=1&format=geojson`;
    }
}

class OverpassRequest extends Request {
    constructor(params){
        super (params);
        this.url = overpassUrl;
        this.level = 2;
        this.tags = this.getTags();
        this.distance = undefined;
        this.geometries = "wr";
        this.output = "geom";
    }
    call(){
        return super.call();
    }
    getBoundary(boundary){
        return boundary.flat(2)
                        .reduce((v1, v2)=>`${v1.toString()}%20${v2.toString()}`);
    }
    getPolyBoundary(boundary){
        return boundary.flat(2)
                        .reduce((v1, v2)=>`${v1.toString()},${v2.toString()}`);
    }

    getTags(){
        return ["boundary=administrative", "type=boundary", "admin_level=" + this.level.toString()];
    }

    getFilter(boundary){
        if (this.distance!=undefined){
            return `around:${this.distance},${this.getPolyBoundary(boundary)}`;
        }
        else{
            return `poly:%22${this.getBoundary(boundary)}%22`;
        }
    }

    getQuery(){

        let tagResult = "[" + this.tags.reduce((prev, next) => prev + "][" + next) + "]";
        
        return `data=[out:json];${this.geometries}${tagResult}(${this.getFilter(this.params)});out%20${this.output};`;
        }
}

class CountryRequest extends OverpassRequest{
    constructor(params){
        super(params);
        this.distance = 10000;
        this.output = "center%20bb";
    }
}

class PreciseCountryRequest extends OverpassRequest{
    constructor(params){
        super(params);
        this.distance = 10000;
        this.output = "center%20geom";
    }
}

class RegionRequest extends OverpassRequest{
    constructor(params){
        super(params);
        this.level = 7;
        this.distance = 10000;
        this.output = "center%20bb";
        this.tags = this.getTags();
    }
}

class CityRequest extends OverpassRequest{
    constructor(params){
        super(params);
        this.level = 9;
        this.distance = 2000;
        this.geometries = "relation"
        this.output = "center";
        this.tags = this.getTags();
    }
}

class RoadRequest extends OverpassRequest{
    constructor(params){
        super(params);
        this.geometries = "way";
        this.tags = this.getTags();
    }
    getTags(){
        return ["highway"];
    }
}

class BuildingRequest extends OverpassRequest{
    constructor(params){
        super(params);
        this.tags = this.getTags();
    }
    getTags(){
        return ["building"];
    }
}

class TestCountryBoundsRequest extends LocalRequest {
    constructor(params){
        super (params);
        this.url = `${webserverUrl}:${port}/test/sverige_coords`;;
    }
    getQuery(){
        return "";
    }
}

class TestCountriesRequest extends LocalRequest {
    constructor(params){
        super (params);
        this.url = `${webserverUrl}:${port}/test/countries`;;
    }
    getQuery(){
        return "";
    }
}

class TestSthlmRequest extends LocalRequest {
    constructor(params){
        super (params);
        this.url = `${webserverUrl}:${port}/test/sthlm_bounds`;;
    }
    getQuery(){
        return "";
    }
}

class TestCitiesRequest extends LocalRequest {
    constructor(params){
        super (params);
        this.url = `${webserverUrl}:${port}/test/cities`;;
    }
    getQuery(){
        return "";
    }
}

class TestZonesRequest extends LocalRequest {
    constructor(params){
        super (params);
        this.url = `${webserverUrl}:${port}/test/zones/sthlm/whole`;;
    }
    getQuery(){
        return "";
    }
}

class TestZonesLtdRequest extends LocalRequest {
    constructor(params){
        super (params);
        this.url = `${webserverUrl}:${port}/test/zones/sthlm/ltd`;;
    }
    getQuery(){
        return "";
    }
}
class TestSoderRequest extends LocalRequest {
    constructor(params){
        super (params);
        this.url = `${webserverUrl}:${port}/test/sodermalm_bounds`;;
    }
    getQuery(){
        return "";
    }
}

class TestSoderStreetsRequest extends LocalRequest {
    constructor(params){
        super (params);
        this.url = `${webserverUrl}:${port}/test/soder/streets`;;
    }
    getQuery(){
        return "";
    }
}

class TestSoderBuildingsRequest extends LocalRequest {
    constructor(params){
        super (params);
        this.url = `${webserverUrl}:${port}/test/soder/buildings`;;
    }
    getQuery(){
        return "";
    }
}

const requests = {
    NOMINATIM: NominatimRequest, 
    OVERPASS: OverpassRequest,
    LOCAL: LocalRequest,
    COUNTRY: CountryRequest,
    REGION : RegionRequest,
    CITY: CityRequest,
    ROAD: RoadRequest,
    BUILDING: BuildingRequest,

    TEST_COUNTRY_BOUNDS: TestCountryBoundsRequest,
    TEST_COUNTRIES: TestCountriesRequest,
    TEST_STHLM_BOUNDS: TestSthlmRequest,
    TEST_CITIES: TestCitiesRequest,
    TEST_ZONES: TestZonesRequest,
    TEST_ZONES_LTD: TestZonesLtdRequest,
    TEST_SODER_BOUNDS: TestSoderRequest,

    TEST_SODER_STREETS: TestSoderStreetsRequest,
    TEST_SODER_BUILDINGS: TestSoderBuildingsRequest,
}


// function osmQuery(bbox){
//     // GET
//     return `bbox=${bbox[0]},${bbox[1]},${bbox[2]},${bbox[3]}`;
// }