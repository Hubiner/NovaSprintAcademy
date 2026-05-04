import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { createServer } from "node:http";

const publicDirectory = process.argv[2] ? resolve(process.argv[2]) : resolve(".");
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8"
};

const sendNotFound = (response) => {
  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Arquivo não encontrado.");
};

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://localhost:${port}`);
  const requestPath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const safeRequestPath = decodeURIComponent(requestPath).replace(/^\/+/, "");
  const targetPath = normalize(join(publicDirectory, safeRequestPath));

  if (!targetPath.startsWith(publicDirectory)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Acesso negado.");
    return;
  }

  if (!existsSync(targetPath)) {
    sendNotFound(response);
    return;
  }

  const fileStats = await stat(targetPath);

  if (fileStats.isDirectory()) {
    const nestedIndex = join(targetPath, "index.html");

    if (!existsSync(nestedIndex)) {
      sendNotFound(response);
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    createReadStream(nestedIndex).pipe(response);
    return;
  }

  const contentType = mimeTypes[extname(targetPath)] ?? "application/octet-stream";
  response.writeHead(200, { "Content-Type": contentType });
  createReadStream(targetPath).pipe(response);
});

server.listen(port, () => {
  console.log(`Servidor disponível em http://localhost:${port}`);
  console.log(`Diretório servido: ${publicDirectory}`);
});
