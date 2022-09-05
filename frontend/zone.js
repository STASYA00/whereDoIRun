class Zone{

    /*
    Zone coordinates are in [lat, lon] format
    */

    #bbox
    #boundary;
    #buildings;
    #factory;
    #refCoords; // center of the bounding box of the area; not necessarily inside the area
                // useful in order to determine whether the nominatim request returns a relevant feature or not
    #score;
    #streets;

    constructor(name, refCoords){
        this.name = name;
        this.#refCoords = refCoords;
        this.#bbox = new Array();
        this.#boundary = new Array();
        this.#factory = new Factory(Street);
        this.#score = 0;
        this.#streets = new Array();
        if (!(name instanceof Array)){
            this.name = [this.name];
        }
    }
    async getBbox(){
        if (this.#bbox.length>0){
            return this.#bbox;
        }
        await this.#selectRelevantArea();
        return this.#bbox;
    }
    async getBoundary(){
        
        if (this.#boundary.length>0){
            return this.#boundary;
        }
        await this.#selectRelevantArea();
        return this.#boundary;
    }
    async getBuildings(){
        
        this.#boundary = await this.getBoundary();
        let r = new OverpassRequest([0, this.#boundary.map(c => [c[1], c[0]])]);
        this.#buildings = await r.call();
        this.#buildings = this.#buildings["elements"].filter(r=>r!=undefined)
                                                     .map(r=>r["geometry"]).filter(r=>r!=undefined);

        // last filter is for multipolygon; TODO
        this.#buildings = this.#buildings.map(r=>r.map(c=>[c["lon"], c["lat"]]));
        console.log("buildings", this.#buildings);
        return this.#buildings;
    }

    async getRelativeWidth(){
        let bb = await this.getBbox();
        return (bb[2] - bb[0]) / (bb[3] - bb[1]);
    }

    getScore(){
        return this.#score;
    }
    async getStreets(){
        if (this.#streets.length>0){
            return this.#streets;
        }
        this.#boundary = await this.getBoundary();
        let r = new OverpassRequest([1, await this.#boundary.map(c => [c[1], c[0]])]);
        
        let _streets = await r.call();
        _streets = _streets["elements"]
                    .filter(r=>r!=undefined)
                    .map(r=>r["geometry"]
                        .map((s1, ind, r)=>{
                                if (ind < r.length-1){
                                    // console.log([s1, r[ind+1], ind, r.length]);
                                    this.#streets.push(this.#factory.make([s1, r[ind+1]]));
                                }
                            }
                        ));
                        
        return this.#streets;
    }
    hasStreets(){
        return this.#streets.length > 0;
    }
    hasBuildings(){
        return this.#buildings.length > 0;
    }
    async make(){
        await this.getBbox();
        return 0;
    }
    score(activity){
        let coords = activity.getCoords();
        let res = coords.map(c=>intersectionCalc.pointInPolygon(c, this.#boundary)).reduce((prev, next)=>prev+next);
        this.#addScore(res>0);
    }
    scoreAll(activities){
        activities.forEach(activity => {
            this.score(activity);
        });
    }

    #addScore(value=1){
        this.#score += value;
    }

    async #selectRelevantArea(){
        let features = await new NominatimRequest(this.name).call();        
        features = features["features"].filter(f => f["geometry"]["type"]=="Polygon")
                                       .filter(f => f["properties"]["category"]=="boundary");
        
        if (features.length > 0){
            if (this.#refCoords!=undefined){
                features = features.filter(c=>intersectionCalc.pointInPolygon(this.#refCoords, c["geometry"]["coordinates"][0]));
            }
            this.#bbox = features[0]["bbox"];
            //this.#bbox = [this.#bbox[1],this.#bbox[0],this.#bbox[3],this.#bbox[2] ];
            
            this.#boundary = features[0]["geometry"]["coordinates"][0];
        }
        return 0;
    }
    
}

class Area extends Zone{
    constructor(name, refCoords){
        super (name, refCoords);
    }

    async getZones(){
        let boundary = await this.getBoundary();
        //console.log("boundary", boundary);
        let r = new OverpassRequest([3, boundary.map(c => [c[1], c[0]])]);
        let result = await r.call();  // list of zones
        result = result["elements"].map(el =>new Zone(el["tags"]["name"]));
        if (result.length==0){
            return [this];
        }
        return result;
    }
}