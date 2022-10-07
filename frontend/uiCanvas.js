class mainCanvas{

    #loadingpage;

    constructor(){
        
        this.topMargin = 100;
        this.id = undefined;
        this.overview = undefined;
        this.children = [];
        this.creditMargin = 20;

        this.canvas = d3.select("svg").append("svg");
        this.canvas.width = window.innerWidth,
        this.canvas.height = window.innerHeight;

        this.left = Math.ceil(this.canvas.width * 0.25);
        this.top = Math.ceil(this.canvas.height * 0.25);
        this.bottom = this.canvas.height - this.top;
        
        this.coords = [[this.left, this.topMargin],
                       [this.canvas.width - this.left, this.topMargin],
                       [this.canvas.width - this.left, this.bottom],
                       [this.left, this.bottom],
                       [this.left, this.topMargin]];
        this.coords = this.coords.filter(c=>c!=undefined)
                        .map(c=>[`${c[0].toString()},${c[1].toString()}`])
                        .join(",");
        this.#setID().then(r=>this.make());
        this.curInd = 0;
        this.#loadingpage = undefined; 
    }

    #dropShadow(){
        /* For the drop shadow filter... */
        // https://stackoverflow.com/questions/12277776/how-to-add-drop-shadow-to-d3-js-pie-or-donut-chart
        // https://observablehq.com/@bumbeishvili/svg-drop-shadows

        var defs = this.canvas.append("defs");
        var filter = defs.append("filter")
            .attr("id", "dropshadow")

        filter.append("feGaussianBlur")
            .attr("in", "SourceAlpha")
            .attr("stdDeviation", 20)
            .attr("result", "blur");

        filter.append("feOffset")
            .attr("in", "blur")
            .attr("dx", 2)
            .attr("dy", 2)
            .attr("result", "offsetBlur")

        filter.append("feFlood")
            .attr("in", "offsetBlur")
            // .attr("flood-color", "#3d3d3d")
            .attr("flood-opacity", "0.25")
            .attr("result", "offsetColor");

        filter.append("feComposite")
            .attr("in", "offsetColor")
            .attr("in2", "offsetBlur")
            .attr("operator", "in")
            .attr("result", "offsetBlur");
    
        var feMerge = filter.append("feMerge");
    
        feMerge.append("feMergeNode")
            .attr("in", "offsetBlur")
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

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
        this.#dropShadow();
        this.canvas.append("polygon")
            .attr("fill", "#FFF")
            .style("fill-opacity", 1)
            .style("stroke-width", 0)
            .style("stroke", "none")
            .attr("points", this.coords)
            .attr("filter", "url(#dropshadow)")
            .datum({"children": this.children})
            ;

        this.#footer();
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

    makeOverview(){
        if (this.overview!=undefined){
            return new Promise ((res)=>res(this.overview));
        }
        let l = undefined;
        if (mode==modes.RELEASE){
            l = new requests.LOCAL("activities");
        }
        else{
            l = new requests.LOCAL("test/activities");
        }
            
        return l.call().then(r=>new ActivityOverview(r));
        
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
                this.makePage(pageCatalog.AUTH);
            }
            else{
                
                //this.loading();
                this.makeOverview().then(r=>{
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

