var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("constants", ["uuid"], function (exports_1, context_1) {
    "use strict";
    var uuid, constants;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (uuid_1) {
                uuid = uuid_1;
            }
        ],
        execute: function () {
            exports_1("constants", constants = {
                CANVAS_ID: uuid.v4(),
                BACK_ID: uuid.v4(),
                FRONT_ID: uuid.v4(),
                CANVAS_CLASSNAME: "canvas",
                BACK_CLASSNAME: "backbutton",
                FRONT_CLASSNAME: "frontbutton",
                NAVIGATION_CLASSNAME: "navigationpane",
                BAR_CLASSNAME: "bar",
                PERCENT_CLASSNAME: "percent",
                POWEREDBY_CLASSNAME: "poweredby",
                PANEL_ID_START: uuid.v4(),
                PANEL_ID_COUNTRIES: uuid.v4(),
                PANEL_ID_CITIES: uuid.v4(),
                PANEL_ID_ZONES: uuid.v4(),
                PANEL_ID_STATS: uuid.v4(),
                FOOTER: "footer",
                HEADER: "header",
                ROOT_CLASSNAME: "root",
                ZONE_CLASSNAME: "zoneindicator",
                ZONETEXT_CLASSNAME: "zonetext",
                ZONE_CONTAINER_CLASSNAME: "zonecontainer",
                ASSETS_PATH: "../../assets/attr",
                COLOR_ORANGE: "orange",
                COLOR_WHITE: "white",
                COLOR_GRAY: "gray"
            });
        }
    };
});
System.register("uiElements", ["uuid", "constants"], function (exports_2, context_2) {
    "use strict";
    var uuid, constants_1, PanelElement, PanelText, Pane, PanelButton, Panel, PanelImage;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (uuid_2) {
                uuid = uuid_2;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }
        ],
        execute: function () {
            PanelElement = /** @class */ (function () {
                function PanelElement(id, css, classname) {
                    if (id === void 0) { id = null; }
                    if (css === void 0) { css = []; }
                    if (classname === void 0) { classname = null; }
                    this.id = id ? id : uuid.v4();
                    this.css = css;
                    this.elementType = "div";
                    this.className = classname;
                }
                PanelElement.prototype.createElement = function () {
                    var el = document.createElement(this.elementType);
                    return el;
                };
                PanelElement.prototype.add = function (parentId) {
                    if (parentId === void 0) { parentId = ""; }
                    var el = this.createElement();
                    el.id = this.id;
                    if (this.className) {
                        el.className = this.className;
                    }
                    this.css.forEach(function (x) {
                        el.style.setProperty(x.tag, x.value);
                    });
                    this.appendElement(parentId, el);
                    this.postprocess(el);
                };
                PanelElement.prototype.appendElement = function (parentId, child) {
                    var parent = document.getElementById(parentId);
                    if (parent) {
                        parent.appendChild(child);
                    }
                };
                PanelElement.prototype.postprocess = function (el) { };
                return PanelElement;
            }());
            exports_2("PanelElement", PanelElement);
            PanelText = /** @class */ (function (_super) {
                __extends(PanelText, _super);
                function PanelText(text, classname, id) {
                    if (classname === void 0) { classname = null; }
                    if (id === void 0) { id = null; }
                    var _this = _super.call(this, id, [], classname) || this;
                    _this.text = text;
                    _this.elementType = "p";
                    return _this;
                }
                PanelText.prototype.createElement = function () {
                    var el = document.createElement(this.elementType);
                    el.innerHTML = this.text;
                    el.id = this.id;
                    return el;
                };
                return PanelText;
            }(PanelElement));
            exports_2("PanelText", PanelText);
            Pane = /** @class */ (function (_super) {
                __extends(Pane, _super);
                function Pane(parentId, classname, parent) {
                    if (classname === void 0) { classname = null; }
                    if (parent === void 0) { parent = null; }
                    var _this = _super.call(this, null, [], classname) || this;
                    _this.parent = parent;
                    _this.parentId = parentId;
                    return _this;
                }
                Pane.prototype.getElements = function () {
                    return [];
                };
                Pane.prototype.add = function () {
                    var _this = this;
                    var pane = document.createElement("div");
                    pane.id = this.id;
                    if (this.className) {
                        pane.className = this.className;
                    }
                    var rootElement = document.getElementById(this.parentId);
                    if (rootElement) {
                        rootElement.append(pane);
                    }
                    else {
                        console.log("Could not create ".concat("pane"));
                        return;
                    }
                    var elements = this.getElements();
                    elements.forEach(function (el) {
                        el.add(_this.id);
                    });
                    this.postprocess(pane);
                };
                return Pane;
            }(PanelElement));
            exports_2("Pane", Pane);
            PanelButton = /** @class */ (function (_super) {
                __extends(PanelButton, _super);
                function PanelButton(label, onclickFn, classname, css, disabled) {
                    if (classname === void 0) { classname = null; }
                    if (css === void 0) { css = []; }
                    if (disabled === void 0) { disabled = false; }
                    var _this = _super.call(this, null, css, classname) || this;
                    _this.label = label;
                    _this.onclickFn = onclickFn;
                    _this.elementType = "button";
                    _this.disabled = disabled;
                    if (!_this.className) {
                        _this.className = "button";
                    }
                    return _this;
                }
                PanelButton.prototype.createElement = function () {
                    var el = document.createElement("button");
                    el.innerHTML = this.label;
                    el.onclick = this.onclickFn;
                    if (this.disabled) {
                        el.disabled = true;
                    }
                    return el;
                };
                return PanelButton;
            }(PanelElement));
            exports_2("PanelButton", PanelButton);
            Panel = /** @class */ (function () {
                function Panel(id, parent) {
                    if (id === void 0) { id = null; }
                    this.id = id ? id : "11"; //uuid.v4();
                    this.classname = "panel";
                    this.parent = parent;
                    this.parentId = constants_1.constants.ROOT_CLASSNAME;
                }
                Panel.prototype.getElements = function () {
                    return [];
                };
                Panel.prototype.add = function () {
                    var _this = this;
                    var panel = document.createElement("div");
                    panel.id = this.id;
                    panel.className = this.classname;
                    var rootElement = document.getElementById(this.parentId);
                    if (rootElement) {
                        rootElement.append(panel);
                    }
                    else {
                        console.log("Could not create ".concat(this.classname));
                        return;
                    }
                    panel.style.display = "none";
                    var elements = this.getElements();
                    elements.forEach(function (el) {
                        el.add(_this.id);
                    });
                    this.postActions();
                };
                Panel.prototype.postActions = function () { };
                return Panel;
            }());
            exports_2("Panel", Panel);
            PanelImage = /** @class */ (function (_super) {
                __extends(PanelImage, _super);
                function PanelImage(id, src, css, classname, onchangeFn) {
                    if (css === void 0) { css = []; }
                    if (classname === void 0) { classname = null; }
                    if (onchangeFn === void 0) { onchangeFn = null; }
                    var _this = _super.call(this, id, css, classname) || this;
                    _this.src = src;
                    _this.elementType = "img";
                    _this.onchangeFn = onchangeFn;
                    return _this;
                }
                PanelImage.prototype.createElement = function () {
                    var img = document.createElement("img");
                    img.id = this.id;
                    img.src = this.src;
                    return img;
                };
                return PanelImage;
            }(PanelElement));
            exports_2("PanelImage", PanelImage);
        }
    };
});
System.register("naming", ["constants"], function (exports_3, context_3) {
    "use strict";
    var constants_2, Naming, StravaAssetsNaming, StravaConnectNaming;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (constants_2_1) {
                constants_2 = constants_2_1;
            }
        ],
        execute: function () {
            Naming = /** @class */ (function () {
                function Naming() {
                }
                Naming.prototype.get = function () {
                    return "";
                };
                return Naming;
            }());
            exports_3("Naming", Naming);
            StravaAssetsNaming = /** @class */ (function (_super) {
                __extends(StravaAssetsNaming, _super);
                function StravaAssetsNaming(color) {
                    var _this = _super.call(this) || this;
                    _this.color = color;
                    _this.apiPath = "1.2 strava api logos";
                    _this.secDir = "powered by Strava/pwrdBy_strava_".concat(_this.color);
                    _this.assetname = "api_logo_pwrdBy_strava_horiz_".concat(_this.color);
                    return _this;
                }
                StravaAssetsNaming.prototype.get = function () {
                    return "".concat(constants_2.constants.ASSETS_PATH, "/").concat(this.apiPath, "/").concat(this.secDir, "/").concat(this.assetname, ".svg");
                };
                return StravaAssetsNaming;
            }(Naming));
            exports_3("StravaAssetsNaming", StravaAssetsNaming);
            StravaConnectNaming = /** @class */ (function (_super) {
                __extends(StravaConnectNaming, _super);
                function StravaConnectNaming(color) {
                    var _this = _super.call(this, color) || this;
                    _this.apiPath = "1.1 connect with strava";
                    _this.secDir = "btn_strava_connectwith_".concat(_this.color);
                    _this.assetname = _this.secDir;
                    return _this;
                }
                return StravaConnectNaming;
            }(StravaAssetsNaming));
            exports_3("StravaConnectNaming", StravaConnectNaming);
        }
    };
});
System.register("panel", ["constants", "uiElements", "naming"], function (exports_4, context_4) {
    "use strict";
    var constants_3, uiElements_1, naming_1, Header, Footer, NavigationPane, ForwardButton, BackButton, PanelStart, PanelList, ZoneContainer, ZoneIndicatorButton, ProgressBar;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (constants_3_1) {
                constants_3 = constants_3_1;
            },
            function (uiElements_1_1) {
                uiElements_1 = uiElements_1_1;
            },
            function (naming_1_1) {
                naming_1 = naming_1_1;
            }
        ],
        execute: function () {
            Header = /** @class */ (function (_super) {
                __extends(Header, _super);
                function Header() {
                    var _this = _super.call(this, constants_3.constants.ROOT_CLASSNAME, constants_3.constants.HEADER) || this;
                    _this.id = constants_3.constants.HEADER;
                    return _this;
                }
                Header.prototype.getElements = function () {
                    return [
                    //new PanelText("Hatch Print Info"),
                    ];
                };
                return Header;
            }(uiElements_1.Pane));
            exports_4("Header", Header);
            Footer = /** @class */ (function (_super) {
                __extends(Footer, _super);
                function Footer(id, parent) {
                    var _this = _super.call(this, constants_3.constants.ROOT_CLASSNAME, constants_3.constants.FOOTER) || this;
                    _this.id = constants_3.constants.FOOTER;
                    _this.parent = parent;
                    return _this;
                }
                Footer.prototype.getElements = function () {
                    var naming = new naming_1.StravaAssetsNaming(constants_3.constants.COLOR_ORANGE);
                    return [
                        new NavigationPane(this.id, this.parent),
                        new uiElements_1.PanelImage(this.id, naming.get(), [], constants_3.constants.POWEREDBY_CLASSNAME),
                    ];
                };
                return Footer;
            }(uiElements_1.Pane));
            exports_4("Footer", Footer);
            NavigationPane = /** @class */ (function (_super) {
                __extends(NavigationPane, _super);
                function NavigationPane(parentId, parent) {
                    var _this = _super.call(this, parentId) || this;
                    _this.parent = parent;
                    _this.className = constants_3.constants.NAVIGATION_CLASSNAME;
                    return _this;
                }
                NavigationPane.prototype.getElements = function () {
                    return [new BackButton(this.parent), new ForwardButton(this.parent)];
                };
                return NavigationPane;
            }(uiElements_1.Pane));
            ForwardButton = /** @class */ (function (_super) {
                __extends(ForwardButton, _super);
                function ForwardButton(parent) {
                    var _this = _super.call(this, "", function () {
                        parent.nextPage();
                    }, constants_3.constants.FRONT_CLASSNAME) || this;
                    _this.parent = parent;
                    return _this;
                }
                return ForwardButton;
            }(uiElements_1.PanelButton));
            BackButton = /** @class */ (function (_super) {
                __extends(BackButton, _super);
                function BackButton(parent) {
                    var _this = _super.call(this, "", function () {
                        parent.previousPage();
                    }, constants_3.constants.BACK_CLASSNAME) || this;
                    _this.parent = parent;
                    return _this;
                }
                return BackButton;
            }(uiElements_1.PanelButton));
            PanelStart = /** @class */ (function (_super) {
                __extends(PanelStart, _super);
                function PanelStart(parent) {
                    var id = constants_3.constants.PANEL_ID_START;
                    return _super.call(this, id, parent) || this;
                }
                PanelStart.prototype.getElements = function () {
                    var naming = new naming_1.StravaConnectNaming(constants_3.constants.COLOR_ORANGE);
                    var elements = [
                        new uiElements_1.PanelText("some text"),
                        new uiElements_1.PanelImage(null, naming.get(), [], "connectwith"),
                    ];
                    return elements;
                };
                return PanelStart;
            }(uiElements_1.Panel));
            exports_4("PanelStart", PanelStart);
            PanelList = /** @class */ (function (_super) {
                __extends(PanelList, _super);
                function PanelList(parent) {
                    var id = constants_3.constants.PANEL_ID_COUNTRIES;
                    return _super.call(this, id, parent) || this;
                }
                PanelList.prototype.getElements = function () {
                    var elements = [new ZoneContainer(this.id)];
                    return elements;
                };
                return PanelList;
            }(uiElements_1.Panel));
            exports_4("PanelList", PanelList);
            ZoneContainer = /** @class */ (function (_super) {
                __extends(ZoneContainer, _super);
                function ZoneContainer(parentId) {
                    var _this = _super.call(this, parentId) || this;
                    _this.className = constants_3.constants.ZONE_CONTAINER_CLASSNAME;
                    return _this;
                }
                ZoneContainer.prototype.getElements = function () {
                    var elements = [
                        new ZoneIndicatorButton(this.id, "Kungsholmen", 0.85),
                        new ZoneIndicatorButton(this.id, "Södermalm", 0.15),
                    ];
                    return elements;
                };
                return ZoneContainer;
            }(uiElements_1.Pane));
            ZoneIndicatorButton = /** @class */ (function (_super) {
                __extends(ZoneIndicatorButton, _super);
                function ZoneIndicatorButton(parent, name, value) {
                    var _this = _super.call(this, parent) || this;
                    _this.className = constants_3.constants.ZONE_CLASSNAME;
                    _this.name = name;
                    _this.value = value;
                    return _this;
                }
                ZoneIndicatorButton.prototype.getElements = function () {
                    var elements = [
                        new uiElements_1.PanelText(this.name, constants_3.constants.ZONETEXT_CLASSNAME),
                        new ProgressBar(this.id, this.value),
                    ];
                    return elements;
                };
                return ZoneIndicatorButton;
            }(uiElements_1.Pane));
            ProgressBar = /** @class */ (function (_super) {
                __extends(ProgressBar, _super);
                function ProgressBar(parent, value) {
                    var _this = _super.call(this, parent) || this;
                    _this.className = constants_3.constants.BAR_CLASSNAME;
                    _this.value = value;
                    return _this;
                }
                ProgressBar.prototype.getElements = function () {
                    var elements = [
                        new uiElements_1.PanelElement(null, [{ tag: "width", value: "".concat(this.value * 100, "%") }], constants_3.constants.PERCENT_CLASSNAME),
                    ];
                    return elements;
                };
                return ProgressBar;
            }(uiElements_1.Pane));
        }
    };
});
System.register("canvas", ["constants", "panel"], function (exports_5, context_5) {
    "use strict";
    var constants_4, panel_1, Canvas;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (constants_4_1) {
                constants_4 = constants_4_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            }
        ],
        execute: function () {
            Canvas = /** @class */ (function () {
                function Canvas() {
                    this.currentDisplayedPanelId = "";
                    this.panelIds = [];
                }
                Canvas.prototype.make = function () {
                    this.addHeader();
                    this.addPanels();
                    this.addFooter();
                    //this.switchToPanel(constants.PANEL_ID_START);
                    this.switchToPanel(constants_4.constants.PANEL_ID_COUNTRIES);
                };
                Canvas.prototype.nextPage = function () {
                    console.log("clicked next");
                    this.switchToPanel(constants_4.constants.PANEL_ID_COUNTRIES);
                };
                Canvas.prototype.previousPage = function () {
                    console.log("clicked prev");
                    this.switchToPanel(constants_4.constants.PANEL_ID_START);
                };
                Canvas.prototype.switchToPanel = function (id) {
                    if (this.currentDisplayedPanelId) {
                        var el_1 = document.getElementById(this.currentDisplayedPanelId);
                        if (el_1) {
                            el_1.style.display = "none";
                        }
                    }
                    var el = document.getElementById(id);
                    if (el) {
                        el.style.display = "flex";
                    }
                    this.currentDisplayedPanelId = id;
                };
                Canvas.prototype.addHeader = function () {
                    var h = new panel_1.Header();
                    h.add();
                };
                Canvas.prototype.addPanels = function () {
                    var panels = [new panel_1.PanelStart(this), new panel_1.PanelList(this)];
                    panels.forEach(function (panel) { return panel.add(); });
                };
                Canvas.prototype.addFooter = function () {
                    var h = new panel_1.Footer(constants_4.constants.FOOTER, this);
                    h.add();
                };
                return Canvas;
            }());
            exports_5("Canvas", Canvas);
        }
    };
});
System.register("main", ["canvas", "constants"], function (exports_6, context_6) {
    "use strict";
    var canvas_1, constants_5, c;
    var __moduleName = context_6 && context_6.id;
    function runInBrowser() {
        // Add class to adjust size of application
        var el = document.getElementById("root");
        el === null || el === void 0 ? void 0 : el.classList.add(constants_5.constants.ROOT_CLASSNAME);
    }
    return {
        setters: [
            function (canvas_1_1) {
                canvas_1 = canvas_1_1;
            },
            function (constants_5_1) {
                constants_5 = constants_5_1;
            }
        ],
        execute: function () {
            runInBrowser();
            c = new canvas_1.Canvas();
            console.log("canvas");
            c.make();
            console.log("canvas made");
        }
    };
});
