class Page{
    #introMargin;
    buttonTop;
    constructor(mainWindow, params){
        this.window = mainWindow;
        this.id = undefined;
        this.setID().then(r=>this.make(params));
    }

    clear(){
        while (this.id==undefined){
            sleep(500);
        }
        d3.selectAll("*")
            .filter(d=>d!=undefined)
            .filter(d=>d.pageid==this.id)
            .remove();
    }

    make(params){}

    async setID(){
        return await generateUUID().then(r => {this.id = r; console.log("ID:", this.id);});
    }
}

class AuthPage extends Page{
    #introMargin;
    buttonTop;
    
    constructor(w, params){
        super(w, params);
        this.#introMargin = 60;
        this.buttonTop = 220;
    }

    make(params){
        
        let el1 = new introText(this.id);
        let el2  = new connectButton(this.id);
        el1.make(this.window, this.window.left + (this.window.canvas.width - this.window.left * 2) * 0.5, 
                            this.window.topMargin + this.#introMargin);
        el2.make(this.window, Math.ceil(this.window.canvas.width * 0.5), this.buttonTop);

        //this.children = [el1, el2];
    }
}

class CountryPage extends Page{
    constructor(w, params){
        super(w, params);
        this.buttonOffset = 12;
        this.leftMargin = 120;
        this.buttonTop = 100;
        this.barOffset = 3;
    }

    callfront(params){
        return this.window.overview.getCountries();
    }

    nextPage(){
        return pageCatalog.REGION;
    }

    getProcent(element){
        
        return Math.round(element.getScore() * 100 / this.window.overview.getActivities().length);
    }
    
    make(params){ 
        
        this.callfront(params).then(r=>{
            console.log(r);
            r.forEach((element, ind, r) => {
            console.log(element);  // Area instance
            new Button(this.id, `${element.name[0]}\t-\t${this.getProcent(element)}%`)
                    .make(this.window, 
                            this.window.left + (this.window.canvas.width - this.window.left * 2) * 0.5, 
                            this.window.topMargin + this.buttonTop + ind * (this.buttonOffset + Button.height),
                            this.nextPage(), element
                            );
            new ProcentBar(this.id, this.getProcent(element))
                            .make(this.window,
                                this.window.left + (this.window.canvas.width - this.window.left * 2 - Button.width) * 0.5 + this.barOffset,
                                this.window.topMargin + this.buttonTop + 
                                ind * (this.buttonOffset + Button.height)+ Button.height - this.barOffset - ProcentBar.height,
                                );
        })
    });
    }
}

class RegionPage extends CountryPage{
    constructor(w, params){
        super(w, params);
    }
    callfront(element){
        
        return this.window.overview.getAreas(element);
    }

    nextPage(){
        return pageCatalog.CITY;
    }
}

class CityPage extends RegionPage{
    constructor(w, params){
        super(w, params);
    }
    callfront(element){
        
        return element.getZones()
            .then(async(r) => {
            let res = await Promise.all(r.map(async (zone) => {
                return zone.scoreAll(this.window.overview.getActivities())
                .then(r =>{
                        console.log("zone scored", zone.getScore());
                        return zone;})
            }));
            console.log(r);
            return r;
        
        });
        };
    

    nextPage(){
        return pageCatalog.ZONE;
    }
}

class ZonePage extends RegionPage{
    constructor(w, params){
        super(w, params);
    }
    callfront(element){
        console.log("element", element);
        return new Promise((res) => res([]));
        //return element.getZones();
    }

    nextPage(){
        return pageCatalog.MAP;
    }
}

class MapPage extends RegionPage{
    constructor(w, params){
        super(w, params);
    }
    callfront(element){
        return element.getZones();
    }

    nextPage(){
        return pageCatalog.MAP;
    }

    make(params){
        console.log("map page", params);
    }
}

class LoadingPage extends Page{
    buttonTop;
    buttonOffset;
    leftMargin;
    constructor(params){
        super(params);
        this.leftMargin = 160;
        this.buttonTop = 180;
    }
    make(){
        
        new LoadingElement(this.id).make(this.window, 
                                        this.window.left + (this.window.canvas.width - this.window.left * 2) * 0.5, 
                                        this.window.topMargin + (this.window.bottom - this.window.topMargin - LoadingElement.height) * 0.5);
        }
    }


const pageCatalog = {
    AUTH : AuthPage,
    COUNTRY : CountryPage,
    LOAD: LoadingPage,
    REGION: RegionPage,
    CITY: CityPage,
    ZONE: ZonePage,
    MAP: MapPage
}
