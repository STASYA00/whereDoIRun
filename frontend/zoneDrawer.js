class canvasOrganizer{

    //TODO: scale drawarea proportions enligt områdets proportioner
    #canvas
    #firstH
    #secondH
    #thirdH
    constructor(){
        this.#canvas = d3.select("svg").append("svg");
        this.#canvas.width = +window.innerWidth,
        this.#canvas.height = +window.innerHeight;

        this.#firstH = 400;
        this.#secondH = 600;
        this.#thirdH = 600;
    }

    async firstRow(areas){
        let interval = this.#canvas.width / areas.length;
        console.log("interval: ", interval);
        
        await Promise.all(areas.map(async (area, z, areas) =>{
            let res = await area.getBoundary();
            
            let drawarea = [z * interval, 0, 
                           (z + 1) * interval, this.#firstH];
            let drawer = new AreaDrawer(this.#canvas, drawarea, area);
            await drawer.setScale();
            drawer.drawArea(res.map(c=>[c[1], c[0]]));
        }));
    }

    async secondRow(area){
        let res = await area.getBoundary();
        let drawarea = [400, this.#firstH, 800, this.#secondH];
        let drawer = new ZoneDrawer(this.#canvas, drawarea, area);
        
        await drawer.setScale();
        //drawer.drawArea(res.map(c=>[c[1], c[0]]));
        console.log("getting zones");
        let zones = await area.getZones();
        console.log(`zones quantity is ${zones.length} `);
        
        for (let z=0; z<zones.length; z++){
            let res = await zones[z].getBoundary();

            drawer.drawArea(res.map(c=>[c[1], c[0]]), undefined, zones[z]);
            console.log(zones[z].name);
        }
        // await Promise.all(zones.map(async (zone) => {
        //     let res = await zone.getBoundary();
        //     drawer.drawArea(res.map(c=>[c[0], c[1]]));
        //   }));
    }
}

class Drawer {
    #bbox  // geo bounds, [minlat, minlon, maxlat, maxlon]
    #canvas // where to draw, Canvas

    #drawarea // drawing responsibility area, Array [xmin, ymin, xmax, ymax]

    // how to scale the vectors
    #latScale
    #lonScale

    #zone // zone that is drawn by the drawer

    constructor(canvas, drawarea, zone){
        
        this.#zone = zone;

        this.#bbox = [0, 0, 0, 0];        
        this.#canvas = canvas;
        this.#drawarea = drawarea; //[0, 0, 0, 0]; 
        
        this.#latScale = undefined;
        this.#lonScale = undefined;
    }

    drawArea(coords, color, zone){
        coords = coords.filter(c=>c!=undefined)
                        .map(c=>[`${this.#lonScale(c[0]).toString()},${this.#latScale(c[1]).toString()}`])
                        .join(",");
                        
        if (color==undefined){
            color = "#FFF";
        }
        if (zone==undefined){
            zone = this.#zone;
        }
                        
        this.#canvas.append("polygon")
            .attr("fill", "#FFFFFF")
            .style("fill-opacity", .2)
            .style("stroke-width", 0.5)
            .style("stroke", color)
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
    drawLines(coords, color, thickness){
        let bb = L.rectangle([this.#bbox.slice(0,2), this.#bbox.slice(2,4)]);
        if (bb.getBounds().intersects(L.polyline(coords).getBounds())){
            coords = coords.filter(c=>c!=undefined)
                        .map(c=>[`${this.#lonScale(c[0]).toString()},${this.#latScale(c[1]).toString()}`])
                        .join(",");
        
            if (color==undefined){
                color = "#F00";
            }
            if (thickness==undefined){
                thickness = 1;
            }
            this.#canvas.append("polyline")
                .attr("fill", "none")
                .style("stroke-width", thickness)
                .style("stroke", color)
                .style("opacity", 0.7)
                .attr("points", coords);
        }
    }
    drawText(t){
        if (t==undefined){
            t = "Test Text".toUpperCase();
        }
        this.#canvas.append("text")
            .text(t)
            .attr("x", this.#drawarea[0] + (this.#drawarea[2] - this.#drawarea[0]) * 0.5)
            .attr("y", this.#drawarea[1] + (this.#drawarea[3] - this.#drawarea[1]) * 0.5)
            .attr("fill", "#FFFFFF");
    }

    async setScale(){
        this.#bbox = await this.#zone.getBbox();
        this.#latScale = d3.scaleLinear().domain([this.#bbox[1], this.#bbox[3]]).range([this.#drawarea[3], this.#drawarea[1]]); //this.#canvas.width]);
        this.#lonScale = d3.scaleLinear().domain([this.#bbox[0], this.#bbox[2]]).range([this.#drawarea[0], this.#drawarea[2]]); //this.#canvas.height]);

    }

    onClick(){}
}

class ZoneDrawer extends Drawer{
    
    constructor(canvas, drawarea, zone){
        super(canvas, drawarea, zone);
    }    
    onClick(d){
        console.log("ZONE");
        d.drawer.drawText(d.zone.name[0]);
    }
}

class AreaDrawer extends Drawer{
    
    constructor(canvas, drawarea, zone){
        super(canvas, drawarea, zone);
    }    

    onClick(d){
        
        d.drawer.drawText(d.zone.name[0]);
        let c = new canvasOrganizer();
        if (d.zone instanceof Area){
            c.secondRow(d.zone);
        }
        else{
            d.drawer.drawText(d.zone.name[0]);
        }
    }
}
      
          