class Page{
    #introMargin;
    #buttonTop;
    constructor(mainWindow){
        this.window = mainWindow;
        this.id = undefined;
        this.setID().then(r=>this.make());
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

    make(){}

    async setID(){
        return await generateUUID().then(r => {this.id = r; console.log("ID:", this.id);});
    }
}

class AuthPage extends Page{
    #introMargin;
    #buttonTop;
    
    constructor(params){
        super(params);
        this.#introMargin = 60;
        this.#buttonTop = 220;
    }

    make(){
        
        let el1 = new introText(this.id);
        let el2  = new connectButton(this.id);
        el1.make(this.window, this.window.left + (this.window.canvas.width - this.window.left * 2) * 0.5, 
                            this.window.topMargin + this.#introMargin);
        el2.make(this.window, Math.ceil(this.window.canvas.width * 0.5), this.#buttonTop);

        //this.children = [el1, el2];
    }
}

class CountryPage extends Page{
    #introMargin;
    #buttonTop;
    constructor(params){
        super(params);
        this.#introMargin = 60;
        this.#buttonTop = 220;
    }
    make(){
        
        let el1 = new CountryButton(this.id);
        el1.make(this.window, this.window.left + (this.window.canvas.width - this.window.left * 2) * 0.5, 
                            this.window.topMargin + this.#introMargin);

        //this.children = [el1, el2];
    }
}

const pageCatalog = {
    AUTH : AuthPage,
    COUNTRY : CountryPage
}
