import { PanelElement } from "./uiElements";
import { constants } from "./constants";
import { Header, Footer, PanelStart, PanelList } from "./panel";

class Canvas {
  currentDisplayedPanelId: string;
  panelIds: string[];

  constructor() {
    this.currentDisplayedPanelId = "";
    this.panelIds = [];
  }

  make() {
    this.addHeader();

    this.addPanels();
    this.addFooter();
    //this.switchToPanel(constants.PANEL_ID_START);
    this.switchToPanel(constants.PANEL_ID_COUNTRIES);
  }

  nextPage() {
    console.log("clicked next");
    this.switchToPanel(constants.PANEL_ID_COUNTRIES);
  }

  previousPage() {
    console.log("clicked prev");
    this.switchToPanel(constants.PANEL_ID_START);
  }

  switchToPanel(id: string): void {
    if (this.currentDisplayedPanelId) {
      let el = document.getElementById(this.currentDisplayedPanelId);
      if (el) {
        el.style.display = "none";
      }
    }
    let el = document.getElementById(id);
    if (el) {
      el.style.display = "flex";
    }
    this.currentDisplayedPanelId = id;
  }

  addHeader() {
    var h = new Header();
    h.add();
  }

  addPanels() {
    let panels = [new PanelStart(this), new PanelList(this)];
    panels.forEach((panel) => panel.add());
  }

  addFooter() {
    var h = new Footer(constants.FOOTER, this);
    h.add();
  }
}

export { Canvas };
