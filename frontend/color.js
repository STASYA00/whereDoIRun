class Color{

    #hex;
    #colorvalues;
    #hash;
    

    constructor(value){
        this.#hash = "#";
        if (value instanceof String){
            this.#hex = value;
            if (value[0]!=this.#hash){
                this.#hex = this.#hash + this.#hex;
            }
            this.#colorvalues = 0;
        }
    }
}