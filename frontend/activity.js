class Activity{
    #coords;
    data;
    #type;
    constructor(data){ //activityId, activityType, encodedCoords){
        this.id = data["id"];
        this.data = data;
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
        return this.data["end_latlng"];
    }

    getStartCoords(){
        return this.data["start_latlng"];
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
/*
class Overview{
    #cachemanager;
    constructor(data){
        this.#cachemanager = new CacheManager();
        this.activityOverview = new ActivityOverview(data);
        this.countryOverview = new CountryOverview();
    }
}

class CountryOverview{
    #cachemanager;
    #countryMargin;
    #detector;
    constructor(){
        this.#activities = new Array();
        this.#cachemanager = new CacheManager();
        this.#countryMargin = 1;
        this.#detector = new zoneDetector();
    }

    get(activities){
        if (this.countries.length > 0){
            // if the countries were already calculated, return them
            let c = this.countries;
            return new Promise ((resolve) => resolve(c));
        }        
        this.countries = this.#getCached();

        // find activities that happen in unique countries
        let per_country_activities = new Array();
        per_country_activities.push(activities[0]);

        activities.forEach(activity => {
            let sum = per_country_activities.map(c=>vecDiff(c.getStartCoords(), 
                                               activity.getStartCoords()) > this.#countryMargin);
            if(!sum.includes(false)){
                per_country_activities.push(activity);
            }
        });

        // compare the unique activities with the cached data
        // TODO

        // create countries for the unmatched activities
    
    return new Promise ((resolve) => resolve("1"))
    .then(async(r) => await Promise.all(per_country_activities.slice(0, 1).map(async (city) => {
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

    #getCached(){
        return this.#cachemanager.get(cacheEntries.COUNTRIES);
    }

}
*/
class ActivityOverview{
    #activities;
    #activity_limit;
    #data;
    #factory;
    #margin;
    #detector;
    #countryMargin;
    #cachemanager;

    constructor(data){
        this.#data = data.filter(d=>d["map"]["summary_polyline"]!=null);
        this.#factory = new Factory(Activity);
        this.#margin = 0.1;
        this.#countryMargin = 1;
        this.#activities = new Array();
        this.#detector = new zoneDetector();
        this.countries = new Array();
        this.areas = new Array();
        this.new_ids = new Array();
        this.#activity_limit = undefined;
        this.#cachemanager = new CacheManager();
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
        /*
        Function that returns a collection of Activities from the data contained in this class.
        If the activities were cached, they are taken directly from cache, otherwise they are
        produced from scratch from the data.
        Cached data is compared to the list of activities' ids, so that only the relevant activities
        are used. Plus, the new / updated activities are added.

        not a Promise.
        */

        // if the activities were not produced earlier, produce them now:
        if (this.#activities.length==0){
            // this.#cachemanager.clear(cacheEntries.ACTIVITIES);
            // console.log("cleared activities", this.#cachemanager.get(cacheEntries.ACTIVITIES));
            // getting cached data
            this.#activities = this.#getCached(cacheEntries.ACTIVITIES);
            if (this.#activities!=null){
                // get a list of ids to compare with the data
                let cache_ids = this.#activities.map(activity => activity.id);
                this.new_ids = this.#data.map(activity => activity["id"]);

                // using only activities that were not deleted by the user
                cache_ids = cache_ids.filter(id => this.new_ids.includes(id));
                this.#activities = this.#activities.filter(a => cache_ids.includes(a.id) );
                // adding ids of new activities
                this.new_ids = this.new_ids.filter(id => !cache_ids.includes(id));
            }

            else {
                // all activities are new and should be recalculated and produced
                this.new_ids = this.#data.map(activity => activity["id"]);
            }
            if (this.#activities==null || this.#activities=="null"){
                this.#activities = new Array();
            }
            
            // produce missing activities and append them to the cached ones
            this.#activities = this.#activities.map(d=>this.#factory.make(d.data))
                                               .concat(this.#data.filter(a => this.new_ids.includes(a["id"]))
                                               .map(d=>this.#factory.make(d)));
        }
        
        // cache all the activities to reuse them next time
        
        this.#cachemanager.add(cacheEntries.ACTIVITIES, this.#activities.slice(0, 45));
        return this.#activities;
    }

    #getCached(key){
        return this.#cachemanager.get(key);
    }

    getStartCoords(){
        return this.#data.map(d=>d["start_latlng"]).filter(d=>d.length!=0);
    }

    getEndCoords(){
        return this.#data.map(d=>d["end_latlng"]).filter(d=>d.length!=0);
    }

    getCountries(){
        /*
        Function that returns countries relevant to the athlete's activity
        */
        if (this.countries.length > 0){
            // if the countries were already calculated, return them
            let c = this.countries;
            return new Promise ((resolve) => resolve(c));
        }
        if (this.#activities.length==0){
            // produce activites in case they were not produced earlier
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