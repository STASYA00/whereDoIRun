class User{
    constructor(userId){
        //tested
        this.id = userId;
        this.activities = new Collection(Activity);
        this.#getActivities();
    }

    #getActivities(){
        let f = new Factory(Activity);
        sendRequest("activities", "GET").then(result => result.map(activity => this.activities.add(f.make(activity))))
        //.then(res => console.log(this.activities.collection.length));
    }
}