import {
  __dirname
} from "./chunk-ETYLGWCF.js";

// src/node/cli.ts
import cac from "cac";

// src/node/transform.ts
import { js2xml } from "xml-js";
import fastGlob from "fast-glob";
import fse from "fs-extra";
import { pathToFileURL } from "url";

// src/node/constants/index.ts
import { join } from "path";
import { normalizePath } from "vite";
var ROOTPATH = normalizePath(join(__dirname, ".."));
var FILE_SUFFIX_REG = /(\.[jt]s$)/;

// src/node/transform.ts
function transform(js) {
  const xml = js2xml(
    {
      declaration: {
        attributes: {
          version: "1.0",
          encoding: "utf-8"
        }
      },
      elements: [
        {
          type: "element",
          name: "sld:StyledLayerDescriptor",
          attributes: {
            xmlns: "http://www.opengis.net/sld",
            "xmlns:sld": "http://www.opengis.net/sld",
            "xmlns:ogc": "http://www.opengis.net/ogc",
            "xmlns:gml": "http://www.opengis.net/gml",
            version: "1.0.0"
          },
          elements: js.elements
        }
      ]
    },
    {
      spaces: 2
    }
  );
  return xml;
}
function transformFiles(root) {
  const files = fastGlob.sync(["*.js", "*.ts"], {
    cwd: root,
    absolute: true,
    ignore: ["**/node_modules/**", "**/build/**", "config.ts"]
  }).sort();
  files.forEach(async (file) => {
    transformFile(file);
  });
}
async function transformFile(file) {
  const newFileName = file.replace(FILE_SUFFIX_REG, `${Math.random()}.js`);
  await fse.copyFile(pathToFileURL(file), pathToFileURL(newFileName));
  const { default: config } = await import(pathToFileURL(newFileName));
  fse.rmSync(newFileName);
  const sld = transform(config);
  const sldFileName = file.replace(FILE_SUFFIX_REG, ".sld");
  fse.writeFile(sldFileName, sld).then(() => {
    console.log(sldFileName, "complied");
  });
}

// src/node/cli.ts
import { resolve } from "path";

// src/node/dev.ts
import { createServer as createViteDevServer } from "vite";
async function createDevServer(root = process.cwd()) {
  return createViteDevServer({
    root,
    plugins: [
      {
        name: "hmr",
        config() {
          transformFiles(root);
        },
        async handleHotUpdate({ file }) {
          if (FILE_SUFFIX_REG.test(file)) {
            transformFile(file);
          }
        }
      }
    ]
  });
}

// src/node/cli.ts
var cli = cac("sldc").version("0.0.1").help();
cli.command("[root]", "sldc start").option("-w, --watch", "watching changes").action(async (root, { watch }) => {
  root = root ? resolve(root) : process.cwd();
  if (FILE_SUFFIX_REG.test(root)) {
    transformFile(root);
    return;
  }
  if (watch) {
    await createDevServer(root);
    console.log("sldc start");
  } else {
    transformFiles(root);
  }
});
cli.parse();
