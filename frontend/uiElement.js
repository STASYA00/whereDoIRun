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

    datum(mainWindow, page, geoArea){
        return {"el": this,
                "mainWindow": mainWindow,
                "pageid": this.pageid,
                "area": geoArea,
                "page": page
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

/*
button with a callback that depends on a page ?

*/


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

class Button extends graphicElement{
    static height = 40;
    static width = 320;
    constructor(params, content){
        super(params);
        this.height = Button.height;
        this.width = Button.width;
        this.content = content;
    }
    getFill(){
        return "#FAFAFA";
    }
    getTextFill(){
        return "#000000";
    }
    getText(){
        return `${this.content}`;
    }
    make(mainWindow, x, y, page, geoArea){

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
                .datum(this.datum(mainWindow, page, geoArea))
                .on("click", function(d){
                    d.el.onClick(d);
                });
        mainWindow.canvas.append("text")
                .text(this.content)
                .attr("x", x + this.width * 0.5)
                .attr("y", y + this.height * 0.5)
                .attr("text-anchor", "middle")
                .attr("fill", this.getTextFill())
                .datum(this.datum())
             ;
    }

    onClick(datum){
        
        d3.selectAll("polygon")
            .filter(d=>d!=undefined)
            .filter(d=>d.el==this)
            .style("fill", "#EEE")
            .attr("stroke", "#000")
            .attr("stroke-width", 1);
        console.log(datum);
        datum.mainWindow.makePage(datum.page, datum.area);
    }
}

class BackButton extends Button{
    static height = 40;
    static width = 100;
    constructor(params){
        super(params);
        this.height = BackButton.height;
        this.width = BackButton.width;
        this.content = "BACK";
    }
    getFill(){
        return "#E0E0E0";
    }
    getText(){
        return `${this.content}`;
    }
    
    onClick(mainWindow){
        d3.selectAll("polygon")
            .filter(d=>d!=undefined)
            .filter(d=>d.el==this)
            .style("fill", "#EEE")
            .attr("stroke", "#000")
            .attr("stroke-width", 1);
        
        console.log(this.content);
    }
}

class NextButton extends Button{
    static height = 40;
    static width = 100;
    constructor(params){
        super(params);
        this.height = NextButton.height;
        this.width = NextButton.width;
        this.content = "NEXT";
    }
    getFill(){
        return "#212121";
    }
    getTextFill(){
        return "#FFFFFF";
    }
    getText(){
        return `${this.content}`;
    }
    
    onClick(mainWindow){
        d3.selectAll("polygon")
            .filter(d=>d!=undefined)
            .filter(d=>d.el==this)
            .style("fill", "#EEE")
            .attr("stroke", "#000")
            .attr("stroke-width", 1);
        
        console.log(this.content);
    }
}

class DecElement extends graphicElement{
    static height = 6;
    static width = 6;
    #textOffset;
    #textHeight;
    #hOffset;
    constructor(params, content){
        super(params, content);
        this.content = content;
        this.height = DecElement.height;
        this.width = DecElement.width;
    }
    getFill(){
        return this.content==0 ? "#212121" : "#BDBDBD";
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
    }

    onClick(mainWindow){}
}

class ProcentBar extends DecElement{
    static height = 2;
    static width = 320;
    constructor(params, content){
        super(params);
        this.height = ProcentBar.height;
        this.width = ProcentBar.width;
        this.content = content;
    }
    getFill(){
        return "#FC4C02";
    }
}

class LoadingElement extends graphicElement{
    static height = 120;
    static width = 50;
    #textOffset;
    #textHeight;
    #hOffset;
    constructor(params, content){
        super(params);
        this.height = LoadingElement.height;
        this.width = LoadingElement.width;
        this.content = ["fetch", "ing", "data", "..."];
        this.#textOffset = 10;
        this.#hOffset = 4;
        this.#textHeight = 20;
    }
    getFill(){
        return "#000";
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
        this.content.forEach((t, ind, arr) =>{
            mainWindow.canvas.append("text")
                .text(t.toUpperCase())
                .attr("x", x + this.width - this.#hOffset)
                .attr("y", y + (ind + 1) * this.#textOffset + (ind + 0.5) * this.#textHeight)
                .attr("text-anchor", "end")
                .attr('alignment-baseline', "middle")
                .attr("fill", "#FFF")
                .style("font-size", "12px")
                .datum(this.datum())
                .append("tspan")
             ;

        })
        
    }

    onClick(mainWindow){
        console.log("loading");
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