import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const buildDirectory = process.argv[2];

if (!buildDirectory) {
  throw new Error("Debes indicar el directorio temporal de producción.");
}

function minifyHtml(source) {
  return `${source
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .trim()}\n`;
}

function minifyCss(source) {
  return `${source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}\s*/g, "}")
    .trim()}\n`;
}

function minifyJavaScript(source) {
  return `${source
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .trim()}\n`;
}

const transformers = new Map([
  [".html", minifyHtml],
  [".css", minifyCss],
  [".js", minifyJavaScript],
]);

async function processDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(path);
      continue;
    }

    const transform = transformers.get(extname(entry.name));

    if (!transform) continue;

    const source = await readFile(path, "utf8");
    await writeFile(path, transform(source), "utf8");
  }
}

await processDirectory(buildDirectory);
