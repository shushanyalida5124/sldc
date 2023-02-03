import {
  __dirname
} from "./chunk-ETYLGWCF.js";

// src/node/cli.ts
import cac from "cac";

// src/node/transform.ts
import XML from "xml";
import fastGlob from "fast-glob";
import fse from "fs-extra";
import { pathToFileURL } from "url";

// src/node/constants/index.ts
import { join } from "path";
import { normalizePath } from "vite";
var ROOTPATH = normalizePath(join(__dirname, ".."));
var FILE_SUFFIX_REG = /(\.[jt]s$)/;

// src/node/transform.ts
import * as babel from "@babel/core";
import presetTypescript from "@babel/preset-typescript";
function transform(config) {
  const xml = XML(
    {
      "sld:StyledLayerDescriptor": [
        {
          _attr: {
            version: "1.0.0",
            "xsi:schemaLocation": "http://www.opengis.net/sld StyledLayerDescriptor.xsd",
            xmlns: "http://www.opengis.net/sld",
            "xmlns:ogc": "http://www.opengis.net/ogc",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
          }
        },
        config
      ]
    },
    {
      indent: "  ",
      declaration: {
        encoding: "UTF-8"
      }
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
  const tasks = [];
  files.forEach(async (file) => {
    tasks.push(transformFile(file));
  });
  return Promise.all(tasks).then(() => {
    console.log("All files complied");
  });
}
async function transformFile(file) {
  const { code } = babel.transformFileSync(file, {
    presets: [presetTypescript]
  });
  const newFileName = file.replace(FILE_SUFFIX_REG, `${Math.random()}.js`);
  fse.writeFileSync(pathToFileURL(newFileName), code);
  const { default: config } = await import(pathToFileURL(newFileName).toString());
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
var cli = cac("sldc").help();
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
