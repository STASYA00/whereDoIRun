function sendRequest(endpoint, method, callback){
    const url = `${webserverUrl}:${port}/${endpoint}`;
    console.log("URL: " + url);
    fetch(url, {
        method: method, // or 'PUT'
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
    console.log("RESULT: " + JSON.stringify(data));
}

function processActivities(data){
    let r = data.map(d=>d["id"]);
    console.log(r);
}

function main() {
    sendRequest("activities", "GET", processActivities);
}