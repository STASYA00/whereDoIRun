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
    constructor(data){
        this.#data = data;
        this.#factory = new Factory(Activity);
        this.#margin = 0.1;
        this.#activities = new Array();
        this.#detector = new zoneDetector();
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
            this.#activities = this.#data.filter(d=>d["map"]["summary_polyline"]!=null).map(d=>this.#factory.make(d));
        }
        return this.#activities;
    }

    getStartCoords(){
        return this.#data.map(d=>d["start_latlng"]).filter(d=>d.length!=0);
    }

    getEndCoords(){
        
        return this.#data.map(d=>d["end_latlng"]).filter(d=>d.length!=0);
    }

    async getAreas(){
        if (this.#activities.length==0){
            this.getActivities();
        }
        
        let cities = new Array();
        let newcities = new Array();
        cities.push(this.#activities[0]);
        
        this.#activities.forEach(r=>{
            let sum = cities.map(c=>vecDiff(c.getStartCoords(), r.getStartCoords())>this.#margin);
            if(!sum.includes(false)){
                cities.push(r);
            }
    });
    await Promise.all(cities.slice(0, 3).map(async (city) => {
        try {
            let c = await this.#detector.make(city);
            let curNames = newcities.map(c=>c.name[0]);
            if (!curNames.includes(c.name[0])){
                newcities.push(c);
            }
        } catch (error) {}
      }));

    // for(let i=0; i<cities.length; i++){ //cities.length
    //     try {
    //         let c = await this.#detector.make(cities[i]);
    //         let curNames = newcities.map(c=>c.name[0]);
    //         if (!curNames.includes(c.name[0])){
    //             newcities.push(c);
    //         }
            
    //     } catch (error) {
    //         continue;
    //     }
        
    // }
        return newcities;
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