import * as uuid from "uuid";

const WEBSERVERURL = "http://localhost" as string;
const PORT = "3000" as string;
const CLIENTID = "89141" as string;
const SCOPE = "activity:read_all" as string;
const STRAVAURL = `https://www.strava.com/oauth/authorize?client_id=${CLIENTID}&response_type=code&redirect_uri=${WEBSERVERURL}:${PORT}/exchange_token&approval_prompt=force&scope=${SCOPE}`;


export const constants = {
  CANVAS_ID: uuid.v4(),
  BACK_ID: uuid.v4(),
  FRONT_ID: uuid.v4(),

  CANVAS_CLASSNAME: "canvas" as string,
  BACK_CLASSNAME: "backbutton" as string,
  FRONT_CLASSNAME: "frontbutton" as string,
  NAVIGATION_CLASSNAME: "navigationpane" as string,
  BAR_CLASSNAME: "bar" as string,
  PERCENT_CLASSNAME: "percent" as string,
  POWEREDBY_CLASSNAME: "poweredby" as string,
  MAP_CLASSNAME: "map" as string,

  PANEL_ID_START: uuid.v4(),
  PANEL_ID_COUNTRIES: uuid.v4(),
  PANEL_ID_CITIES: uuid.v4(),
  PANEL_ID_ZONES: uuid.v4(),
  PANEL_ID_STATS: uuid.v4(),

  FOOTER: "footer" as string,
  HEADER: "header" as string,

  ROOT_CLASSNAME: "root" as string,
  ZONE_CLASSNAME: "zoneindicator" as string,
  ZONETEXT_CLASSNAME: "zonetext" as string,
  ZONE_CONTAINER_CLASSNAME: "zonecontainer" as string,
  STREET_CLASSNAME: "street" as string,
  ASSETS_PATH: "../../assets/attr" as string,

  COLOR_ORANGE: "orange" as string,
  COLOR_WHITE: "white" as string,
  COLOR_GRAY: "gray" as string,

  OSMBASEURL: "https://openstreetmap.org/api/0.6" as string,
  NOMINATIMURL: "https://nominatim.openstreetmap.org/search" as string,
  OVERPASSURL: "https://overpass-api.de/api/interpreter" as string,

  WEBSERVERURL, PORT, CLIENTID, SCOPE, STRAVAURL,


} as const;
