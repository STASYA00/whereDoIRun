class mainCanvas{

    #loadingpage;

    constructor(){
        
        this.topMargin = 100;
        this.id = undefined;
        this.overview = undefined;
        this.children = [];
        this.creditMargin = 20;

        //this.canvas = d3.select("svg").append("svg");
        // this.canvas.width = window.innerWidth,
        // this.canvas.height = window.innerHeight;

        // this.left = Math.ceil(this.canvas.width * 0.25);
        // this.top = Math.ceil(this.canvas.height * 0.25);
        // this.bottom = this.canvas.height - this.top;
        
        // this.coords = [[this.left, this.topMargin],
        //                [this.canvas.width - this.left, this.topMargin],
        //                [this.canvas.width - this.left, this.bottom],
        //                [this.left, this.bottom],
        //                [this.left, this.topMargin]];
        // this.coords = this.coords.filter(c=>c!=undefined)
        //                 .map(c=>[`${c[0].toString()},${c[1].toString()}`])
        //                 .join(",");
        this.#setID().then(r=>this.make());
        // this.curInd = 0;
        // this.#loadingpage = undefined; 
    }

    #footer(){
        new creditText(this.id).make(this, this.left + this.creditMargin, this.bottom - this.creditMargin);
        let backB_centerX = (this.canvas.width - Button.width + BackButton.width) * 0.5;
        let nextB_centerX = (this.canvas.width + Button.width - NextButton.width) * 0.5;
        new BackButton(this.id)
                    .make(this, backB_centerX,
                        this.bottom - this.creditMargin - BackButton.height * 2);
        new NextButton(this.id)
                        .make(this, nextB_centerX,
                            this.bottom - this.creditMargin - NextButton.height * 2);
        for (let i = 0; i<3; i++){
            new DecElement(this.id, i).make(
                this, backB_centerX + BackButton.width * 0.5 + (nextB_centerX - backB_centerX - BackButton.width) * 0.25 * (i+1),
                    this.bottom - this.creditMargin - NextButton.height * 1.5 - DecElement.height * 0.5
            );
        }
    }

    #setID(){
        return generateUUID().then(r => {this.id = r; console.log("ID canvas:", this.id);});
    }

    base(){
        let d = document.getElementsByTagName("body")[0];
        let canvas = document.createElement("div");
        canvas.className = "canvas";
        d.appendChild(canvas);
        //this.#footer();
    }

    clear(){
        this.children.forEach(child => child.clear());
        //this.stoploading();
    }

    isAuthorized(){
        let l = new requests.LOCAL("has_token");
        return l.call();
    }

    loading(){
        this.#loadingpage.make();
        console.log("loading");
    }

    stoploading(){
        this.#loadingpage.clear();
    }

    #initLoading(){
        this.#loadingpage = new pageCatalog.LOAD(this);
        this.#loadingpage.clear();
        
    }

    getOverview(){
        /*
        Function that gets an overview of an athlete's activity
        Overview contains the activities with their data (id, coords etc), countries
        in which these activities were performed.

        returns a Promise.
        */

        if (this.overview!=undefined){
            return new Promise ((res)=>res(this.overview));
        }
        
        // If there is no overview, create one

        let req = undefined; // request to make to the server
        // getting all the activities from strava or from the test file
        // this request is made independent of whether we have cached activities or not, since
        // 1. the activities might be updated (deleted or added)
        // 2. it is a one-time operation that does not put heavy load on strava server
        // 3. it is a one-time operation that does not take long time

        if (mode==modes.RELEASE){
            // request to strava API - release mode
            req = new requests.LOCAL("activities");
        }
        else{
            // request to grab activities from the test file - test mode
            req = new requests.LOCAL("test/activities");
        }
        return req.call().then(r=>new ActivityOverview(r));
        
    }

    makePage(page, params){
        this.clear();
        let p = new page(this, params);
        this.children.push(p);
        this.curInd += 1;
    }

    async make(){
        this.base();
        //this.#initLoading();
        this.isAuthorized().then(r =>{
            console.log("is auth", r);
            if (r == "0"){
                //this.makePage(pageCatalog.AUTH);
            }
            else{
                
                //this.loading();
                this.getOverview().then(r=>{
                                        this.overview = r; 
                                        return this.overview.getCountries();
                                    })
                                   .then(r => {
                                    this.makePage(pageCatalog.COUNTRY)
                                });
                
            }
        });            
    }
}

