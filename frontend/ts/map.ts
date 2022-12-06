import { constants } from "./constants";
import { PanelElement } from "./uiElements";
//import * as d3 from "d3";

class Map extends PanelElement {
  coords: number[][];
  constructor(parentId: string, coords: number[][]) {
    super();
    this.className = "svg"; //constants.MAP_CLASSNAME;
    this.coords = coords;
    this.elementType = "svg";
  }

  createElement() {
    let coords = this.coords
      .filter((c) => c != undefined)
      .map((c) => [`${c[0].toString()},${c[1].toString()}`])
      .join(",");

    const el = document.createElement(this.elementType);
    el.setAttribute("width", "100");
    el.setAttribute("height", "100");
    el.className = "svg";
    console.log("123");
    const el1 = document.createElement("polyline");
    el1.setAttribute("points", coords);
    el1.className = constants.STREET_CLASSNAME;
    el.appendChild(el1);
    return el;
  }
}

export { Map };
