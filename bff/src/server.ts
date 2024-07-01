import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

const app = new Koa();
const router = new Router();

interface Video {
  id: string;
  title: string;
}

const PORT = 3003;
let favorites: Video[] = [];

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser());

// remover vídeo dos favoritos
router.delete("/favorites", (ctx) => {
  const { id } = ctx.request.body as { id: string };
  const index = favorites.findIndex((fav) => fav.id === id);
  if (index >= 0) {
    favorites.splice(index, 1);
    ctx.status = 200;
    ctx.body = { message: "Vídeo removido dos favoritos com sucesso!" };
  } else {
    ctx.status = 404;
    ctx.body = { error: "Vídeo não encontrado nos favoritos!" };
  }
});

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
