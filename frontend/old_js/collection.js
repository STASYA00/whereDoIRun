class Collection{
    #elementType;
    
    constructor(T){
        this.collection = new Array();
        
        this.#elementType = T;
        
    }

    add(item){
        /*
        Function that adds an item to the collection
        */
       if (item instanceof this.#elementType){
        this.collection.push(item);
       }
       
    }
    get(id){
        /*
        Function that returns the element by its id
        */
       
       return this.collection.filter(data => data.id==id)[0];
    }
    length(){
        return this.collection.length;
    }
    remove(item){
        /*
        Function that removes the item from the collection
        */
        this.collection = this.collection.filter(data => data!=item);
    }
    removeByIndex(index){
        /*
        Function that removes the item from the collection by its index
        */
       this.collection.splice(index, index+1);
    }
}