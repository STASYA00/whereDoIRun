import {Activity} from "./activity";

class Factory<T> {

    constructor() {
    }

    make(type: { new(params: any): T; }, params: any = null): T {

        return new type(params);
    }
}
class FactoryActivity {

    constructor() {
    }

    make( id: string, activityType: string, encodedCoords: string): Activity {

        return new Activity(id, activityType, encodedCoords);
    }
}
export { Factory, FactoryActivity };