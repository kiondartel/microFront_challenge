import Koa from "koa";
import serve from "koa-static";
import path from "path";
import Router from "@koa/router";

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3001;

// Servindo arquivos estáticos
app.use(serve(path.join(__dirname, "../static")));

app.use(serve(path.join(__dirname, "../dist")));

// Rotas
router.get("/videos", (ctx: any) => {
  ctx.type = "html";
  ctx.body = path.join(__dirname, "../static", "index.html");
});

router.get("/favorites", (ctx: any) => {
  ctx.type = "html";
  ctx.body = path.join(__dirname, "../static", "index.html");
});

app.use(router.routes()).use(router.allowedMethods());

// Inicializando o servidor
app.listen(PORT, () => {
  console.log(`MF_VIDEO is running on http://localhost:${PORT}`);
});
