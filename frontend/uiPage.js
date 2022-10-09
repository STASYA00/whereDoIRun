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
        return await generateUUID().then(r => {this.id = r; 
            //console.log("ID:", this.id);
        });
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
        let el3  = new testButton(this.id);
        el1.make(this.window, this.window.left + (this.window.canvas.width - this.window.left * 2) * 0.5, 
                            this.window.topMargin + this.#introMargin);
        el2.make(this.window, Math.ceil(this.window.canvas.width * 0.5), this.buttonTop);
        el3.make(this.window, Math.ceil(this.window.canvas.width * 0.5), this.buttonTop + 70);

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
            r.forEach((element, ind, r) => {
            // element is an Area instance
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
            let _ = await Promise.all(r.map(async (zone) => {
                return zone.scoreAll(this.window.overview.getActivities())
                .then(r =>{
                        console.log("zone scored", zone.getScore());
                        return zone;})
            }));
            return r;
        });
        };
    

    nextPage(){
        return pageCatalog.MAP;
    }
}

class ZonePage extends RegionPage{
    constructor(w, params){
        super(w, params);
    }
    callfront(element){
        return new Promise((res) => res([]));
        //return element.getZones();
    }

    nextPage(){
        return pageCatalog.MAP;
    }
}

class MapPage extends RegionPage{
    #margin;
    constructor(w, params){
        super(w, params);
        this.#margin = 30;
    }
    callfront(element){
        return new Promise((res) => res([]));
    }

    nextPage(){
        return pageCatalog.MAP;
    }

    make(zone){
        
        let max_score = 0;
        let min_score = 4;
        let percent = 0;
        let w = this.window.canvas.width - 2 * this.window.left - 2 * this.#margin;
        let h = this.window.bottom - this.window.top - 2 * this.#margin - 
                                             this.window.creditMargin - BackButton.height * 4;
        let x1 = this.window.left + this.#margin;
        let y1 = this.window.topMargin + this.#margin;

        zone.getRelativeWidth().then(proportion => {
            if (proportion > w * 1.0 / h){
                // width is larger than the default; the width is kept, the height is adjusted
                console.log("width is adjusted", proportion, w, h);
                w = h * 1.0 / proportion;
                x1 = this.window.left + 0.5 * (this.window.canvas.width - 2 * this.window.left - w);
                console.log(w, h, y1);
            }
            else{
                // height is larger than it is supposed to be; height is kept, adjusting the width
                console.log("height is adjusted");
                h = w * 1.0 / proportion;
                
                console.log(w, h, y1);
            }
            return "";
        }).then(r => {
            let drawer = new ZoneDrawer(this.window, [x1, y1, x1 + w, y1 + h], zone);
            drawer.setScale();
            zone.getBoundary().then(b => {
                let dark_mode = "#212121";
                let light_mode = "#EFEFEF"; //EFEFEF
                drawer.drawArea(b, light_mode, zone);
                zone.getStreets().then(streets => streets.filter(r=>r!=undefined))
                .then(streets => {
                    
                    let activities = this.window.overview.getActivities();
                    activities.forEach(activity => streets.forEach(street =>{
                        street.score(activity); // TODO: TAKES LONG TIME
                    }));
                    max_score = Math.max(...streets.map(s=>s.getScore()));
                    percent = statsCalculator.streetPercentage(streets);
                    let el = new statsText([Math.round(percent * 100) * 0.01]);
                    el.make(this.window, this.window.left + 550, this.window.topMargin + 50);
                    return streets;
                })
                .then(streets => 
                    streets.forEach(street => {
                        // emil mode
                        let min_color = 84;
                        let max_color = 227;
                        
                        let normalized_value = (max_score - street.getScore()) * 1.0 / max_score;
                        let value = Math.round(min_color + normalized_value * (max_color - min_color));
                        value = value.toString(16);
                         // red mode
                        min_color = 20;
                        max_color = 200;
                        normalized_value = street.getScore() * 1.0 / max_score;
                        value = Math.round(min_color + normalized_value * (max_color - min_color));
                        value = value.toString(16);
                        // 252 76 2
                        // trend:
                        // #a554e3 - purple (84)
                        // #a5e3ed - turquoise (227)
                        let light_mode = `#${value}${value}${value}`;
                        let red_mode = `#${value}2323`;
                        let red_light_mode = `#ff${value}${value}`;
                        let black_light_mode = `#${value}${value}${value}`;
                        let emil_mode = `#a5${value}ed`;
                        let black_mode = `#${value}0000`;
                        drawer.drawLines(street.coords, black_mode);
                        return;
                    }
                    ));
                    let visualize_buildings = false;
                    if (visualize_buildings == true){
                        let building_color = "#313131";
                    let building_light_color = "#000000"; // EAEAEA
                    zone.getBuildings().then(res=>{
                        return res.filter(r=>r!=undefined).map(r=>drawer.drawArea(r, building_light_color, zone))});
                    return;
                    }
                    return;
                });
        }).then(
            r => {
                
            }
        );
        
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
