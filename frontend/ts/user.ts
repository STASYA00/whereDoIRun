import { Collection } from "./collection";
import { Activity } from "./activity";
import { Factory } from "./factory";
import { Request, ActivitiesRequest, requests } from "./request"

class User {
    id: string;
    activities: Collection<Activity>;
    req: ActivitiesRequest;
    factory: Factory<Activity>;
    constructor(userId: string) {
        this.id = userId;
        this.req = new requests.ACTIVITIES();
        this.activities = new Collection<Activity>();
        this.factory = new Factory();
        this.getActivities();

    }

    getActivities() {
        this.req.call().then(result => result.map(activity => this.activities.add(this.factory.make(Activity, activity))))
    }
}

export { User };