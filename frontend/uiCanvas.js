class buttonIcon{
    static BASE= "../assets/attr/";

    static BUTTONFOLDER = "1.1 connect with strava/"
    static POWEREDFOLDER = "1.2 strava api logos/powered by Strava/"

    static ORANGE = "orange";
    static WHITE = "white";
    static GRAY = "gray";

    static getButton(color){
        if (color==undefined || color==this.GRAY){
            color = this.ORANGE;
        }
        return this.BASE + this.BUTTONFOLDER + `btn_strava_connectwith_${color}/btn_strava_connectwith_${color}@2x.png`;
    }

    static getPowered(color){
        if (color==undefined){
            color = htis.ORANGE;
        }
        return this.BASE + this.POWEREDFOLDER + `pwrdBy_strava_${color}/api_logo_pwrdBy_strava_horiz_${color}.png`;
    }
}

class graphicElement{
    
    constructor(pageid){
        this.width=100;
        this.height=100;
        this.imPath="";
        this.imTag = "";
        this.pageid = pageid;
        this.id = undefined;
        this.#setId();
    }

    #bgr(canvas){
        /*
        Function that uses an image as a fill for the graphical element.
        The image path is defined by imPath variable.
        Reference:
        https://stackoverflow.com/questions/19033034/can-i-use-images-as-the-background-rectangles-for-d3-treemaps
        */
        canvas.append("defs")
            .append("pattern")
                .attr("id", this.imTag)
                .attr('width', 1)
                .attr('height', 1)
            .append("image")
                .attr("xlink:href", this.imPath)
                .attr('width', this.width)
                .attr('height', this.height);
    }

    datum(mainWindow){
        return {"el": this,
                "mainWindow": mainWindow,
                "pageid": this.pageid
            }
    }

    formatCoords(coords){
        return coords.filter(c=>c!=undefined)
                    .map(c=>[`${c[0].toString()},${c[1].toString()}`])
                    .join(",");
        }

    #setId(){
        if (this.id==undefined){
            generateUUID().then(r=>this.id = r);
        }
    }


    getCoords(x, y){
        /*
        Function that maps the element to its position on the canvas.
        Default: (x, y) is considered left top angle of the element
        */
        return [[x, y], [x, y + this.height],[x + this.width, y + this.height],[x + this.width, y], [x, y]];
    }

    getFill(){
        return `url(#${this.imTag})`;
    }

    onClick(){
        /*
        Function that defines what happens if the element is clicked.
        */
    }

    make(mainWindow, x, y){
        
        if (x==undefined){
            x = 0;
        }
        else{
            x = x - this.width * 0.5;
        }
        if (y==undefined){
            y = 0;
        }
        
        let coords = this.getCoords(x, y);
        coords = this.formatCoords(coords);
        
        this.#bgr(mainWindow.canvas);

        mainWindow.canvas.append("polygon")
            .attr("fill", this.getFill())
            .attr("points", coords)
            .attr("id", this.id)
            .datum(this.datum())
            .on("click", function(d){
                d.el.onClick(mainWindow);
             });
    }
}

class connectButton extends graphicElement{
    constructor(params){
        super(params);
        this.height = 48;
        this.width = 193;
        this.imPath = buttonIcon.getButton(buttonIcon.ORANGE);
        this.imTag = "stravaConnect";
    }
    
    onClick(mainWindow){
        let m = 50;  // margin by which the window is larger than the canvas
        auth(mainWindow.left - m, mainWindow.top - m, 
            (mainWindow.left+ m) * 2, (mainWindow.top + m) * 2)
                    .then(res => mainWindow.children.filter(r=>r.id==this.pageid)
                                                    .forEach(element => {
                                                        element.clear();
                                                    }))
                    .then(r=>sendRequest("activities", "GET")
                                .then(r=>new ActivityOverview(r))
                                .then(r=>r.getCountries()
                                    .then(r=>console.log("countries", r))));
        mainWindow.makePage(pageCatalog.COUNTRY);    
    }
        
}

class CountryButton extends graphicElement{
    constructor(params){
        super(params);
        this.height = 40;
        this.width = 320;
    }
    getFill(){
        return "#FAFAFA";
    }

    make(mainWindow, x, y){
        
        if (x==undefined){
            x = 0;
        }
        else{
            x = x - this.width * 0.5;
        }
        if (y==undefined){
            y = 0;
        }
        
        let coords = this.getCoords(x, y);
        coords = this.formatCoords(coords);

        mainWindow.canvas.append("polygon")
                .attr("fill", this.getFill())
                .attr("stroke", "none")
                .attr("stroke-width", 0)
                .attr("points", coords)
                .attr("id", this.id)
                .datum(this.datum())
                .on("click", function(d){
                    d.el.onClick(mainWindow);
                });
        mainWindow.canvas.append("text")
                .text("Country")
                .attr("x", x + this.width * 0.5)
                .attr("y", y + this.height * 0.5)
                .attr("text-anchor", "middle")
                .attr("fill", "#000000")
                .datum(this.datum())
             ;
    }
}

class creditText extends graphicElement{
    
    constructor(params){
        super(params);
        this.width = 100;
        this.height = 19;
        this.imPath = buttonIcon.getPowered(buttonIcon.ORANGE);
        this.imTag = "stravaPowered";
    }
    getCoords(x, y){
        x = x + this.width * 0.5;
        y = y - this.height * 0.5;
        return [[x, y], [x, y + this.height], 
                [x + this.width, y + this.height], 
                [x + this.width, y], [x, y]];
    }
}

class introText extends graphicElement{
    
    constructor(params){
        super(params);
        this.content = ["Tired of running same routes over and over again?", 
                        "Discover how much you explored each city area!"];
    }

    make(mainWindow, x, y){
        mainWindow.canvas.append("text")
                .text(this.content[0])
                .attr("x", x)
                .attr("y", y)
                .attr("text-anchor", "middle")
                .attr("fill", "#000000")
                .datum(this.datum())
            .append("tspan")
                .attr("x", x)
                .attr("y", y + 20)
                .attr("text-anchor", "middle")
                .text(this.content[1])
                .datum(this.datum());
    }
}

class mainCanvas{

    
    #creditMargin;

    constructor(){
        this.topMargin = 100;
        this.id = undefined;
        this.overview = undefined;
        this.children = [];
        this.#creditMargin = 20;

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
        new creditText(this.id).make(this, this.left + this.#creditMargin, this.bottom - this.#creditMargin);
    }

    async #setID(){
        return await generateUUID().then(r => {this.id = r; console.log("ID canvas:", this.id);});
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
    }

    isAuthorized(){
        let l = new LocalRequest("has_token");
        return l.call();
    }

    makeOverview(){
        if (this.overview!=undefined){
            return this.overview;
        }
        return sendRequest("activities", "GET").then(r=>new ActivityOverview(r));
    }

    makePage(page){
        this.clear();
        let p = new page(this);
        this.children.push(p);
    }

    async make(){
        
        this.base();
        this.isAuthorized().then(r =>{
            if (r == "0"){
                this.makePage(pageCatalog.AUTH);
            }
            else{
                this.makeOverview().then(r=>this.overview = r)
                                   .then(r => this.makePage(pageCatalog.COUNTRY));
                
            }
        });            
    }
}

