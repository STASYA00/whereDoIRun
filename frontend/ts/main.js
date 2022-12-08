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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
System.register("constants", ["uuid"], function (exports_1, context_1) {
    "use strict";
    var uuid, WEBSERVERURL, PORT, CLIENTID, SCOPE, STRAVAURL, constants;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (uuid_1) {
                uuid = uuid_1;
            }
        ],
        execute: function () {
            WEBSERVERURL = "http://localhost";
            PORT = "3000";
            CLIENTID = "89141";
            SCOPE = "activity:read_all";
            STRAVAURL = "https://www.strava.com/oauth/authorize?client_id=".concat(CLIENTID, "&response_type=code&redirect_uri=").concat(WEBSERVERURL, ":").concat(PORT, "/exchange_token&approval_prompt=force&scope=").concat(SCOPE);
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
                MAP_CLASSNAME: "map",
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
                STREET_CLASSNAME: "street",
                ASSETS_PATH: "../../assets/attr",
                COLOR_ORANGE: "orange",
                COLOR_WHITE: "white",
                COLOR_GRAY: "gray",
                OSMBASEURL: "https://openstreetmap.org/api/0.6",
                NOMINATIMURL: "https://nominatim.openstreetmap.org/search",
                OVERPASSURL: "https://overpass-api.de/api/interpreter",
                WEBSERVERURL: WEBSERVERURL,
                PORT: PORT,
                CLIENTID: CLIENTID,
                SCOPE: SCOPE,
                STRAVAURL: STRAVAURL
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
                    img.onclick = this.onchangeFn;
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
System.register("map", ["constants", "uiElements"], function (exports_4, context_4) {
    "use strict";
    var constants_3, uiElements_1, Map;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (constants_3_1) {
                constants_3 = constants_3_1;
            },
            function (uiElements_1_1) {
                uiElements_1 = uiElements_1_1;
            }
        ],
        execute: function () {
            //import * as d3 from "d3";
            Map = /** @class */ (function (_super) {
                __extends(Map, _super);
                function Map(parentId, coords) {
                    var _this = _super.call(this) || this;
                    _this.className = "svg"; //constants.MAP_CLASSNAME;
                    _this.coords = coords;
                    _this.elementType = "svg";
                    return _this;
                }
                Map.prototype.createElement = function () {
                    var coords = this.coords
                        .filter(function (c) { return c != undefined; })
                        .map(function (c) { return ["".concat(c[0].toString(), ",").concat(c[1].toString())]; })
                        .join(",");
                    var el = document.createElement(this.elementType);
                    el.setAttribute("width", "100");
                    el.setAttribute("height", "100");
                    el.className = "svg";
                    console.log("123");
                    var el1 = document.createElement("polyline");
                    el1.setAttribute("points", coords);
                    el1.className = constants_3.constants.STREET_CLASSNAME;
                    el.appendChild(el1);
                    return el;
                };
                return Map;
            }(uiElements_1.PanelElement));
            exports_4("Map", Map);
        }
    };
});
System.register("utils", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    function sleep(ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    }
    exports_5("sleep", sleep);
    return {
        setters: [],
        execute: function () {
        }
    };
});
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
System.register("google_codec", [], function (exports_6, context_6) {
    "use strict";
    var decode, encode, polylineEncodeLine, polylineEncodeSigned, polylineEncodeUnsigned, round;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {/**
             * Copyright 2020 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *      http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            /**
             * Decodes an encoded path string into a sequence of LatLngs.
             *
             * See {@link https://developers.google.com/maps/documentation/utilities/polylinealgorithm}
             *
             *  #### Example
             *
             * ```js
             * import { decode } from "@googlemaps/polyline-codec";
             *
             * const encoded = "_p~iF~ps|U_ulLnnqC_mqNvxq`@";
             * console.log(decode(encoded, 5));
             * // [
             * //   [38.5, -120.2],
             * //   [40.7, -120.95],
             * //   [43.252, -126.453],
             * // ]
             * ```
             */
            exports_6("decode", decode = function (encodedPath, precision) {
                if (precision === void 0) { precision = 5; }
                var factor = Math.pow(10, precision);
                var len = encodedPath.length;
                // For speed we preallocate to an upper bound on the final length, then
                // truncate the array before returning.
                var path = new Array(Math.floor(encodedPath.length / 2));
                var index = 0;
                var lat = 0;
                var lng = 0;
                var pointIndex = 0;
                // This code has been profiled and optimized, so don't modify it without
                // measuring its performance.
                for (; index < len; ++pointIndex) {
                    // Fully unrolling the following loops speeds things up about 5%.
                    var result = 1;
                    var shift = 0;
                    var b = void 0;
                    do {
                        // Invariant: "result" is current partial result plus (1 << shift).
                        // The following line effectively clears this bit by decrementing "b".
                        b = encodedPath.charCodeAt(index++) - 63 - 1;
                        result += b << shift;
                        shift += 5;
                    } while (b >= 0x1f); // See note above.
                    lat += result & 1 ? ~(result >> 1) : result >> 1;
                    result = 1;
                    shift = 0;
                    do {
                        b = encodedPath.charCodeAt(index++) - 63 - 1;
                        result += b << shift;
                        shift += 5;
                    } while (b >= 0x1f);
                    lng += result & 1 ? ~(result >> 1) : result >> 1;
                    path[pointIndex] = [lat / factor, lng / factor];
                }
                // truncate array
                path.length = pointIndex;
                return path;
            });
            /**
             * Polyline encodes an array of objects having lat and lng properties.
             *
             * See {@link https://developers.google.com/maps/documentation/utilities/polylinealgorithm}
             *
             * #### Example
             *
             * ```js
             * import { encode } from "@googlemaps/polyline-codec";
             *
             * const path = [
             *   [38.5, -120.2],
             *   [40.7, -120.95],
             *   [43.252, -126.453],
             * ];
             * console.log(encode(path, 5));
             * // "_p~iF~ps|U_ulLnnqC_mqNvxq`@"
             * ```
             */
            exports_6("encode", encode = function (path, precision) {
                if (precision === void 0) { precision = 5; }
                var factor = Math.pow(10, precision);
                var transform = function latLngToFixed(latLng) {
                    if (!Array.isArray(latLng)) {
                        latLng = [latLng.lat, latLng.lng];
                    }
                    return [round(latLng[0] * factor), round(latLng[1] * factor)];
                };
                return polylineEncodeLine(path, transform);
            });
            /**
             * Encodes a generic polyline; optionally performing a transform on each point
             * before encoding it.
             *
             * @ignore
             */
            exports_6("polylineEncodeLine", polylineEncodeLine = function (array, transform) {
                var v = [];
                var start = [0, 0];
                var end;
                for (var i = 0, I = array.length; i < I; ++i) {
                    // In order to prevent drift (from quantizing deltas), we explicitly convert
                    // coordinates to fixed-precision to obtain integer deltas.
                    end = transform(array[i]);
                    // Push the next edge
                    polylineEncodeSigned(round(end[0]) - round(start[0]), v); // lat
                    polylineEncodeSigned(round(end[1]) - round(start[1]), v); // lng
                    start = end;
                }
                return v.join("");
            });
            /**
             * Encodes the given value in our compact polyline format, appending the
             * encoded value to the given array of strings.
             *
             * @ignore
             */
            polylineEncodeSigned = function (value, array) {
                return polylineEncodeUnsigned(value < 0 ? ~(value << 1) : value << 1, array);
            };
            /**
             * Helper function for encodeSigned.
             *
             * @ignore
             */
            polylineEncodeUnsigned = function (value, array) {
                while (value >= 0x20) {
                    array.push(String.fromCharCode((0x20 | (value & 0x1f)) + 63));
                    value >>= 5;
                }
                array.push(String.fromCharCode(value + 63));
                return array;
            };
            /**
             * @ignore
             */
            round = function (v) {
                return Math.floor(Math.abs(v) + 0.5) * (v >= 0 ? 1 : -1);
            };
        }
    };
});
System.register("activity", ["google_codec"], function (exports_7, context_7) {
    "use strict";
    var google_codec_1, Activity;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (google_codec_1_1) {
                google_codec_1 = google_codec_1_1;
            }
        ],
        execute: function () {
            //import * as polyline from "@mapbox/polyline";
            Activity = /** @class */ (function () {
                function Activity(activityId, activityType, encodedCoords) {
                    this.id = activityId;
                    this.activityType = activityType;
                    this.coords = [];
                    if (encodedCoords != undefined) {
                        this.decodeCoords(encodedCoords);
                    }
                    console.log(this.coords);
                }
                Activity.prototype.decodeCoords = function (encodedCoords) {
                    this.coords = google_codec_1.decode(encodedCoords, 6);
                    //this.coords = polyline.decode(encodedCoords, 6);
                };
                return Activity;
            }());
            exports_7("Activity", Activity);
        }
    };
});
System.register("request", ["constants", "utils"], function (exports_8, context_8) {
    "use strict";
    var constants_4, utils_1, Request, LocalRequest, StravaAuthRequest, ActivitiesRequest, NominatimRequest, OverpassRequest, CountryRequest, PreciseCountryRequest, RegionRequest, CityRequest, RoadRequest, BuildingRequest, TestCountryBoundsRequest, TestCountriesRequest, TestSthlmRequest, TestCitiesRequest, TestZonesRequest, TestZonesLtdRequest, TestSoderRequest, TestSoderStreetsRequest, TestSoderBuildingsRequest, requests;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (constants_4_1) {
                constants_4 = constants_4_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            Request = /** @class */ (function () {
                function Request(params) {
                    this.params = params;
                    this.method = "GET";
                }
                Request.prototype.call = function () {
                    return this.request();
                };
                Request.prototype.getBaseUrl = function () {
                    return constants_4.constants.OVERPASSURL;
                };
                Request.prototype.getUrl = function () {
                    var query = this.getQuery();
                    if (query == "") {
                        return this.getBaseUrl();
                    }
                    return "".concat(this.getBaseUrl(), "?").concat(query);
                };
                Request.prototype.getQuery = function () {
                    return this.params;
                };
                Request.prototype.request = function (callback) {
                    var _this = this;
                    if (callback === void 0) { callback = null; }
                    var url = this.getUrl();
                    console.log("URL: ".concat(url));
                    return fetch(url, {
                        method: this.method,
                        headers: { 'Content-Type': 'application/json' }
                    }).then(function (result) {
                        if (result.status == 200) {
                            if (callback != undefined) {
                                result.json().then(function (r) { return callback(r); });
                            }
                            return result.json();
                        }
                        else if (result.status == 429) {
                            return utils_1.sleep(1000).then(function (r) { return _this.request(); });
                        }
                        else if (result.status == 504) {
                            return _this.request();
                        }
                        else {
                            console.log("CODE: ".concat(result.status));
                        }
                        return result;
                    });
                };
                return Request;
            }());
            exports_8("Request", Request);
            LocalRequest = /** @class */ (function (_super) {
                __extends(LocalRequest, _super);
                function LocalRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.endpoint = "".concat(params);
                    return _this;
                }
                LocalRequest.prototype.getBaseUrl = function () {
                    return "".concat(constants_4.constants.WEBSERVERURL, ":").concat(constants_4.constants.PORT, "/").concat(this.endpoint);
                };
                LocalRequest.prototype.getQuery = function () {
                    return "";
                };
                return LocalRequest;
            }(Request));
            StravaAuthRequest = /** @class */ (function (_super) {
                __extends(StravaAuthRequest, _super);
                function StravaAuthRequest(params) {
                    if (params === void 0) { params = null; }
                    var _this = _super.call(this, params) || this;
                    _this.endpoint = "has_token";
                    return _this;
                }
                StravaAuthRequest.prototype.call = function () {
                    return this.request();
                };
                StravaAuthRequest.prototype.request = function (callback) {
                    return _super.prototype.request.call(this, callback);
                };
                return StravaAuthRequest;
            }(LocalRequest));
            exports_8("StravaAuthRequest", StravaAuthRequest);
            ActivitiesRequest = /** @class */ (function (_super) {
                __extends(ActivitiesRequest, _super);
                function ActivitiesRequest(params) {
                    if (params === void 0) { params = null; }
                    var _this = _super.call(this, params) || this;
                    _this.endpoint = "activities";
                    return _this;
                }
                ActivitiesRequest.prototype.call = function () {
                    return this.request();
                };
                ActivitiesRequest.prototype.request = function (callback) {
                    return _super.prototype.request.call(this, callback);
                };
                return ActivitiesRequest;
            }(LocalRequest));
            exports_8("ActivitiesRequest", ActivitiesRequest);
            NominatimRequest = /** @class */ (function (_super) {
                __extends(NominatimRequest, _super);
                function NominatimRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.params = params;
                    return _this;
                }
                NominatimRequest.prototype.call = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, _super.prototype.call.call(this)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                };
                NominatimRequest.prototype.getBaseUrl = function () {
                    return constants_4.constants.NOMINATIMURL;
                };
                NominatimRequest.prototype.getQuery = function () {
                    var queryParams = this.params.filter(function (p) { return p != undefined; }).join("+");
                    return "q=".concat(queryParams, "&polygon_geojson=1&format=geojson");
                };
                return NominatimRequest;
            }(Request));
            OverpassRequest = /** @class */ (function (_super) {
                __extends(OverpassRequest, _super);
                function OverpassRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.level = 2;
                    _this.tags = _this.getTags();
                    _this.distance = undefined;
                    _this.geometries = "wr";
                    _this.output = "geom";
                    return _this;
                }
                OverpassRequest.prototype.getBaseUrl = function () {
                    return constants_4.constants.OVERPASSURL;
                };
                OverpassRequest.prototype.call = function () {
                    return _super.prototype.call.call(this);
                };
                OverpassRequest.prototype.getBoundary = function (boundary) {
                    return boundary.reduce(function (v1, v2) { return "".concat(v1, "%20").concat(v2); });
                };
                OverpassRequest.prototype.getPolyBoundary = function (boundary) {
                    return boundary.reduce(function (v1, v2) { return "".concat(v1, ",").concat(v2); });
                };
                OverpassRequest.prototype.getTags = function () {
                    return ["boundary=administrative", "type=boundary", "admin_level=" + this.level.toString()];
                };
                OverpassRequest.prototype.getFilter = function (boundary) {
                    if (this.distance != undefined) {
                        return "around:".concat(this.distance, ",").concat(this.getPolyBoundary(boundary));
                    }
                    else {
                        return "poly:%22".concat(this.getBoundary(boundary), "%22");
                    }
                };
                OverpassRequest.prototype.getQuery = function () {
                    var tagResult = "[".concat(this.tags.reduce(function (prev, next) { return "".concat(prev, "][").concat(next); }), "]");
                    return "data=[out:json];".concat(this.geometries).concat(tagResult, "(").concat(this.getFilter(this.params), ");out%20").concat(this.output, ";");
                };
                return OverpassRequest;
            }(Request));
            CountryRequest = /** @class */ (function (_super) {
                __extends(CountryRequest, _super);
                function CountryRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.distance = 10000;
                    _this.output = "center%20bb";
                    return _this;
                }
                return CountryRequest;
            }(OverpassRequest));
            PreciseCountryRequest = /** @class */ (function (_super) {
                __extends(PreciseCountryRequest, _super);
                function PreciseCountryRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.distance = 10000;
                    _this.output = "center%20geom";
                    return _this;
                }
                return PreciseCountryRequest;
            }(OverpassRequest));
            RegionRequest = /** @class */ (function (_super) {
                __extends(RegionRequest, _super);
                function RegionRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.level = 7;
                    _this.distance = 10000;
                    _this.output = "center%20bb";
                    _this.tags = _this.getTags();
                    return _this;
                }
                return RegionRequest;
            }(OverpassRequest));
            CityRequest = /** @class */ (function (_super) {
                __extends(CityRequest, _super);
                function CityRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.level = 9;
                    _this.distance = 2000;
                    _this.geometries = "relation";
                    _this.output = "center";
                    _this.tags = _this.getTags();
                    return _this;
                }
                return CityRequest;
            }(OverpassRequest));
            RoadRequest = /** @class */ (function (_super) {
                __extends(RoadRequest, _super);
                function RoadRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.geometries = "way";
                    _this.tags = _this.getTags();
                    return _this;
                }
                RoadRequest.prototype.getTags = function () {
                    return ["highway"];
                };
                return RoadRequest;
            }(OverpassRequest));
            BuildingRequest = /** @class */ (function (_super) {
                __extends(BuildingRequest, _super);
                function BuildingRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.tags = _this.getTags();
                    return _this;
                }
                BuildingRequest.prototype.getTags = function () {
                    return ["building"];
                };
                return BuildingRequest;
            }(OverpassRequest));
            TestCountryBoundsRequest = /** @class */ (function (_super) {
                __extends(TestCountryBoundsRequest, _super);
                function TestCountryBoundsRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.endpoint = "test/sverige_coords";
                    ;
                    return _this;
                }
                TestCountryBoundsRequest.prototype.getQuery = function () {
                    return "";
                };
                return TestCountryBoundsRequest;
            }(LocalRequest));
            TestCountriesRequest = /** @class */ (function (_super) {
                __extends(TestCountriesRequest, _super);
                function TestCountriesRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.endpoint = "test/countries";
                    ;
                    return _this;
                }
                TestCountriesRequest.prototype.getQuery = function () {
                    return "";
                };
                return TestCountriesRequest;
            }(LocalRequest));
            TestSthlmRequest = /** @class */ (function (_super) {
                __extends(TestSthlmRequest, _super);
                function TestSthlmRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.endpoint = "test/sthlm_bounds";
                    ;
                    return _this;
                }
                TestSthlmRequest.prototype.getQuery = function () {
                    return "";
                };
                return TestSthlmRequest;
            }(LocalRequest));
            TestCitiesRequest = /** @class */ (function (_super) {
                __extends(TestCitiesRequest, _super);
                function TestCitiesRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.endpoint = "test/cities";
                    ;
                    return _this;
                }
                TestCitiesRequest.prototype.getQuery = function () {
                    return "";
                };
                return TestCitiesRequest;
            }(LocalRequest));
            TestZonesRequest = /** @class */ (function (_super) {
                __extends(TestZonesRequest, _super);
                function TestZonesRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.endpoint = "test/zones/sthlm/whole";
                    ;
                    return _this;
                }
                TestZonesRequest.prototype.getQuery = function () {
                    return "";
                };
                return TestZonesRequest;
            }(LocalRequest));
            TestZonesLtdRequest = /** @class */ (function (_super) {
                __extends(TestZonesLtdRequest, _super);
                function TestZonesLtdRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.endpoint = "test/zones/sthlm/ltd";
                    ;
                    return _this;
                }
                TestZonesLtdRequest.prototype.getQuery = function () {
                    return "";
                };
                return TestZonesLtdRequest;
            }(LocalRequest));
            TestSoderRequest = /** @class */ (function (_super) {
                __extends(TestSoderRequest, _super);
                function TestSoderRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.endpoint = "test/sodermalm_bounds";
                    ;
                    return _this;
                }
                TestSoderRequest.prototype.getQuery = function () {
                    return "";
                };
                return TestSoderRequest;
            }(LocalRequest));
            TestSoderStreetsRequest = /** @class */ (function (_super) {
                __extends(TestSoderStreetsRequest, _super);
                function TestSoderStreetsRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.endpoint = "test/soder/streets";
                    ;
                    return _this;
                }
                TestSoderStreetsRequest.prototype.getQuery = function () {
                    return "";
                };
                return TestSoderStreetsRequest;
            }(LocalRequest));
            TestSoderBuildingsRequest = /** @class */ (function (_super) {
                __extends(TestSoderBuildingsRequest, _super);
                function TestSoderBuildingsRequest(params) {
                    var _this = _super.call(this, params) || this;
                    _this.endpoint = "test/soder/buildings";
                    ;
                    return _this;
                }
                TestSoderBuildingsRequest.prototype.getQuery = function () {
                    return "";
                };
                return TestSoderBuildingsRequest;
            }(LocalRequest));
            requests = {
                NOMINATIM: NominatimRequest,
                OVERPASS: OverpassRequest,
                LOCAL: LocalRequest,
                COUNTRY: CountryRequest,
                REGION: RegionRequest,
                CITY: CityRequest,
                ROAD: RoadRequest,
                BUILDING: BuildingRequest,
                TEST_COUNTRY_BOUNDS: TestCountryBoundsRequest,
                TEST_COUNTRIES: TestCountriesRequest,
                TEST_STHLM_BOUNDS: TestSthlmRequest,
                TEST_CITIES: TestCitiesRequest,
                TEST_ZONES: TestZonesRequest,
                TEST_ZONES_LTD: TestZonesLtdRequest,
                TEST_SODER_BOUNDS: TestSoderRequest,
                TEST_SODER_STREETS: TestSoderStreetsRequest,
                TEST_SODER_BUILDINGS: TestSoderBuildingsRequest,
                STRAVA_AUTH: StravaAuthRequest,
                ACTIVITIES: ActivitiesRequest
            };
            exports_8("requests", requests);
        }
    };
});
System.register("auth", ["utils", "constants", "request"], function (exports_9, context_9) {
    "use strict";
    var utils_2, constants_5, request_1, Auth;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (utils_2_1) {
                utils_2 = utils_2_1;
            },
            function (constants_5_1) {
                constants_5 = constants_5_1;
            },
            function (request_1_1) {
                request_1 = request_1_1;
            }
        ],
        execute: function () {
            Auth = /** @class */ (function () {
                function Auth() {
                    this.req = new request_1.requests.STRAVA_AUTH();
                }
                Auth.prototype.call = function (left, top, w, h) {
                    var _this = this;
                    if (left === void 0) { left = 0; }
                    if (top === void 0) { top = 0; }
                    if (w === void 0) { w = 500; }
                    if (h === void 0) { h = 500; }
                    this.req.call();
                    var window_params = "location=yes,left=".concat(left, ",top=").concat(top, ",height=").concat(h, ",width=").concat(w, ",scrollbars=yes,status=yes");
                    var w1 = window.open(constants_5.constants.STRAVAURL, "_blank", window_params);
                    console.log(w1);
                    return new Promise(function (res) { return res(_this.close(w1)); });
                };
                Auth.prototype.close = function (w) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            return [2 /*return*/, this.req.call().then(function (r) {
                                    if (r == "1") {
                                        if (w != null) {
                                            w.close();
                                        }
                                        return 0;
                                    }
                                    else {
                                        return utils_2.sleep(1000).then(function (r) { return _this.close(w); });
                                    }
                                })];
                        });
                    });
                };
                return Auth;
            }());
            exports_9("Auth", Auth);
        }
    };
});
System.register("collection", [], function (exports_10, context_10) {
    "use strict";
    var Collection;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
            Collection = /** @class */ (function () {
                function Collection() {
                    this.collection = [];
                }
                Collection.prototype.add = function (element) {
                    this.collection.push(element);
                };
                Collection.prototype.length = function () {
                    return this.collection.length;
                };
                return Collection;
            }());
            exports_10("Collection", Collection);
        }
    };
});
System.register("factory", ["activity"], function (exports_11, context_11) {
    "use strict";
    var activity_1, Factory, FactoryActivity;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (activity_1_1) {
                activity_1 = activity_1_1;
            }
        ],
        execute: function () {
            Factory = /** @class */ (function () {
                function Factory() {
                }
                Factory.prototype.make = function (type, params) {
                    if (params === void 0) { params = null; }
                    return new type(params);
                };
                return Factory;
            }());
            exports_11("Factory", Factory);
            FactoryActivity = /** @class */ (function () {
                function FactoryActivity() {
                }
                FactoryActivity.prototype.make = function (id, activityType, encodedCoords) {
                    return new activity_1.Activity(id, activityType, encodedCoords);
                };
                return FactoryActivity;
            }());
            exports_11("FactoryActivity", FactoryActivity);
        }
    };
});
System.register("user", ["collection", "factory", "request"], function (exports_12, context_12) {
    "use strict";
    var collection_1, factory_1, request_2, User;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (factory_1_1) {
                factory_1 = factory_1_1;
            },
            function (request_2_1) {
                request_2 = request_2_1;
            }
        ],
        execute: function () {
            User = /** @class */ (function () {
                function User(userId) {
                    this.id = userId;
                    this.req = new request_2.requests.ACTIVITIES();
                    this.activities = new collection_1.Collection();
                    this.factory = new factory_1.FactoryActivity();
                }
                User.prototype.getActivities = function () {
                    var _this = this;
                    if (this.activities.length() > 0) {
                        return new Promise(function (r) { return (r(_this.activities)); });
                    }
                    return this.req.call().then(function (result) {
                        result.map(function (activity) { return _this.activities.add(_this.factory.make(activity["id"], activity["type"], activity["map"]["summary_polyline"])); });
                        return _this.activities;
                    });
                };
                return User;
            }());
            exports_12("User", User);
        }
    };
});
System.register("panel", ["constants", "uiElements", "naming", "map", "auth", "user"], function (exports_13, context_13) {
    "use strict";
    var constants_6, uiElements_2, naming_1, map_1, auth_1, user_1, Header, Footer, NavigationPane, ForwardButton, BackButton, PanelStart, PanelList, PanelStats, MapPane, ZoneContainer, ZoneIndicatorButton, ProgressBar;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (constants_6_1) {
                constants_6 = constants_6_1;
            },
            function (uiElements_2_1) {
                uiElements_2 = uiElements_2_1;
            },
            function (naming_1_1) {
                naming_1 = naming_1_1;
            },
            function (map_1_1) {
                map_1 = map_1_1;
            },
            function (auth_1_1) {
                auth_1 = auth_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }
        ],
        execute: function () {
            Header = /** @class */ (function (_super) {
                __extends(Header, _super);
                function Header() {
                    var _this = _super.call(this, constants_6.constants.ROOT_CLASSNAME, constants_6.constants.HEADER) || this;
                    _this.id = constants_6.constants.HEADER;
                    return _this;
                }
                Header.prototype.getElements = function () {
                    return [
                    //new PanelText("Hatch Print Info"),
                    ];
                };
                return Header;
            }(uiElements_2.Pane));
            exports_13("Header", Header);
            Footer = /** @class */ (function (_super) {
                __extends(Footer, _super);
                function Footer(id, parent) {
                    var _this = _super.call(this, constants_6.constants.ROOT_CLASSNAME, constants_6.constants.FOOTER) || this;
                    _this.id = constants_6.constants.FOOTER;
                    _this.parent = parent;
                    return _this;
                }
                Footer.prototype.getElements = function () {
                    var naming = new naming_1.StravaAssetsNaming(constants_6.constants.COLOR_ORANGE);
                    return [
                        new NavigationPane(this.id, this.parent),
                        new uiElements_2.PanelImage(this.id, naming.get(), [], constants_6.constants.POWEREDBY_CLASSNAME),
                    ];
                };
                return Footer;
            }(uiElements_2.Pane));
            exports_13("Footer", Footer);
            NavigationPane = /** @class */ (function (_super) {
                __extends(NavigationPane, _super);
                function NavigationPane(parentId, parent) {
                    var _this = _super.call(this, parentId) || this;
                    _this.parent = parent;
                    _this.className = constants_6.constants.NAVIGATION_CLASSNAME;
                    return _this;
                }
                NavigationPane.prototype.getElements = function () {
                    return [new BackButton(this.parent), new ForwardButton(this.parent)];
                };
                return NavigationPane;
            }(uiElements_2.Pane));
            ForwardButton = /** @class */ (function (_super) {
                __extends(ForwardButton, _super);
                function ForwardButton(parent) {
                    var _this = _super.call(this, "", function () {
                        parent.nextPage();
                    }, constants_6.constants.FRONT_CLASSNAME) || this;
                    _this.parent = parent;
                    return _this;
                }
                return ForwardButton;
            }(uiElements_2.PanelButton));
            BackButton = /** @class */ (function (_super) {
                __extends(BackButton, _super);
                function BackButton(parent) {
                    var _this = _super.call(this, "", function () {
                        parent.previousPage();
                    }, constants_6.constants.BACK_CLASSNAME) || this;
                    _this.parent = parent;
                    return _this;
                }
                return BackButton;
            }(uiElements_2.PanelButton));
            PanelStart = /** @class */ (function (_super) {
                __extends(PanelStart, _super);
                function PanelStart(parent) {
                    var _this = this;
                    var id = constants_6.constants.PANEL_ID_START;
                    _this = _super.call(this, id, parent) || this;
                    return _this;
                }
                PanelStart.prototype.getElements = function () {
                    var _this = this;
                    var naming = new naming_1.StravaConnectNaming(constants_6.constants.COLOR_ORANGE);
                    var elements = [
                        new uiElements_2.PanelText("some text"),
                        new uiElements_2.PanelImage(null, naming.get(), [], "connectwith", function () {
                            new auth_1.Auth().call().then(function (r) {
                                console.log(r);
                                new user_1.User(null).getActivities().then(function (r) { return console.log("Activities", r); });
                                _this.parent.nextPage();
                            });
                        }),
                    ];
                    return elements;
                };
                return PanelStart;
            }(uiElements_2.Panel));
            exports_13("PanelStart", PanelStart);
            PanelList = /** @class */ (function (_super) {
                __extends(PanelList, _super);
                function PanelList(parent, id) {
                    if (id === void 0) { id = null; }
                    return _super.call(this, id, parent) || this;
                }
                PanelList.prototype.getElements = function () {
                    var elements = [new ZoneContainer(this.id)];
                    return elements;
                };
                return PanelList;
            }(uiElements_2.Panel));
            exports_13("PanelList", PanelList);
            PanelStats = /** @class */ (function (_super) {
                __extends(PanelStats, _super);
                function PanelStats(parent) {
                    return _super.call(this, null, parent) || this;
                }
                PanelStats.prototype.getElements = function () {
                    var elements = [new MapPane(this.id)];
                    return elements;
                };
                return PanelStats;
            }(uiElements_2.Panel));
            exports_13("PanelStats", PanelStats);
            MapPane = /** @class */ (function (_super) {
                __extends(MapPane, _super);
                function MapPane(parentId) {
                    var _this = _super.call(this, parentId) || this;
                    _this.className = constants_6.constants.MAP_CLASSNAME;
                    return _this;
                }
                MapPane.prototype.getElements = function () {
                    var elements = [
                        new map_1.Map(this.id, [
                            [2, 3],
                            [104, 5],
                        ]),
                    ];
                    return elements;
                };
                return MapPane;
            }(uiElements_2.Pane));
            ZoneContainer = /** @class */ (function (_super) {
                __extends(ZoneContainer, _super);
                function ZoneContainer(parentId) {
                    var _this = _super.call(this, parentId) || this;
                    _this.className = constants_6.constants.ZONE_CONTAINER_CLASSNAME;
                    _this.selected = "";
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
            }(uiElements_2.Pane));
            ZoneIndicatorButton = /** @class */ (function (_super) {
                __extends(ZoneIndicatorButton, _super);
                function ZoneIndicatorButton(parent, name, value) {
                    var _this = _super.call(this, parent) || this;
                    _this.className = constants_6.constants.ZONE_CLASSNAME;
                    _this.name = name;
                    _this.value = value;
                    return _this;
                }
                ZoneIndicatorButton.prototype.getElements = function () {
                    var elements = [
                        new uiElements_2.PanelText(this.name, constants_6.constants.ZONETEXT_CLASSNAME),
                        new ProgressBar(this.id, this.value),
                    ];
                    return elements;
                };
                return ZoneIndicatorButton;
            }(uiElements_2.Pane));
            ProgressBar = /** @class */ (function (_super) {
                __extends(ProgressBar, _super);
                function ProgressBar(parent, value) {
                    var _this = _super.call(this, parent) || this;
                    _this.className = constants_6.constants.BAR_CLASSNAME;
                    _this.value = value;
                    return _this;
                }
                ProgressBar.prototype.getElements = function () {
                    var elements = [
                        new uiElements_2.PanelElement(null, [{ tag: "width", value: "".concat(this.value * 100, "%") }], constants_6.constants.PERCENT_CLASSNAME),
                    ];
                    return elements;
                };
                return ProgressBar;
            }(uiElements_2.Pane));
        }
    };
});
System.register("canvas", ["constants", "panel"], function (exports_14, context_14) {
    "use strict";
    var constants_7, panel_1, Canvas;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (constants_7_1) {
                constants_7 = constants_7_1;
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
                    this.switchToPanel(this.panelIds[0]);
                };
                Canvas.prototype.nextPage = function () {
                    console.log("clicked next");
                    this.switchToPanel(constants_7.constants.PANEL_ID_COUNTRIES);
                };
                Canvas.prototype.previousPage = function () {
                    console.log("clicked prev");
                    this.switchToPanel(constants_7.constants.PANEL_ID_START);
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
                    var _this = this;
                    var panels = [
                        new panel_1.PanelStart(this),
                        new panel_1.PanelList(this, constants_7.constants.PANEL_ID_COUNTRIES),
                        new panel_1.PanelStats(this),
                    ];
                    panels.forEach(function (panel) {
                        panel.add();
                        _this.panelIds.push(panel.id);
                    });
                };
                Canvas.prototype.addFooter = function () {
                    var h = new panel_1.Footer(constants_7.constants.FOOTER, this);
                    h.add();
                };
                return Canvas;
            }());
            exports_14("Canvas", Canvas);
        }
    };
});
System.register("main", ["canvas", "constants"], function (exports_15, context_15) {
    "use strict";
    var canvas_1, constants_8, c;
    var __moduleName = context_15 && context_15.id;
    function runInBrowser() {
        // Add class to adjust size of application
        var el = document.getElementById("root");
        el === null || el === void 0 ? void 0 : el.classList.add(constants_8.constants.ROOT_CLASSNAME);
    }
    return {
        setters: [
            function (canvas_1_1) {
                canvas_1 = canvas_1_1;
            },
            function (constants_8_1) {
                constants_8 = constants_8_1;
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
