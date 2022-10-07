class Activity{
    #coords;
    #data;
    #type;
    constructor(data){ //activityId, activityType, encodedCoords){
        this.id = data["id"];
        this.#data = data;
        this.#type = data["type"];
        this.#coords = new Array();
        if (data["map"]["summary_polyline"]!=null){
            this.#make(data["map"]["summary_polyline"]);
        }
    }

    getCoords(){
        if (this.#coords.length==0){
            this.#make();
        }
        return this.#coords;
    }

    getEndCoords(){
        return this.#data["end_latlng"];
    }

    getStartCoords(){
        return this.#data["start_latlng"];
    }

    getType(){
        //return this.#dict.get(this.#type);
        return this.#type;
    }

    make(coords){
        /*
        Function that gets detailed coordinates of the activity
        and assigns them to the coords parameter
        */
       this.#make(coords);
        
    }
    #make(coords){
        // get coords via request to strava
        this.#coords = L.Polyline.fromEncoded(coords).getLatLngs();
        let [key1, key2] = Object.keys(this.#coords[0]);
        this.#coords = this.#coords.filter(c=>c!=undefined).map(c=>[c[key2], c[key1]]);
    }
}

class ActivityOverview{
    #activities;
    #data;
    #factory;
    #margin;
    #detector;
    #countryMargin;
    constructor(data){
        this.#data = data;
        this.#factory = new Factory(Activity);
        this.#margin = 0.1;
        this.#countryMargin = 1;
        this.#activities = new Array();
        this.#detector = new zoneDetector();
        this.countries = new Array();
        this.areas = new Array();
    }

    test(){
        console.log(this.#data[0]);
    }

    getActivity(ind){
        if (this.#activities.length==0){
            return this.#factory.make(this.#data[ind]);
        }
        return this.#activities[ind];
    }

    getActivities(){
        if (this.#activities.length==0){
            this.#activities = this.#data.slice(0, 15)
                                    .filter(d=>d["map"]["summary_polyline"]!=null)
                                    .map(d=>this.#factory.make(d));
        }
        return this.#activities;
    }

    getStartCoords(){
        return this.#data.map(d=>d["start_latlng"]).filter(d=>d.length!=0);
    }

    getEndCoords(){
        return this.#data.map(d=>d["end_latlng"]).filter(d=>d.length!=0);
    }

    getCountries(){
        if (this.countries.length > 0){
            let c = this.countries;
            return new Promise ((resolve) => resolve(c));
        }
        
        if (this.#activities.length==0){
            this.getActivities();
        }
        
        let countries = new Array();
        countries.push(this.#activities[0]);
        this.#activities.forEach(r=>{
            let sum = countries.map(c=>vecDiff(c.getStartCoords(), 
                                               r.getStartCoords()) > this.#countryMargin);
            if(!sum.includes(false)){
                countries.push(r);
            }
    });
    
    return new Promise ((resolve) => resolve("1"))
    .then(async(r) => await Promise.all(countries.slice(0, 1).map(async (city) => {
        try {
            let r = undefined;
            if (mode==modes.RELEASE){
                r = requests.COUNTRY;
            }
            else{
                r = requests.TEST_COUNTRY_BOUNDS;
            }
            let c = await this.#detector.make(city, r);
            
            let a = await c.getBoundary().then(r=>{
                return c.scoreAll(this.#activities)});
                                         //.then(r=>console.log("score:", c.getScore()));
                                         
            let curNames = this.countries.map(c=>c.name[0]);
            if (!curNames.includes(c.name[0])){
                this.countries.push(c);
            }
        } catch (error) {}
      })).then(r => {
        return this.countries; }));
    };

    getAreas(country){
        if (this.areas.length > 0){
            let c = this.areas;
            return new Promise ((resolve) => resolve(c));
        }
        if (this.#activities.length==0){
            this.getActivities();
        }
        
        let cities = new Array();
        cities.push(this.#activities[0]);
        
        this.#activities.forEach(r=>{
            let sum = cities.map(c=>vecDiff(c.getStartCoords(), r.getStartCoords())>this.#margin);
            if(!sum.includes(false)){
                cities.push(r);
            }
    });

    return country.getBoundary().then(b => {
        cities = cities.filter(c => geom.pointInPolygon([c.getStartCoords()[1], c.getStartCoords()[0]], b));
        return cities;
    }).then(async (cities) =>{
        await Promise.all(cities.map(async (city) => {
            try {
                let r = undefined;
                if (mode == modes.RELEASE){
                    r = requests.REGION;
                }
                else {
                    r = requests.TEST_CITIES;
                }
                let c = await this.#detector.make(city, r);
                let a = await c.getBoundary().then(r=>{
                    return c.scoreAll(this.#activities)})
                                             .then(r=>console.log("score:", c.getScore()));
                let curNames = this.areas.map(c=>c.name[0]);
                if (!curNames.includes(c.name[0])){
                    this.areas.push(c);
                }
            } catch (error) {}
          }));
        return this.areas;        
    });
    }
}

class ActivityDict {
    #dict;

    constructor(){
        this.#dict = {
            0: ("Run"),
            1: ("Hike")
        }
    }

    get(activityIndex){
        if (Object.keys(this.#dict).includes(activityIndex.toString())){
            return this.#dict[activityIndex];
        }
        
    }
}