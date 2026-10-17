import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css", ".js":"text/javascript", ".json":"application/json", ".txt":"text/plain; charset=utf-8", ".svg":"image/svg+xml", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".webp":"image/webp", ".woff2":"font/woff2", ".ico":"image/x-icon" };

createServer(async (req,res) => {
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405); res.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(req.url,"http://localhost").pathname);
    let filename = resolve(root, `.${pathname}`);
    if (filename !== root && !filename.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    if ((await stat(filename)).isDirectory()) filename = resolve(filename,"index.html");
    const data = await readFile(filename);
    res.writeHead(200, {"Content-Type":mime[extname(filename)] || "application/octet-stream", "Cache-Control":pathname.startsWith("/_next/")?"public, max-age=31536000, immutable":"no-cache"});
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    const page = await readFile(resolve(root,"404.html")).catch(()=>Buffer.from("Page not found. Build the project with npm run build."));
    res.writeHead(404,{"Content-Type":"text/html; charset=utf-8"});
    res.end(req.method === "HEAD" ? undefined : page);
  }
}).listen(port,"127.0.0.1",()=>console.log(`Tech Pacific production preview: http://127.0.0.1:${port}`));
