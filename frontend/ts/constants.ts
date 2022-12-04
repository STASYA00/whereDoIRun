import * as uuid from "uuid";

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
  ASSETS_PATH: "../../assets/attr" as string,

  COLOR_ORANGE: "orange" as string,
  COLOR_WHITE: "white" as string,
  COLOR_GRAY: "gray" as string,
} as const;
