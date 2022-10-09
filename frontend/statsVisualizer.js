class statsVisualizer{
    static width = 500;
    static height = 500;
    static #svg;
    static #colors = ["#000", "#FFF"];
    
    constructor(){}

    static #init(){
        this.#svg = d3.select("svg")
        .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);

    }

    static #size(val){
        var _s = d3.scaleLinear()
        .domain([0, 1])
        .range([7, this.width])
        return _s(val);
    }

    // static streetPercentageDonut(streets){
    //     var res = statsCalculator.streetPercentage(streets);

    //     // set the dimensions and margins of the graph
    //     var width = 450
    //     height = 450
    //     margin = 40

    //     // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    //     var radius = Math.min(width, height) / 2 - margin

    //     // append the svg object to the div called 'my_dataviz'
    //     var svg = d3.select("#my_dataviz")
    //     .append("svg")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .append("g")
    //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //     // Create dummy data
    //     var data = {a: 9, b: 20, c:30, d:8, e:12}

    //     // set the color scale
    //     var color = d3.scaleOrdinal()
    //     .domain(data)
    //     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

    //     // Compute the position of each group on the pie:
    //     var pie = d3.pie()
    //     .value(function(d) {return d.value; })
    //     var data_ready = pie(d3.entries(data))

    //     // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    //     svg
    //     .selectAll('whatever')
    //     .data(data_ready)
    //     .enter()
    //     .append('path')
    //     .attr('d', d3.arc()
    //     .innerRadius(100)         // This is the size of the donut hole
    //     .outerRadius(radius)
    //     )
    //     .attr('fill', function(d){ return(color(d.data.key)) })
    //     .attr("stroke", "black")
    //     .style("stroke-width", "2px")
    //     .style("opacity", 0.7)
    // }
    static circles(res){
        this.#init();
        let margin = 20;
        let unit = this.width - (margin * res.length-1);
        res = res.sort(function(a, b){return b-a}).map(r=>r*unit);
        let s = 0;
        // let centers = res.map(circle=>{
        //     r = s + circle * 0.5;
        //     s = s + circle + margin;
        //     return r
        // });
        
        // sort from min to max
        // center positions - prevRad + curRad + margin
        var node = this.#svg.append("g")
            .selectAll("circle")
            .data(res)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", function(d){ return d})
            .attr("cx", function(d){let r = s+d*0.5; s = s+d+margin; return r;})
            .attr("cy", this.height / 2)
            .style("fill", this.#colors[0])
            .style("fill-opacity", 0.8)
            .attr("stroke", this.#colors[1])
            .style("stroke-width", 4)
    }

    static circular(res){
        // var res = statsCalculator.streetPercentage(streets);
        // res = [res, 1-res];
        this.#init();
        var node = this.#svg.append("g")
            .selectAll("circle")
            .data(res)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", function(d){ return d * 100})
            .attr("cx", this.width / 2)
            .attr("cy", this.height / 2)
            .style("fill", this.#colors[0])
            .style("fill-opacity", 0.8)
            .attr("stroke", this.#colors[1])
            .style("stroke-width", 4)
            // .on("mouseover", mouseover) // What to do when hovered
            // .on("mousemove", mousemove)
            // .on("mouseleave", mouseleave)
            // .call(d3.drag() // call specific function when circle is dragged
            //     .on("start", dragstarted)
            //     .on("drag", dragged)
            //     .on("end", dragended));

        // Three function that change the tooltip when user hover / move / leave a cell
        // var mouseover = function(d) {
        //     Tooltip
        //     .style("opacity", 1)
        // }
        // var mousemove = function(d) {
        //     Tooltip
        //     .html('<u>' + d.key + '</u>' + "<br>" + d.value + " inhabitants")
        //     .style("left", (d3.mouse(this)[0]+20) + "px")
        //     .style("top", (d3.mouse(this)[1]) + "px")
        // }
        // var mouseleave = function(d) {
        //     Tooltip
        //     .style("opacity", 0)
        // }

        // Initialize the circle: all located at the center of the svg area
        

        // Features of the forces applied to the nodes:
        // var simulation = d3.forceSimulation()
        //     .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
        //     .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
        //     .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1)) // Force that avoids circle overlapping

        // Apply these forces to the nodes and update their positions.
        // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
        // simulation
        //     .nodes(data)
        //     .on("tick", function(d){
        //         node
        //             .attr("cx", function(d){ return d.x; })
        //             .attr("cy", function(d){ return d.y; })
        //     });

        // What happens when a circle is dragged?
        // function dragstarted(d) {
        //     if (!d3.event.active) simulation.alphaTarget(.03).restart();
        //     d.fx = d.x;
        //     d.fy = d.y;
        // }
        // function dragged(d) {
        //     d.fx = d3.event.x;
        //     d.fy = d3.event.y;
        // }
        // function dragended(d) {
        //     if (!d3.event.active) simulation.alphaTarget(.03);
        //     d.fx = null;
        //     d.fy = null;
        // }
    }
}

class statsCalculator{
    constructor(){}

    static streetPercentage(streets){
        var runStreetsLength = streets.filter(s=>s.getScore()>1).map(s=>s.length()).reduce((prev, next) => prev + next);
        console.log("Run streets length", runStreetsLength);
        var allStreetsLength = streets.map(s=>s.length()).reduce((prev, next) => prev + next);
        console.log("total streets length", allStreetsLength);
        return runStreetsLength / allStreetsLength;
    }
}