import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import "dotenv/config";
import router from "./router/index.ts";
import { showRoutes } from "hono/dev";

const app = new Hono();

app.use(
  cors({
    credentials: true,
    origin: "*" // 모든 출처 허용, 특정 도메인으로 변경 가능
  })
);

app.use(compress());

app.route("/api", router);

console.log(showRoutes(app));

const port = 8080;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
