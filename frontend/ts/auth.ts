import { sleep } from "./utils";
import { constants } from "./constants";
import { requests, Request } from "./request";

class Auth {
    req: Request;
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
    async close(w: Window | null) {
        while (this.req.call() != "1") {
            console.log("result is", this.req.call());
            await sleep(1000);
        }
        if (w != null) {
            w.close();
        }
        return 0;
    }
}

export { Auth };