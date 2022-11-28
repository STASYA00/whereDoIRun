class CacheManager{
    #array_key;
    constructor(){
        this.name = "wheredoirun";
        this.#array_key = "cached_array";
    }

    add(key, value){
        let v = {};
        if (value instanceof Array){
            v[this.#array_key] = value.map(a => JSON.stringify(a));
            v = JSON.stringify(v);
        }
        else{
            v = JSON.stringify(value);
        }
        window.localStorage.setItem(key, v);
    }

    clear(key){
        window.localStorage.removeItem(key);
    }

    control(){
        return 'caches' in window;
    }

    get(key){
        let res = JSON.parse(window.localStorage.getItem(key));
        if (res!= null && res!=undefined){
            if (Object.keys(res).includes(this.#array_key)){
                return res[this.#array_key].map(r => JSON.parse(r));
            }
        }
        
        return res;
    }
}

const cacheEntries = {
    ACTIVITIES: "activities",
    COUNTRIES: "countries",
    CITIES: "cities",
    ZONES: "zones",
}