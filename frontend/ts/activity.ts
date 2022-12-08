import { decode } from "./google_codec";

class Activity {
    id: string;
    activityType: string;
    coords: number[][];
    constructor(activityId: string, activityType: string, encodedCoords: string | undefined) {
        this.id = activityId;
        this.activityType = activityType;
        this.coords = [];
        if (encodedCoords!=undefined){
            this.decodeCoords(encodedCoords);
        }
        console.log(this.coords);
    }

    decodeCoords(encodedCoords: string){
        this.coords = decode(encodedCoords, 6);
    }
}
interface StravaStruct{
    id: string;
    type: string;
    map: {summary_polyline: string};
}

export { Activity, StravaStruct };