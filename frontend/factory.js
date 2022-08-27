class Factory{
    #elementType;
    constructor(T){
        this.#elementType = T;
    }

    make(attributes){
        return this.#make(attributes);
    }

    #make(attributes){
        // if (this.#elementType==Activity){
        //     var [arg1, arg2, arg3] = attributes;
        //     return new this.#elementType(arg1, arg2, arg3);
        // }
        
        return new this.#elementType(attributes);
    }
}