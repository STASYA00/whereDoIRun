import { constants } from "./constants";
import {Canvas} from "./canvas"
import {Pane, PanelButton, PanelElement, Panel, PanelText} from "./uiElements"

class Header  extends Pane {
    constructor ( ) {
        super(constants.ROOT_CLASSNAME, constants.HEADER);
        this.id = constants.HEADER;
    }

    getElements(){
        return [
            new PanelImage( null, "../assets/attr/1.2 strava api logos/powered by Strava/pwrdBy_strava_orange/api_logo_pwrdBy_strava_horiz_orange.svg", [ { tag: "width", value: "15px" } ] ),
            //new PanelText("Hatch Print Info"),
        ];
    }
}

class Footer  extends Pane {
    
    constructor ( id: string ) {
        super(constants.ROOT_CLASSNAME, constants.FOOTER);
        this.id = constants.FOOTER;
    }

    getElements(): PanelElement[] {
        return [
            
        ];
    }
}

class StartPanel extends Panel{
    constructor(parent: Canvas){
        let id = constants.PANEL_ID_START;
        super(id, parent);
    }
    getElements(){
        let elements = [new PanelText("some text")];
        return elements;
    } 
}

export {Footer, Header, StartPanel};