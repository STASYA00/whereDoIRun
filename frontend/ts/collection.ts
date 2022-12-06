class Collection<T> {
    collection: T[];
    constructor() {

        this.collection = [];
    }
    add(element: T) {

        this.collection.push(element)
    }
}
export { Collection };