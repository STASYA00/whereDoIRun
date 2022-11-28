"use strict";
exports.__esModule = true;
var uuid = require("uuid");
var PanelElement = /** @class */ (function () {
    function PanelElement(id, css, classname) {
        if (id === void 0) { id = null; }
        if (css === void 0) { css = []; }
        if (classname === void 0) { classname = ""; }
        this.id = id ? id : uuid.v4();
        this.css = css;
        this.elementType = "div";
        this.className = classname;
    }
    PanelElement.prototype.createElement = function () {
        var doc = document.createElement(this.elementType);
        doc.id = this.id;
        if (this.className) {
            doc.className = this.className;
        }
        return doc;
    };
    PanelElement.prototype.add = function (parentId) {
        var el = this.createElement();
        this.css.forEach(function (x) {
            el.style.setProperty(x.tag, x.value);
        });
        this.appendElement(parentId, el);
    };
    PanelElement.prototype.appendElement = function (parentId, child) {
        var parent;
        if (parentId) {
            parent = document.getElementById(parentId);
        }
        else {
            parent = document.getElementsByTagName("body")[0];
        }
        if (parent) {
            parent.appendChild(child);
        }
    };
    return PanelElement;
}());
exports.PanelElement = PanelElement;
