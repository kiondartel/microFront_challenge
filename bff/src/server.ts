import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

const app = new Koa();
const router = new Router();
const PORT = 3003;

interface Video {
  id: string;
  title: string;
}

let favorites: Video[] = [];

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser());

// Adicionar um vídeo dos favoritos
router.post("/favorites", (ctx) => {
  const { id, title } = ctx.request.body as { id: string; title: string };
  const index = favorites.findIndex((fav) => fav.id === id);
  if (index >= 0) {
    favorites[index].title = title;
  } else {
    favorites.push({ id, title });
  }
  ctx.body = favorites;
});

// Listar todos os vídeos favoritos
router.get("/favorites", (ctx) => {
  ctx.body = favorites;
});

// Aplicar as rotas ao app
app.use(router.routes()).use(router.allowedMethods());

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`BFF is running on http://localhost:${PORT}`);
});
