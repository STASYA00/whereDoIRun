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
        if (!(name instanceof Array)){
            this.name = [this.name];
        }
        this.#refCoords = refCoords;
        this.#bbox = new Array();
        this.#boundary = new Array();
        
        this.#factory = new Factory(Street);
        this.#score = 0;
        this.#streets = new Array();
        
    }
    async getBbox(){
        if (this.#bbox.length>0){   
            let b = this.#bbox;                                
            return new Promise((resolve) =>resolve(b));
        }
        return this.#selectRelevantArea().then(r => {return this.#bbox;});
    }
    async getBoundary(){
        // returns a Promise
        if (this.#boundary.length>0){
            let b = this.#boundary;
            return new Promise((resolve) =>resolve(b));
        }
        return this.#selectRelevantArea().then(r => { 
            //console.log("selected relevant area");
            return this.#boundary;
        });
    }
    getBuildings(){
        
        return this.getBoundary().then(b =>{
            let r = new OverpassRequest([0, b.map(c => [c[1], c[0]])]);
            r.call().then(buildings =>{
                this.#buildings = buildings["elements"].filter(r=>r!=undefined)
                                                       .map(r=>r["geometry"])
                                                       .filter(r=>r!=undefined)
                                                       .map(r=>r.map(c=>[c["lon"], c["lat"]]));
            }).then(r=>{return this.#buildings;});
        }).then(r=>{return this.#buildings;});
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
    make(){
        return this.getBbox();
        //return 0;
    }
    score(activity){
        let coords = activity.getCoords();
        
        this.getBoundary().then(b => {
        let res = coords.map(c=>intersectionCalc.pointInPolygon(c, b)).reduce((prev, next)=>prev+next)
        this.#addScore(res>0);
            return true;
        });
    }
    
    scoreAll(activities){
        
        this.getBoundary().then(b => activities.forEach(activity => {
            this.score(activity);
        }));
    }
    
    #addScore(value=1){
        this.#score += value;
    }

    #shortenBoundary(){
        if (this.#boundary.length>200){
            this.#boundary = this.#boundary.filter((v, i) => i%4==0);
        }
    }

    async #selectRelevantArea(){
        // returns a Promise
        if (this.#bbox.length>0){
            return new Promise((resolve) => resolve(true));
        }
        
        return new requests.NOMINATIM(this.name).call() // => features
                    .then(features => {

                        // TODO: add option for "MultiPolygon" : separate bounding boxes and go over all polygons
                        
                        features = features["features"].filter(f => ["MultiPolygon", "Polygon"].includes(f["geometry"]["type"]))
                                .filter(f => f["properties"]["category"]=="boundary");
                        
                        if (features.length > 0){
                            //console.log("features 2", features);
                            if (this.#refCoords!=undefined){
                                // for multipolygon can be the index of the largest area instead of 0
                                
                                let features_ = features.filter(c=>{
                                    if (c["geometry"]["type"] == "MultiPolygon"){
                                        let indices = c["geometry"]["coordinates"].map(r => r[0].length);
                                        let ind = indices.indexOf(Math.max(...indices));
                                        //let ind = 0; // TODO: find the longest array
                                        return intersectionCalc.pointInPolygon(this.#refCoords, c["geometry"]["coordinates"][ind][0]);
                                    }
                                    else {
                                        return intersectionCalc.pointInPolygon(this.#refCoords, c["geometry"]["coordinates"][0]);
                                    }
                                    
                                }); 

                                if (features_.length > 0){
                                    features = features_;
                                }
                                let ind = 0;
                                if (features[0]["geometry"]["type"] == "MultiPolygon"){
                                    let indices = features[0]["geometry"]["coordinates"].map(r => r[0].length);
                                    ind = indices.indexOf(Math.max(...indices));
                                }
                                this.#bbox = features[0]["bbox"];
                                this.#boundary = features[0]["geometry"]["coordinates"][ind];
                                if (features[0]["geometry"]["type"] == "MultiPolygon"){
                                    this.#boundary = this.#boundary[0];
                                    this.#bbox = [Math.min(...this.#boundary.map(x=>x[0])), Math.min(...this.#boundary.map(x=>x[1])),
                                                  Math.max(...this.#boundary.map(x=>x[0])), Math.max(...this.#boundary.map(x=>x[1]))];
                                    
                                }
                            }
                            this.#shortenBoundary();
                            
                        return true;
                    }       
        });
    }
}

class Area extends Zone{
    constructor(name, refCoords){
        super (name, refCoords);
    }

    async getZones(){
        // returns Promise
        
        return this.getBoundary().then(b => new requests.CITY(b.map(c => [c[1], c[0]])).call()
                                    .then(result => {
                                        console.log("getzones", result);
                                        result = result["elements"].map(el =>new Zone(el["tags"]["name"]));
                                        if (result.length==0){
                                            return [this];
                                        }
                                        return result;
                                    }));
    }
}