function testActivity(){
    //tested
    let a = new Activity(123, 0);
    console.log(`Activity: ${a.id}`);
    console.log(`Activity type: ${a.getType()}`);
}

function testActivityDict(){
    //tested
    let a = new ActivityDict();
    console.log(`Activity: ${a.get(0)}`);
    console.log(`Activity: ${a.get(1)}`);
    console.log(`Activity: ${a.get(2)}`);
}

function testFactory(){
    //tested
    let a = new Factory(Activity);
    console.log(`Activity: ${a.make([123, 0])}`);
    let stub = a.make([123, 0]);
    console.log(`Activity: ${stub.id}`);
    console.log(`Activity: ${stub.getType()}`);
}

function testCollection(){
    // tested
    let c = new Collection(Activity);
    let a = new Activity(123, "Run");
    c.add(a);
    console.log("After adding an element:", c.collection.length);
    let el = c.get(123);
    console.log(el);
    c.remove(el);
    console.log(c.collection.length);

    c.add(a);
    console.log("After adding an element:", c.collection.length);
    c.removeByIndex(0);
    console.log(c.collection.length);
}

function testSendRequest(){
    //tested
    sendRequest("activities", "GET")
    .then(result => result.map(r=>console.log(`Activity: ${r["name"]}\nID: ${r["id"]}\nSport type: ${r["sport_type"]}`)));
}

function testUser(){
    //tested
    let userId = "89141";
    let user = new User(userId);
}

function testAthleteData(){
    //tested
    sendRequest("athlete", "GET", otherLog);
}

async function testNominatim(){
    //tested
    let r = new NominatimRequest(["Dovre"]);
    let res = await r.call();
    console.log("result: ", res);
}

async function testZoneBoundary(){
    let z = new Zone("Dovre");
    let res = await z.getBoundary();
    console.log(res);
}
async function testZoneBbox(){
    let z = new Zone("Dovre");
    let res = await z.getBbox();
    console.log(res);
}
async function testOverpassRoads(){
    let z = new Zone("Södermalm");
    let res = await z.getBoundary();
    let r = new OverpassRequest([1, res]);
    let result = await r.call();
    console.log("result: ", result);
}
async function testOverpassBuildings(){
    let z = new Zone("Södermalm");
    let res = await z.getBoundary();
    let r = new OverpassRequest([0, res]);
    let result = await r.call();
    console.log("result: ", result);
}
async function testZoneBuildings(){
    let z = new Zone("Södermalm");
    let res = await z.getBuildings();
    console.log(res);
}
async function testZoneStreets(){
    let z = new Zone("Södermalm");
    let res = await z.getStreets();
    console.log(res);
}

async function testStreetOffset(){
    let streetCoords = [
        {"lat": 30, "lon": 40}, 
        {"lat": 60, "lon": 80}
    ]
    let street = new Street(streetCoords);
    let z = new ZoneDrawer([0, 0, 200, 200]);
    let buff = street.getBuffer(10);
    z.drawArea(buff);
}

function testDecoding(){
    let encoded = run;
    var coordinates = L.Polyline.fromEncoded(encoded).getLatLngs();
    console.log(coordinates.slice(0, 2).map(r=>r["lat"]));
    var s = new Street(coordinates.slice(0, 2));
    console.log(s.coords);
}

function testIntersection(){
    let r = L.rectangle([[0,0],[100,100]]);
    let l = L.polyline([[-20,-20],[-40,-40]]);
    console.log(r.getBounds());
    console.log(r);
    console.log(r.getBounds().intersects(l.getBounds()));
}

function testSegmentRequest(){
    let s = "26178016";
    sendRequest(`segments/${s}`, "GET", rawLog);
}

function testIntersectionControl(){
    let r = L.rectangle([[0,0],[100,100]]);
    
    let l = [[20,20],[50,50], [180,80]];
    let c = new intersectionCalc();
    console.log(c.makePolyline(r, l));
    
}

function testDiagram(){
    statsVisualizer.circular([1, 0.9, 0.1]);
}

async function testOverview(){
    let overview = await sendRequest("activities", "GET").then(r=>new ActivityOverview(r));
    
    let coords = overview.getEndCoords();
    
    console.log("ACTIVITIES:", coords);
    
    let cities = await overview.getAreas();
    console.log(cities);
    cities.forEach(c=>console.log(c.name));
    let c = new canvasOrganizer();
    c.firstRow(cities);
    //testCache();
}

function testText(){
    
    let canvas = d3.select("svg").append("svg");
    canvas.width = +window.innerWidth;
    canvas.height = +window.innerHeight;
    let z = new ZoneDrawer([0, 0, 100, 100], canvas);
    z.drawText("Some Text");
}

function testCache(){
    let isCacheSupported = 'caches' in window;
    console.log("Cache support: ", isCacheSupported);
    caches.open("cacheName").then(cache => {console.log("cache added")});
    caches.open('cacheName').then( cache => {
        cache.add(url).then( () => {console.log("data cached")});
    });
    
}

