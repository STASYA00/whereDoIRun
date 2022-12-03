import {PanelElement} from "./uiElements"
import { constants } from "./constants";
import {Header, Footer, StartPanel} from "./panel"

class Canvas{
    currentDisplayedPanelId: string;

    constructor(){
        this.currentDisplayedPanelId = "";
    }

    make(){
        this.addHeader();
        this.addPanels();
        this.addFooter();
        
        this.switchToPanel(constants.PANEL_ID_START);
    }

    switchToPanel ( id: string ): void {
        if ( this.currentDisplayedPanelId ) {
            let el = document.getElementById( this.currentDisplayedPanelId );
            if ( el ) {
                el.style.display = "none";
            }
        }
        let el = document.getElementById( id );
        if ( el ) {
            el.style.display = "flex";
        }
        this.currentDisplayedPanelId = id;
    }

    addHeader(){
        var h = new Header();
        h.add();
    }

    addPanels(){
        let panels = [
            new StartPanel(this)
        ]
        panels.forEach(panel => panel.add());

    }

    addFooter(){
        var h = new Footer(constants.FOOTER);
        h.add();
    }
}

export {Canvas};