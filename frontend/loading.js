class Loading{
    #width = 50;
    #height = 122;
    constructor(){

    }

    static make(canvas, x, y){
        let coords = [[x,y],[x,y+this.#height],[x+this.#width,y+this.#height],[x+this.#width,y],[x,y]];
        coords = coords.filter(c=>c!=undefined)
                        .map(c=>[`${c[0].toString()},${c[1].toString()}`])
                        .join(",");
        this.canvas.append("polygon")
            .attr("fill", "#000")
            .style("fill-opacity", 1)
            .style("stroke-width", 5)
            .style("stroke", "#000")
            .attr("points", coords);
            // .attr("filter", "url(#dropshadow)");

    }
}