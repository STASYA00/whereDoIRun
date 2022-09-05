class canvasOrganizer{

    //TODO: scale drawarea proportions enligt områdets proportioner
    
    #firstH;
    #secondH;
    #thirdH;

    #margin;
    #vMargin;
    constructor(overview){
        this.canvas = d3.select("svg").append("svg");
        this.canvas.width = +window.innerWidth,
        this.canvas.height = +window.innerHeight;

        this.overview = overview;

        this.#firstH = this.canvas.height / 3;
        this.#secondH = 600;
        this.#thirdH = 600;

        this.#margin = 20;
        this.#vMargin = 40;
    }

    #setBoxProportion(drawnWidth, widthProportion, desiredHeight){
        let drawnHeight = drawnWidth / widthProportion;
        // console.log("set box", drawnWidth, widthProportion, desiredHeight, drawnHeight);
        if (drawnHeight > desiredHeight){
            drawnHeight = desiredHeight;
            drawnWidth = drawnHeight * widthProportion;
        }
        return [drawnWidth, drawnHeight];
    }

    #setGeoFactor(lon){
        // TODO: different factor for different longitudes
        return 0.5
    }

    async #getDrawer(zone, xMin, width, yMin, height){
        let widthProportion = this.#setGeoFactor() * await zone.getRelativeWidth();
        let dims = this.#setBoxProportion(width, widthProportion, height);
        let drawarea = [xMin, yMin, xMin + dims[0], yMin + dims[1]];
        
        let res = await zone.getBoundary();

        let drawer = new ZoneDrawer(this, drawarea, zone);
        await drawer.setScale();

        return drawer;
    }

    async firstRow(areas){
        
        let widths = new Array();
        for (let a in areas){
            widths.push(this.#setGeoFactor() * await areas[a].getRelativeWidth());
        }
        
        let widthProportion = widths.reduce((prev, next)=>prev + next);

        let totalMargin = this.#margin * (areas.length + 1);
        let drawnWidth = this.canvas.width - totalMargin;

        let dims = this.#setBoxProportion(drawnWidth, widthProportion, this.#firstH);
        drawnWidth = dims[0];
        let drawnHeight = dims[1];
        this.#firstH = drawnHeight;
        this.#margin = (this.canvas.width - drawnWidth) / (widths.length + 1);
        
        let drawX = this.#margin;  // where to start drawing
        for (let a=0; a<areas.length; a++){
            let drawarea = [drawX, 0, 
                drawX + widths[a] * drawnHeight, drawnHeight];
            let drawer = new AreaDrawer(this, drawarea, areas[a]);
            await drawer.setScale();
            drawer.drawArea(await areas[a].getBoundary());
            drawX += widths[a] * drawnHeight + this.#margin;
        }
    }

    async secondRow(area){
        let drawX = 400;
        let drawnWidth = 400;

        let drawer = await this.#getDrawer(area, drawX, drawnWidth, this.#firstH + this.#vMargin, this.#secondH);
        
        console.log("getting zones");
        let zones = await area.getZones();
        console.log(`zones quantity is ${zones.length} `);
        
        if (this.overview!=undefined){
            for (let z=0; z<zones.length; z++){
                await zones[z].make();
                zones[z].scoreAll(this.overview.getActivities());
            }
        }
        let maxScore = zones.map(z=>z.getScore()).reduce((prev, next) => prev + next);
        for (let z=0; z<zones.length; z++){
            let res = await zones[z].getBoundary();
            let c = Math.ceil(zones[z].getScore() * 15 / maxScore);
            drawer.drawArea(res, `#${c.toString(16)}00`, zones[z]);
        }
        console.log("scores", zones.map(z=>z.getScore()));
        //statsVisualizer.circles(zones.map(z=>z.getScore() / this.overview.getActivities().length));
    }

    async thirdRow(zone){
        let drawX = 100;
        let drawnWidth = 800;
        
        let drawer = await this.#getDrawer(zone, drawX, drawnWidth, this.#secondH + this.#vMargin, this.#thirdH);

        zone.getBuildings().then(res=>res.filter(r=>r!=undefined).map(r=>drawer.drawArea(r)));

        let streets = await zone.getStreets();
        streets = streets.filter(r=>r!=undefined); 
        console.log("streets", streets);

        let activities = await this.overview.getActivities();
        console.log("activities", activities);
        activities.forEach(activity => streets.forEach(street =>{
            street.score(activity);
            // drawer.drawLines(street.coords, "#FFF", .5);
        }));
        console.log(streets.map(s=>s.getScore()));
        streets.forEach(street => {
            drawer.drawLines(street.coords, `#${Math.min(street.getScore(), 15).toString(16)}00`)} // , street.getScore()
            );
        
        var runStreetsLength = streets.filter(s=>s.getScore()>1).map(s=>s.length()).reduce((prev, next) => prev + next);
        var allStreetsLength = streets.map(s=>s.length()).reduce((prev, next) => prev + next);
        
        console.log("Streets percentage", statsCalculator.streetPercentage(streets));
        console.log(runStreetsLength, allStreetsLength, runStreetsLength / allStreetsLength);
        console.log("Done");
        //await zone.getBuildings().then(res=>res.filter(r=>r!=undefined).map(r=>console.log(r)));
        
    }
}

