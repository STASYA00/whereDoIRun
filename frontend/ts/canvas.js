"use strict";
exports.__esModule = true;
var uiElements_1 = require("./uiElements");
var constants_1 = require("./constants");
var Canvas = /** @class */ (function () {
    function Canvas() {
    }
    Canvas.prototype.make = function () {
        var p = new uiElements_1.PanelElement(constants_1.constants.CANVAS_ID, [], constants_1.constants.CANVAS_CLASSNAME);
        p.add("");
    };
    return Canvas;
}());
exports.Canvas = Canvas;
