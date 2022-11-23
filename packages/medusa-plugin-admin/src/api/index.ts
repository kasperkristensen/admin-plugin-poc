import express, { Request, Response, Router } from "express";
import fse from "fs-extra";
import { ServerResponse } from "http";
import path from "path";
import { AdminPluginOptions } from "../types";
import { Url } from "../utils/url";

export default function (
  rootDirectory: string,
  pluginOptions: AdminPluginOptions
): Router {
  const app = Router();

  if (pluginOptions.serve) {
    const appPath = require.resolve("medusa-admin-app");
    const appURL = new Url("/").addPath("app");

    const html = fse.readFileSync(appPath, "utf8");
    const htmlWithBase = html.replace(
      /<base \/>/,
      `<base href="${appURL.toString({ rootRelative: true })}/" />`
    );

    const sendHtml = (_req: Request, res: Response) => {
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Vary", "Origin, Cache-Control");
      res.send(htmlWithBase);
    };

    const setStaticHeaders = (res: ServerResponse) => {
      res.setHeader("Cache-Control", "max-age=31536000, immutable");
      res.setHeader("Vary", "Origin, Cache-Control");
    };

    app.get("/app", sendHtml);
    app.use(
      "/app",
      express.static(path.join(appPath, ".."), {
        setHeaders: setStaticHeaders,
      })
    );
    app.use("/app/*", sendHtml);
  }

  return app;
}
