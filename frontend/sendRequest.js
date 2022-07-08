function sendRequest(endpoint, method, callback){
    const url = `${webserverUrl}:${port}/${endpoint}`;
    // console.log("URL: " + url);
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            if (callback != undefined) {
                callback(data);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function otherLog(data) {
    console.log("Activity: " + JSON.stringify(data));
}

function getPolyline(data){
    //console.log(data);
    let run = data["map"]["polyline"];
    console.log(run);
}

function processActivities(data){
    let r = data.map(d=>d["id"]);
    r.map(run=>sendRequest(`activity/${run}`, "GET", getPolyline));
    
    
    
}



function main() {
    sendRequest("activities", "GET", processActivities);
}