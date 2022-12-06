class Collection<T> {
    collection: T[];
    constructor() {

        this.collection = [];
    }
    add(element: T) {

        this.collection.push(element)
    }
    length(): number {
        return this.collection.length;
    }
}
export { Collection };