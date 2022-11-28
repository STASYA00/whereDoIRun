import {PanelElement} from "./uiElements"
import { constants } from "./constants";

class Canvas{
    constructor(){

    }

    make(){
        let p = new PanelElement(constants.CANVAS_ID, [], constants.CANVAS_CLASSNAME);
        p.add("");
    }
}

export {Canvas};