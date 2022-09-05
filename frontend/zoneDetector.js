class zoneDetector{
    
    constructor(){
        
    }

    async make(activity) {
        return await this.#make(activity);
    }

    async #make(activity){
        let ourcoords = activity.getStartCoords();
        //let r = new OverpassRequest([4, ourcoords]);
        let r = new CountryRequest(ourcoords);
        
        let result = await r.call();  // list of cities
        console.log("countries", result);
        
        result = result["elements"].filter(r=>this.#withinZone(r, activity));
        let distances = result.map(r=>this.#getProportionalDistances(r, activity));
        
        let mindist = distances.indexOf(Math.min(...distances));
        //let mindist = 0;
        result = result[mindist];
        return new Area(result["tags"]["name"], intersectionCalc.centerFromBounds(result["bounds"]));
    }

    #getDistances(zone, activity){
        let b = zone["bounds"];
        let center = intersectionCalc.centerFromBounds([b["minlon"], b["minlat"], b["maxlon"], b["maxlat"]]);
        return this.#distance(center, activity.getStartCoords()) + this.#distance(center, activity.getEndCoords());
    }

    #getProportionalDistances(zone, activity){
        let b = zone["bounds"];
        let distance = this.#getDistances(zone, activity);
        let side = Math.max(b["maxlon"] - b["minlon"], b["maxlat"] - b["minlat"]);
        return distance / side;
    }

    #distance(zoneCoords, activityCoords){
        if (Object.keys(zoneCoords).includes("lat")){
            return vectorLength((zoneCoords["lat"] - activityCoords[0]), (zoneCoords["lon"] - activityCoords[1]))
        }
        else {
            return vectorLength((zoneCoords[0] - activityCoords[0]), (zoneCoords[1] - activityCoords[1]))
        }
        
    }

    #withinZone(zone, activity){
        
        let b = zone["bounds"];
        let r = d3.polygonHull([[b["minlon"],b["minlat"]],[b["maxlon"],b["maxlat"]],
                                [b["minlon"],b["maxlat"]],[b["maxlon"],b["minlat"]]]);
        let c = activity.getCoords()[0];

        return d3.polygonContains(r, [c[0], c[1]]);
        // return intersectionCalc.makePolyline(r, activity.getCoords());
    }

    
}