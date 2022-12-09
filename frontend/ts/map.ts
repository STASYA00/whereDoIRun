import { constants } from "./constants";
import { PanelElement } from "./uiElements";
import * as d3 from "d3";

class Map extends PanelElement {
  coords: number[][];
  constructor(parentId: string, coords: number[][]) {
    super();
    this.className = "svg"; //constants.MAP_CLASSNAME;
    this.coords = coords.filter(c => c != undefined);
    this.elementType = "svg";
  }

  createElement(): HTMLElement | null {
    let svg = d3.select(`.${constants.MAP_CLASSNAME}`).append("svg").attr("class", constants.MAP_CLASSNAME);
    console.log(this.coords.join(","));
    let el = svg.append("polyline").attr("class", constants.STREET_CLASSNAME).attr("points", this.coords.join(","));
    return null;
  }

  // createElement() {
  //   let coords = this.coords
  //     .filter((c) => c != undefined)
  //     .map((c) => [`${c[0].toString()},${c[1].toString()}`])
  //     .join(",");

  //   let svg = d3.select("map").append("svg");
  //   svg.attr("width", "100").attr("height", "200");
  //   svg
  //     .append("polygon")
  //     .attr("class", "area")
  //     .attr("points", [0, 10, 10, 10, 10, 0, 0, 0])


  //   return svg;
  // }
}

export { Map };
