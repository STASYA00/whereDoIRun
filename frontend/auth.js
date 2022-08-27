const webserverUrl = "http://localhost";
const port = 3000;
const clientId = "89141";
var scope = "activity:read_all";
const stravaUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${webserverUrl}:${port}/exchange_token&approval_prompt=force&scope=${scope}`;

function auth(){
    window.open(stravaUrl, "_blank");
}



// close the tab