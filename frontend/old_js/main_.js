let modes = {TEST: 0, 
    RELEASE: 1};
let mode = modes.TEST;

function main(){
    

    let app = new mainCanvas();
    // let l = new LocalRequest();
    // l.call("has_token").then(r=> console.log("result", r))
    // sendRequest("uuid", "GET", function(){});
    //app.make();
    // let z = new Zone("Gamla Stan"); // Södermalm
    // let bbox = await z.getBbox();
    // let l = new ZoneDrawer(bbox);
    // let factory = new Factory(Activity);


    // z.getBuildings().then(res=>res.filter(r=>r!=undefined).map(r=>l.drawArea(r)));
    
    // let streets = await z.getStreets()
    // streets = streets.filter(r=>r!=undefined); 
    
    // let overview = await sendRequest("activities", "GET").then(r=>new ActivityOverview(r));
    
    // activities = overview.getActivities();
    // console.log("ACTIVITIES:", activities.length);
    
    // activities.forEach(activity => streets.forEach(street =>{
    //     street.score(activity);
    //     l.drawLines(street.coords, "#FFF", .5);
    // }));
    
    // streets.forEach(street => {
    //     l.drawLines(street.coords, `#${Math.min(street.getScore(), 15).toString(16)}00`)} // , street.getScore()
    //     );
        
    // var runStreetsLength = streets.filter(s=>s.getScore()>1).map(s=>s.length()).reduce((prev, next) => prev + next);
    // var allStreetsLength = streets.map(s=>s.length()).reduce((prev, next) => prev + next);

    // console.log(runStreetsLength, allStreetsLength, runStreetsLength / allStreetsLength);
    // console.log("Done");


    }
    main();