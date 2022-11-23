"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importStar(require("express"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var url_1 = require("../utils/url");
function default_1(rootDirectory, pluginOptions) {
    var app = (0, express_1.Router)();
    if (pluginOptions.serve) {
        var appPath = require.resolve("medusa-admin-app");
        var appURL = new url_1.Url("/").addPath("app");
        var html = fs_extra_1["default"].readFileSync(appPath, "utf8");
        var htmlWithBase_1 = html.replace(/<base \/>/, "<base href=\"".concat(appURL.toString({ rootRelative: true }), "/\" />"));
        var sendHtml = function (_req, res) {
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Vary", "Origin, Cache-Control");
            res.send(htmlWithBase_1);
        };
        var setStaticHeaders = function (res) {
            res.setHeader("Cache-Control", "max-age=31536000, immutable");
            res.setHeader("Vary", "Origin, Cache-Control");
        };
        app.get("/app", sendHtml);
        app.use("/app", express_1["default"].static(path_1["default"].join(appPath, ".."), {
            setHeaders: setStaticHeaders
        }));
        app.use("/app/*", sendHtml);
    }
    return app;
}
exports["default"] = default_1;
