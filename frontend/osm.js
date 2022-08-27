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

    async call(){
        let req = await this.#request();
        return req;
    }

    getUrl(){
        let query = this.getQuery();
        return `${this.url}?${query}`;
    }
    getQuery(){
        return this.params;
    }
    async #request(callback){
        const url = this.getUrl();
        console.log("URL: " + url);
        let result = await fetch(url, {method: this.method,
                                       headers: {'Content-Type': 'application/json'},
                                    });
        if (result.status == 200){
            result = result.json();
        }
        else if (result.status == 429){
            await sleep(1000);
            return await this.#request();
        }
        else if (result.status == 504){
            return await this.#request();
        }
        else {
            console.log("CODE: ", result.status);
        }
        if (callback != undefined) {
            callback(result);
        }
        return result;
    }
}

class NominatimRequest extends Request {
    constructor(params){
        super (params);
        this.url = nominatimUrl;
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
    }
    getQuery(){
        var [geometryType, areaBoundary] = this.params;
        
        
        let geometries = "";
        let areaFilter = "";
        let tags = [];
        let output = "geom";
        switch (geometryType){
            case (0):
                areaBoundary = areaBoundary.flat(2)
                                .reduce((v1, v2)=>`${v1.toString()}%20${v2.toString()}`);
                tags = ["building"];
                geometries = "wr";
                areaFilter = `poly:%22${areaBoundary}%22`;
                break;
            case (1):
                areaBoundary = areaBoundary.flat(2)
                                .reduce((v1, v2)=>`${v1.toString()}%20${v2.toString()}`);
                tags = ["highway"];
                geometries = "way";
                areaFilter = `poly:%22${areaBoundary}%22`;
                break;
            case(2):
                areaBoundary = areaBoundary.flat(2)
                                .reduce((v1, v2)=>`${v1.toString()},${v2.toString()}`);
                tags = ["boundary=administrative", "type=boundary", "admin_level=7"];
                geometries = "wr";
                areaFilter = `around:10000,${areaBoundary}`;
                output = "center%20bb";
                break;
            case(3):
                areaBoundary = areaBoundary.flat(2).slice(0, 580)
                                .reduce((v1, v2)=>`${v1.toString()},${v2.toString()}`);
                tags = ["boundary=administrative", "type=boundary", "admin_level=9"];
                geometries = "relation";
                areaFilter = `around:10000,${areaBoundary}`;
                //areaFilter = "poly:%2259.3917673%2017.7606917%2059.3887845%2017.762308%2059.3835394%2017.7750968%2059.3703356%2017.7884864%2059.3185291%2018.1203442%2059.3446948%2018.0264649%2059.3972755%2017.8197888%22"
                output = "center";
                break;

            /*
            relation["boundary"="administrative"]["type"="boundary"]["place"~"city|municipality"](around:10000.0,48.864716,2.349014);
            out geom;
            ["admin_level"="2"] // up to 11
            */
            
        }

        let tagResult = "[" + tags.reduce((prev, next) => prev + "][" + next) + "]";
        
        return `data=[out:json];${geometries}${tagResult}(${areaFilter});out%20${output};`;
        // return `data=[out:json];${geometries}${tagResult}(poly:%22${areaBoundary}%22);out%20geom;`;
    }

    #areaFilter(value, filterType){

    }
}

var FILTERS = {
    AREA: `(poly:%22${value}%22)`,
    BB: `(poly:%22${value}%22)`,
    COORDS: `(around:${value})`,
}

var requests = {
    NOMINATIM: 0, 
    OVERPASS: 1,
    OSM: 2
}


// function osmQuery(bbox){
//     // GET
//     return `bbox=${bbox[0]},${bbox[1]},${bbox[2]},${bbox[3]}`;
// }