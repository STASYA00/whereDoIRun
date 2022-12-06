class Factory<T> {

    constructor() {
    }

    make(type: { new(params: any): T; }, params: any = null): T {

        return new type(params);
    }
}
export { Factory };