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
import { Map } from "./map";
import { Auth } from "./auth";

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
  parent: Canvas;
  constructor(id: string, parent: Canvas) {
    super(constants.ROOT_CLASSNAME, constants.FOOTER);
    this.id = constants.FOOTER;
    this.parent = parent;
  }

  getElements(): PanelElement[] {
    let naming = new StravaAssetsNaming(constants.COLOR_ORANGE);
    return [
      new NavigationPane(this.id, this.parent),
      new PanelImage(this.id, naming.get(), [], constants.POWEREDBY_CLASSNAME),
    ];
  }
}

class NavigationPane extends Pane {
  parent: Canvas;
  constructor(parentId: string, parent: Canvas) {
    super(parentId);
    this.parent = parent;
    this.className = constants.NAVIGATION_CLASSNAME;
  }
  getElements(): PanelElement[] {
    return [new BackButton(this.parent), new ForwardButton(this.parent)];
  }
}

class ForwardButton extends PanelButton {
  parent: Canvas;
  constructor(parent: Canvas) {
    super(
      "",
      () => {
        parent.nextPage();
      },
      constants.FRONT_CLASSNAME
    );
    this.parent = parent;
  }
}

class BackButton extends PanelButton {
  parent: Canvas;
  constructor(parent: Canvas) {
    super(
      "",
      () => {
        parent.previousPage();
      },
      constants.BACK_CLASSNAME
    );
    this.parent = parent;
  }
}

class PanelStart extends Panel {
  constructor(parent: Canvas) {
    let id = constants.PANEL_ID_START;
    super(id, parent);
  }
  getElements() {
    let naming = new StravaConnectNaming(constants.COLOR_ORANGE);
    let elements = [
      new PanelText("some text"),
      new PanelImage(null, naming.get(), [], "connectwith", () => { new Auth().call(); }),
    ];
    return elements;
  }
}

class PanelList extends Panel {
  constructor(parent: Canvas, id: string | null = null) {
    super(id, parent);
  }
  getElements() {
    let elements = [new ZoneContainer(this.id)];
    return elements;
  }
}

class PanelStats extends Panel {
  constructor(parent: Canvas) {
    super(null, parent);
  }
  getElements() {
    let elements = [new MapPane(this.id)];
    return elements;
  }
}

class MapPane extends Pane {
  constructor(parentId: string) {
    super(parentId);
    this.className = constants.MAP_CLASSNAME;
  }

  getElements() {
    let elements = [
      new Map(this.id, [
        [2, 3],
        [104, 5],
      ]),
    ];
    return elements;
  }
}

class ZoneContainer extends Pane {
  constructor(parentId: string) {
    super(parentId);
    this.className = constants.ZONE_CONTAINER_CLASSNAME;
  }

  getElements() {
    let elements = [
      new ZoneIndicatorButton(this.id, "Kungsholmen", 0.85),
      new ZoneIndicatorButton(this.id, "Södermalm", 0.15),
    ];
    return elements;
  }
}

class ZoneIndicatorButton extends Pane {
  name: string;
  value: number;
  constructor(parent: string, name: string, value: number) {
    super(parent);
    this.className = constants.ZONE_CLASSNAME;
    this.name = name;
    this.value = value;
  }

  getElements() {
    let elements = [
      new PanelText(this.name, constants.ZONETEXT_CLASSNAME),
      new ProgressBar(this.id, this.value),
    ];
    return elements;
  }
}

class ProgressBar extends Pane {
  value: number;
  constructor(parent: string, value: number) {
    super(parent);
    this.className = constants.BAR_CLASSNAME;
    this.value = value;
  }
  getElements() {
    let elements = [
      new PanelElement(
        null,
        [{ tag: "width", value: `${this.value * 100}%` }],
        constants.PERCENT_CLASSNAME
      ),
    ];
    return elements;
  }
}

export { Footer, Header, PanelStart, PanelList, PanelStats };