class Drawer {
    #bbox  // geo bounds, [minlat, minlon, maxlat, maxlon]
    #canvasOrg // where to draw, Canvas

    #drawarea // drawing responsibility area, Array [xmin, ymin, xmax, ymax]

    // how to scale the vectors
    #latScale
    #lonScale

    #zone // zone that is drawn by the drawer

    constructor(canvasOrg, drawarea, zone){
        
        this.#zone = zone;

        this.#bbox = [0, 0, 0, 0];        
        this.#canvasOrg = canvasOrg;
        this.#drawarea = drawarea; //[0, 0, 0, 0]; 
        
        this.#latScale = undefined;
        this.#lonScale = undefined;
    }

    drawArea(coords, color, zone){
        coords = coords.filter(c=>c!=undefined)
                        .map(c=>[`${this.#latScale(c[0]).toString()},${this.#lonScale(c[1]).toString()}`])
                        .join(",");
                        
        if (color==undefined){
            color = "#444";
        }
        if (zone==undefined){
            zone = this.#zone;
        }
                        
        this.#canvasOrg.canvas.append("polygon")
            .attr("fill", color)
            .style("fill-opacity", 1)
            .style("stroke-width", 0.5)
            .style("stroke", "#FFF")
            .attr("points", coords)
            .datum({
                "zone": zone,
                "drawer": this
        })
            .on("click", function(d){
                console.log("clicked");
                d.drawer.onClick(d);
             });
    }
    drawLines(coords, color){
        // let bb = L.rectangle([this.#bbox.slice(0,2), this.#bbox.slice(2,4)]);
        // if (bb.getBounds().intersects(L.polyline(coords).getBounds())){
        coords = coords.filter(c=>c!=undefined)
                    .map(c=>[`${this.#latScale(c[0]).toString()},${this.#lonScale(c[1]).toString()}`])
                    .join(",");
    
        if (color==undefined){
            color = "#F00";
        }
        
        let thickness = 1;
        
        this.#canvasOrg.canvas.append("polyline")
            .attr("fill", "none")
            .style("stroke-width", thickness)
            .style("stroke", color)
            .style("opacity", 0.7)
            .attr("points", coords);
        // }

    }
    drawText(t){
        if (t==undefined){
            t = "Test Text".toUpperCase();
        }
        this.#canvasOrg.canvas.append("text")
            .text(t)
            .attr("x", this.#drawarea[0] + (this.#drawarea[2] - this.#drawarea[0]) * 0.5)
            .attr("y", this.#drawarea[1] + (this.#drawarea[3] - this.#drawarea[1]) * 0.5)
            .attr("fill", "#FFFFFF");
    }

    async setScale(){
        this.#bbox = await this.#zone.getBbox();
        
        this.#latScale = d3.scaleLinear().domain([this.#bbox[0], this.#bbox[2]]).range([this.#drawarea[0], this.#drawarea[2]]); // x axis
        this.#lonScale = d3.scaleLinear().domain([this.#bbox[1], this.#bbox[3]]).range([this.#drawarea[3], this.#drawarea[1]]); // y axis

    }

    onClick(){}
}

class ZoneDrawer extends Drawer{
    #canvasOrg;
    constructor(canvasOrg, drawarea, zone){
        super(canvasOrg, drawarea, zone);
        this.#canvasOrg = canvasOrg;
    }    
    onClick(d){
        console.log("ZONE");
        d.drawer.drawText(d.zone.name[0]);
        this.#canvasOrg.thirdRow(d.zone);

    }
}

class AreaDrawer extends Drawer{
    #canvasOrg;
    
    constructor(canvasOrg, drawarea, zone){
        super(canvasOrg, drawarea, zone);
        this.#canvasOrg = canvasOrg;
    }    

    onClick(d){
        
        d.drawer.drawText(d.zone.name[0]);
        if (d.zone instanceof Area){
            this.#canvasOrg.secondRow(d.zone);
        }
        else{
            d.drawer.drawText(d.zone.name[0]);
        }
    }
}
      
          