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
    }

    decodeCoords(encodedCoords: string){
        
    }
}
export { Activity };