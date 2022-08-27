var map = L.map('map').setView([ 59.314, 18.084], 13.5, false);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    opacity: .5,
    attribution: '© OpenStreetMap'
}).addTo(map);

// var opl = new L.OverPassLayer({
//     'query': '(node({{bbox}})[organic];node({{bbox}})[second_hand];);out qt;',
// });

// var StravaApiV3 = require('strava_api_v3');
// var defaultClient = StravaApiV3.ApiClient.instance;
// var strava_oauth = defaultClient.authentications['strava_oauth'];
// strava_oauth.accessToken = "ecf9eea8f007c54d2d40efc48ae4173ac54422e9"

// var api = new StravaApiV3.ActivitiesApi()

// var id = 7314798241; // {Long} The identifier of the activity.

// var opts = { 
//   'includeAllEfforts': true // {Boolean} To include all segments efforts.
// };

// var callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully. Returned data: ' + data);
//   }
// };
// api.getActivityById(id, opts, callback);

/////////////////////////////////////////////////////////////////////////////////////
// var mydata = JSON.parse(data);

// let color = "#fffdfa";
// let black_color = "#0e1111";
// for (let i=0; i<mydata[0]["features"].length; i++){
//     let feature = mydata[0]["features"][i]["geometry"];
//     if (feature["type"]=="Polygon"){
//         let coords = feature["coordinates"][0];
//         coords = coords.map(coord=>[coord[1], coord[0]]);
//         L.polygon(coords, {stroke: false, color: color, fillColor: color, fillOpacity: 1.0}).addTo(map);
//         //L.geoJSON(mydata).addTo(map);
//     }
// };
/////////////////////////////////////////////////////////////////////////////////////

// var bearer_token = "5aa0ac5da0d390558c3d148f781e58f348609bde";
// var req = new XMLHttpRequest();

// const url='https://www.strava.com/api/v3/activities/7314798241';
// req.open("GET", url);
// req.setRequestHeader("Authorization", "Bearer " + bearer_token);
// req.send();

// req.onreadystatechange = (e) => {
//   console.log(req.responseText)
// }
// console.log(req.response);
// console.log(req.status);
// let r = run;
// var polyline = L.Polyline.fromEncoded(r);
// console.log(polyline);
// L.polyline(
//     coordinates,
//     {
//         color: 'blue',
//         weight: 2,
//         opacity: .7,
//         lineJoin: 'round'
//     }
// ).addTo(map);

/*
class ZoneDrawer{
    #canvas
    constructor(){
        const d3 = require("d3");
        this.#canvas = d3.select("svg").append("svg");
        width = +window.innerWidth,
        height = +window.innerHeight;
    }
    drawArea(coords){
        coords = coords.flat(2).join(",");
        // "0,0, 0,400, 400,400, 400,0"
        svg.append("polygon")
            .attr("fill", "#FFFFFF")
            .style("fill-opacity", .2)
            .style("stroke-width", 5)
            .style("stroke", "#FFF")
            .attr("points", coords);
    }
}

let l = new ZoneDrawer();
l.drawArea([[0,0], [0,400], [400,400], [400,0]]);
//width=window.innerWidth height = window.innerHeight*/