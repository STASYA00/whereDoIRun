import { Collection } from "./collection";
import { Activity } from "./activity";
import { FactoryActivity } from "./factory";
import { Request, ActivitiesRequest, requests } from "./request";

class User {
    id: string | null;
    activities: Collection<Activity>;
    req: ActivitiesRequest;
    factory: FactoryActivity;
    constructor(userId: string | null) {
        this.id = userId;
        this.req = new requests.ACTIVITIES();
        this.activities = new Collection<Activity>();
        this.factory = new FactoryActivity();
    }

    getActivities(): Promise<Collection<Activity>> {
        if (this.activities.length() > 0) {
            return new Promise((r) => (r(this.activities)));
        }
        return this.req.call().then(result => {
            result.map(activity => this.activities.add(this.factory.make(activity["id"], activity["type"],
                                                                         activity["map"]["summary_polyline"])));
            return this.activities;
        });
    }
}

export { User };