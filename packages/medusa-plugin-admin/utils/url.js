"use strict";
exports.__esModule = true;
exports.Url = void 0;
var url_1 = require("url");
var Url = /** @class */ (function () {
    function Url(url) {
        var parsedUrl = new url_1.URL(url, "http://localhost");
        var isProtocolRelative = /^\/\//.test(url);
        var isRootRelative = /^\/$|^\/[^/]/.test(url);
        var isPathRelative = /^\./.test(url);
        this.protocol =
            !isProtocolRelative && !isRootRelative && !isPathRelative
                ? parsedUrl.protocol.substring(0, parsedUrl.protocol.length - 1)
                : null;
        this.host = !isRootRelative && !isPathRelative ? parsedUrl.hostname : null;
        this.port = parsedUrl.port !== "" ? parsedUrl.port : null;
        this.path = parsedUrl.pathname.split("/").filter(function (p) { return p !== ""; });
        this.query = Object.fromEntries(parsedUrl.searchParams.entries());
        this.hash = parsedUrl.hash !== "" ? parsedUrl.hash.substring(1) : null;
    }
    Url.prototype.isAbsolute = function () {
        return this.protocol !== null && this.host !== null;
    };
    Url.prototype.isProtocolRelative = function () {
        return this.protocol === null && this.host !== null;
    };
    Url.prototype.isRootRelative = function () {
        return this.protocol === null && this.host === null;
    };
    Url.prototype.addPath = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        var pathToAdd = paths
            .flatMap(function (p) { return String(p).split("/"); })
            .filter(function (p) { return p !== ""; });
        for (var _a = 0, pathToAdd_1 = pathToAdd; _a < pathToAdd_1.length; _a++) {
            var pathSegment = pathToAdd_1[_a];
            if (pathSegment === "..") {
                this.path.pop();
            }
            else if (pathSegment !== ".") {
                this.path.push(pathSegment);
            }
        }
        return this;
    };
    Url.prototype.setQuery = function (key, value) {
        this.query[key] = value;
        return this;
    };
    Url.prototype.toString = function (_a) {
        var _b;
        var _c = _a === void 0 ? { rootRelative: false } : _a, rootRelative = _c.rootRelative;
        var protocol = this.protocol !== null ? "".concat(this.protocol, ":") : "";
        var host = (_b = this.host) !== null && _b !== void 0 ? _b : "";
        var port = this.port !== null ? ":".concat(this.port) : "";
        var origin = "".concat(this.host !== null ? "".concat(protocol, "//") : "").concat(host).concat(port);
        var path = "/".concat(this.path.join("/"));
        var query = Object.keys(this.query).length !== 0
            ? "?".concat(Object.entries(this.query)
                .map(function (_a) {
                var k = _a[0], v = _a[1];
                return "".concat(k, "=").concat(v);
            })
                .join("&"))
            : "";
        var hash = this.hash !== null ? "#".concat(this.hash) : "";
        return "".concat(!rootRelative ? origin : "").concat(path).concat(query).concat(hash);
    };
    return Url;
}());
exports.Url = Url;
