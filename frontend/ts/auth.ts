import { sleep } from "./utils";
import { constants } from "./constants";
import { requests, Request, StravaAuthRequest } from "./request";

class Auth {
    req: StravaAuthRequest;
    constructor() {
        this.req = new requests.STRAVA_AUTH();

    }
    call(left: number = 0, top: number = 0, w: number = 500, h: number = 500): Promise<number> {
        this.req.call();
        let window_params = `location=yes,left=${left},top=${top},height=${h},width=${w},scrollbars=yes,status=yes`;
        let w1 = window.open(constants.STRAVAURL, "_blank", window_params);
        console.log(w1);
        return new Promise((res) => res(this.close(w1)));

    }
    async close(w: Window | null): Promise<number> {

        return this.req.call().then(r => {
            if (r == "1") {
                if (w != null) {
                    w.close();
                }
                return 0;
            }
            else {
                return sleep(1000).then(r => this.close(w));
            }
        });
    }
}

export { Auth };