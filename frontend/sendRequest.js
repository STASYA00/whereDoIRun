async function sendRequest(endpoint, method, callback){
    const url = `${webserverUrl}:${port}/${endpoint}`;
    // console.log("URL___: " + url);
    let result = await fetch(url, 
                            {
                                method: method,
                                headers: {'Content-Type': 'application/json'},
                            }).then(response => response.json()).catch((error) => {
                                console.error('Error:', error);
                            });
    
    if (callback != undefined) {callback(result);} 
    return result;
}

// function sendRequest(endpoint, method, callback){
//     const url = `${webserverUrl}:${port}/${endpoint}`;
//     console.log("URL___: " + url);
//     let result = fetch(url, {
//         method: method,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (callback != undefined) {
//                 callback(data);
//             }
//             else {
//                 return data;
//             }
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     return result;
// }
function otherLog(data) {
    console.log("Activity: " + JSON.stringify(data));
}

function rawLog(data) {
    console.log(data);
}

function getPolyline(data){
    console.log(data);
    console.log("#" * 88);
    let run = data["map"]["polyline"];
    console.log(run);
}

function processActivities(data){
    
    // let r = data.map(d=>d["id"]);
    // r = r.slice(0, 4);
    // r.map(run=>sendRequest(`activity/${run}`, "GET", getPolyline));
    return data.map(d=>[d["id"], d["type"], d["map"]["summary_polyline"]]).filter(d=>d[2]!=null);
     
}

function stravaMain() {
    sendRequest("activities", "GET", processActivities);
}