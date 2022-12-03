import { constants } from "./constants";
import { Canvas } from "./canvas";
import {
  Pane,
  PanelButton,
  PanelImage,
  PanelElement,
  Panel,
  PanelText,
} from "./uiElements";
import { StravaAssetsNaming, StravaConnectNaming } from "./naming";

class Header extends Pane {
  constructor() {
    super(constants.ROOT_CLASSNAME, constants.HEADER);
    this.id = constants.HEADER;
  }

  getElements() {
    return [
      //new PanelText("Hatch Print Info"),
    ];
  }
}

class Footer extends Pane {
  constructor(id: string) {
    super(constants.ROOT_CLASSNAME, constants.FOOTER);
    this.id = constants.FOOTER;
  }

  getElements(): PanelElement[] {
    let naming = new StravaAssetsNaming(constants.COLOR_ORANGE);
    return [new PanelImage(null, naming.get(), [], "poweredby")];
  }
}

class StartPanel extends Panel {
  constructor(parent: Canvas) {
    let id = constants.PANEL_ID_START;
    super(id, parent);
  }
  getElements() {
    let naming = new StravaConnectNaming(constants.COLOR_ORANGE);
    let elements = [
      new PanelText("some text"),
      new PanelImage(null, naming.get(), [], "connectwith"),
    ];
    return elements;
  }
}

export { Footer, Header, StartPanel };
