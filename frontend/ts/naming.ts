import { constants } from "./constants";

class Naming {
  constructor() {}
  get() {
    return "";
  }
}

class StravaAssetsNaming extends Naming {
  apiPath: string;
  secDir: string;
  assetname: string;
  color: string;
  constructor(color: string) {
    super();
    this.color = color;
    this.apiPath = "1.2 strava api logos";
    this.secDir = `powered by Strava/pwrdBy_strava_${this.color}`;
    this.assetname = `api_logo_pwrdBy_strava_horiz_${this.color}`;
  }
  get(): string {
    return `${constants.ASSETS_PATH}/${this.apiPath}/${this.secDir}/${this.assetname}.svg`;
  }
}

class StravaConnectNaming extends StravaAssetsNaming {
  constructor(color: string) {
    super(color);
    this.apiPath = "1.1 connect with strava";
    this.secDir = `btn_strava_connectwith_${this.color}`;
    this.assetname = this.secDir;
  }
}

export { Naming, StravaAssetsNaming, StravaConnectNaming };
