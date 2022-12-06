import { stringify } from "uuid";
import { constants } from "./constants";
import { sleep } from "./utils";


class Request {
    method: string;
    params: any;
    constructor(params: any) {
        this.params = params;
        this.method = "GET";
    }

    call(): any {
        return this.request();
    }

    getBaseUrl(): string {
        return constants.OVERPASSURL;
    }

    getUrl(): string {
        let query = this.getQuery();
        if (query == "") {
            return this.getBaseUrl();
        }
        return `${this.getBaseUrl()}?${query}`;
    }
    getQuery(): any {
        return this.params;
    }

    request(callback: any = null): Promise<any> {
        const url = this.getUrl();
        console.log(`URL: ${url}`);
        return fetch(url, {
            method: this.method,
            headers: { 'Content-Type': 'application/json' },
        }).then(result => {
            if (result.status == 200) {
                if (callback != undefined) {
                    result.json().then(r => callback(r));
                }
                return result.json();
            }
            else if (result.status == 429) {
                return sleep(1000).then(r => { return this.request() });
            }
            else if (result.status == 504) {
                return this.request();
            }
            else {
                console.log(`CODE: ${result.status}`);
            }
            return result;
        });
    }
}


class LocalRequest extends Request {
    endpoint: string;
    constructor(params: any) {

        super(params);
        this.endpoint = `${params}`;
    }
    getBaseUrl(): string {
        return `${constants.WEBSERVERURL}:${constants.PORT}/${this.endpoint}`;
    }
    getQuery() {
        return "";
    }
}

class StravaAuthRequest extends LocalRequest {
    endpoint: string;
    constructor(params: any = null) {
        super(params);
        this.endpoint = "has_token";
    }
}

class ActivitiesRequest extends LocalRequest {
    endpoint: string;
    constructor(params: any = null) {
        super(params);
        this.endpoint = "activities";
    }
    call(): Promise<string[]> {
        return this.request();
    }
    request(callback?: any): Promise<string[]> {
        return super.request(callback);
    }
}

class NominatimRequest extends Request {
    constructor(params: any) {
        super(params);
        this.url = constants.NOMINATIMURL;
    }
    async call() {
        return await super.call();
    }
    getQuery() {
        let queryParams = this.params.filter(p => p != undefined).join("+");
        return `q=${queryParams}&polygon_geojson=1&format=geojson`;
    }
}

class OverpassRequest extends Request {
    level: number;
    tags: string[];
    distance: undefined | number;
    geometries: string;
    output: string;
    constructor(params: any) {
        super(params);
        this.level = 2;
        this.tags = this.getTags();
        this.distance = undefined;
        this.geometries = "wr";
        this.output = "geom";
    }
    getBaseUrl(): string {
        return constants.OVERPASSURL;
    }
    call() {
        return super.call();
    }
    getBoundary(boundary: any[]): string {
        return boundary.reduce((v1, v2) => `${v1}%20${v2}`);
    }
    getPolyBoundary(boundary: any[]): string {
        return boundary.reduce((v1, v2) => `${v1},${v2}`);
    }

    getTags(): string[] {
        return ["boundary=administrative", "type=boundary", "admin_level=" + this.level.toString()];
    }

    getFilter(boundary: any[]): string {
        if (this.distance != undefined) {
            return `around:${this.distance},${this.getPolyBoundary(boundary)}`;
        }
        else {
            return `poly:%22${this.getBoundary(boundary)}%22`;
        }
    }

    getQuery(): string {

        let tagResult = `[${this.tags.reduce((prev, next) => `${prev}][${next}`)}]`;

        return `data=[out:json];${this.geometries}${tagResult}(${this.getFilter(this.params)});out%20${this.output};`;
    }
}

class CountryRequest extends OverpassRequest {
    constructor(params: any) {
        super(params);
        this.distance = 10000;
        this.output = "center%20bb";
    }
}

class PreciseCountryRequest extends OverpassRequest {
    constructor(params: any) {
        super(params);
        this.distance = 10000;
        this.output = "center%20geom";
    }
}

class RegionRequest extends OverpassRequest {
    constructor(params: any) {
        super(params);
        this.level = 7;
        this.distance = 10000;
        this.output = "center%20bb";
        this.tags = this.getTags();
    }
}

class CityRequest extends OverpassRequest {
    constructor(params: any) {
        super(params);
        this.level = 9;
        this.distance = 2000;
        this.geometries = "relation"
        this.output = "center";
        this.tags = this.getTags();
    }
}

class RoadRequest extends OverpassRequest {
    constructor(params: any) {
        super(params);
        this.geometries = "way";
        this.tags = this.getTags();
    }
    getTags() {
        return ["highway"];
    }
}

class BuildingRequest extends OverpassRequest {
    constructor(params: any) {
        super(params);
        this.tags = this.getTags();
    }
    getTags() {
        return ["building"];
    }
}

class TestCountryBoundsRequest extends LocalRequest {
    constructor(params: any) {
        super(params);
        this.endpoint = `test/sverige_coords`;;
    }
    getQuery() {
        return "";
    }
}

class TestCountriesRequest extends LocalRequest {
    constructor(params: any) {
        super(params);
        this.endpoint = `test/countries`;;
    }
    getQuery() {
        return "";
    }
}

class TestSthlmRequest extends LocalRequest {
    constructor(params: any) {
        super(params);

        this.endpoint = `test/sthlm_bounds`;;
    }
    getQuery() {
        return "";
    }
}

class TestCitiesRequest extends LocalRequest {
    constructor(params: any) {
        super(params);
        this.endpoint = `test/cities`;;
    }
    getQuery() {
        return "";
    }
}

class TestZonesRequest extends LocalRequest {
    constructor(params: any) {
        super(params);
        this.endpoint = `test/zones/sthlm/whole`;;
    }
    getQuery() {
        return "";
    }
}

class TestZonesLtdRequest extends LocalRequest {
    constructor(params: any) {
        super(params);
        this.endpoint = `test/zones/sthlm/ltd`;;
    }
    getQuery() {
        return "";
    }
}
class TestSoderRequest extends LocalRequest {
    constructor(params: any) {
        super(params);
        this.endpoint = `test/sodermalm_bounds`;;
    }
    getQuery() {
        return "";
    }
}

class TestSoderStreetsRequest extends LocalRequest {
    constructor(params: any) {
        super(params);
        this.endpoint = `test/soder/streets`;;
    }
    getQuery() {
        return "";
    }
}

class TestSoderBuildingsRequest extends LocalRequest {
    constructor(params: any) {
        super(params);
        this.endpoint = `test/soder/buildings`;;
    }
    getQuery() {
        return "";
    }
}

const requests = {
    NOMINATIM: NominatimRequest,
    OVERPASS: OverpassRequest,
    LOCAL: LocalRequest,
    COUNTRY: CountryRequest,
    REGION: RegionRequest,
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

    STRAVA_AUTH: StravaAuthRequest,
    ACTIVITIES: ActivitiesRequest,
}

export { requests, Request, ActivitiesRequest };