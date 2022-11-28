class Zone{

    /*
    Zone coordinates are in [lat, lon] format
    */

    #bbox
    #boundary;
    #buildings;
    #factory;
    refCoords; // center of the bounding box of the area; not necessarily inside the area
                // useful in order to determine whether the nominatim request returns a relevant feature or not
    #score;
    #streets;

    constructor(name, refCoords){
        this.name = name;
        if (!(name instanceof Array)){
            this.name = [this.name];
        }
        this.refCoords = refCoords;
        this.#bbox = new Array();
        this.#boundary = new Array();
        
        this.#factory = new Factory(Street);
        this.#score = 0;
        this.#streets = new Array();
        this.#buildings = new Array();
        
    }
    getBbox(){
        if (this.#bbox.length>0){   
            let b = this.#bbox;                                
            return new Promise((resolve) =>resolve(b));
        }
        return this.#selectRelevantArea().then(r => {return this.#bbox;});
    }
    getBoundary(){
        // returns a Promise
        if (this.#boundary.length>0){
            let b = this.#boundary;
            return new Promise((resolve) =>resolve(b));
        }
        return this.#selectRelevantArea().then(r => { 
            return this.#boundary;
        });
    }
    getBuildings(){
        if (this.#buildings.length>0){
            return new Promise ((res) => res(this.#buildings));
        }
        
        return this.getBoundary().then(b =>{
            let l = undefined;
            if (mode==modes.RELEASE){
                l = requests.BUILDING;
            }
            else{
                // TODO: change to test
                // l = requests.TEST_SODER_BUILDINGS;
                l = requests.BUILDING;
            }
            return new l(b.map(c => [c[1], c[0]])).call().then(buildings => {
                this.#buildings = buildings["elements"].filter(r=>r!=undefined)
                                                       .map(r=>r["geometry"])
                                                       .filter(r=>r!=undefined)
                                                       .map(r=>r.map(c=>[c["lon"], c["lat"]]));
                return this.#buildings;
            });
            console.log(this.#buildings);
            return this.#buildings;
        });
    }

    getRelativeWidth(){
        let w_km = geom.degrees_to_km_h(this.refCoords[1]);
        return this.getBbox().then(bb => (bb[2] - bb[0]) * w_km / ((bb[3] - bb[1]) * KM_IN_LAT));
    }

    getScore(){
        return this.#score;
    }
    getStreets(){
        if (this.#streets.length>0){
            return new Promise ((res) => res(this.#streets));
        }
        return this.getBoundary().then(r => {this.#boundary = r; return this.#boundary})
                          .then(r => {
                            let l = undefined;
                            if (mode==modes.RELEASE){
                                l = requests.ROAD;
                            }
                            else{
                                //l = requests.TEST_SODER_STREETS;
                                l = requests.ROAD;
                            }
                            return new l(r.map(c => [c[1], c[0]])).call().then(streets =>{  
                                                              
                                streets = streets["elements"].filter(r=>r!=undefined)
                                                .map(r=>r["geometry"].map((s1, ind, r)=>{
                                                    if (ind < r.length-1){
                                                        this.#streets.push(this.#factory.make([s1, r[ind+1]]));
                                                    }
                                                }
                                            ));
                                            return this.#streets
                            })
                          })
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
        let res = coords.map(c=>geom.pointInPolygon(c, b)).reduce((prev, next)=>prev+next)
        this.#addScore(res>0);
            return true;
        });
    }
    
    scoreAll(activities){
        
        return this.getBoundary().then(b => {return activities.map(activity => this.score(activity))});
        // activities.forEach(activity => {
        //     this.score(activity);
        // }));
    }
    
    #addScore(value=1){
        this.#score += value;
    }

    #shortenBoundary(){
        let max_points = 200;
        if (this.#boundary.length > max_points){
            this.#boundary = this.#boundary.filter((v, i) => i%(Math.round(this.#boundary.length / max_points))==0);
        }
    }

    #selectRelevantArea(){
        // returns a Promise
        if (this.#bbox.length>0){
            return new Promise((resolve) => resolve(true));
        }
        let r = undefined;
        
        if (mode == modes.RELEASE){
            r = new requests.NOMINATIM(this.name);
        }
        else {
            
            let zone_token = "stadsdelsområde";
            if (this.name[0] == "Sverige"){
                r = new requests.TEST_COUNTRIES();
            }
            else if (this.name[0].slice(this.name[0].length-zone_token.length, this.name[0].length) == zone_token){
                //r = new requests.TEST_SODER_BOUNDS();
                r = new requests.NOMINATIM(this.name);
            }
            else{
                r = new requests.TEST_STHLM_BOUNDS();
            }
            
        }
        
        return r.call()
                    .then(features => {
                        
                        // TODO: add option for "MultiPolygon" : separate bounding boxes and go over all polygons
                        
                        features = features["features"].filter(f => ["MultiPolygon", "Polygon"].includes(f["geometry"]["type"]))
                                .filter(f => f["properties"]["category"]=="boundary");
                        
                        if (features.length > 0){
                            if (this.refCoords!=undefined){
                                // for multipolygon can be the index of the largest area instead of 0
                                
                                let features_ = features.filter(c=>{
                                    if (c["geometry"]["type"] == "MultiPolygon"){
                                        let indices = c["geometry"]["coordinates"].map(r => r[0].length);
                                        let ind = indices.indexOf(Math.max(...indices));
                                        //let ind = 0; // TODO: find the longest array
                                        return geom.pointInPolygon(this.refCoords, c["geometry"]["coordinates"][ind][0]);
                                    }
                                    else {
                                        return geom.pointInPolygon(this.refCoords, c["geometry"]["coordinates"][0]);
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

    getZones(){
        // returns Promise
        
        return this.getBoundary().then(b => {
            let r = undefined;
            if (mode == modes.RELEASE){
                r = requests.CITY;
            }
            else{
                r = requests.TEST_ZONES_LTD;
            }
            return new r(b.map(c => [c[1], c[0]])).call()
            .then(result => result["elements"].map(el => new Zone(el["tags"]["name"], [el["center"]["lon"], el["center"]["lat"]])))
            .then(result => {
                if (result.length==0){
                    return [this];
                }
                return result;
            })
            ;
        });
    }
}