const webserverUrl = "http://localhost";
const port = 3000;
const clientId = "89141";
const scope = "activity:read_all";
const stravaUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${webserverUrl}:${port}/exchange_token&approval_prompt=force&scope=${scope}`;

function auth(left=0, top=0, w=500, h=500){
    sendRequest("has_token", "GET", function(){}).then(r => console.log("result", r));
    let w1 = window.open(stravaUrl, "_blank", `location=yes,left=${left},top=${top},height=${h},width=${w},scrollbars=yes,status=yes`);
    console.log(w1);
    return closeAuth(w1);
}

async function closeAuth(w){
    while (await sendRequest("has_token", "GET", function(){}) != "1"){
        console.log("result is", await sendRequest("has_token", "GET", function(){}));
        await sleep(1000);
    }
    w.close();
    return true;
}

// close the tab