"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/node/cli.ts
var _cac = require('cac'); var _cac2 = _interopRequireDefault(_cac);

// src/node/transform.ts
var _xmljs = require('xml-js');
var _fastglob = require('fast-glob'); var _fastglob2 = _interopRequireDefault(_fastglob);
var _fsextra = require('fs-extra'); var _fsextra2 = _interopRequireDefault(_fsextra);
var _url = require('url');

// src/node/constants/index.ts
var _path = require('path');
var _vite = require('vite');
var ROOTPATH = _vite.normalizePath.call(void 0, _path.join.call(void 0, __dirname, ".."));
var FILE_SUFFIX_REG = /(\.[jt]s$)/;

// src/node/transform.ts
function transform(js) {
  const xml = _xmljs.js2xml.call(void 0, 
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
  const files = _fastglob2.default.sync(["*.js", "*.ts"], {
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
  await _fsextra2.default.copyFile(_url.pathToFileURL.call(void 0, file), _url.pathToFileURL.call(void 0, newFileName));
  const { default: config } = await Promise.resolve().then(() => require(_url.pathToFileURL.call(void 0, newFileName)));
  _fsextra2.default.rmSync(newFileName);
  const sld = transform(config);
  const sldFileName = file.replace(FILE_SUFFIX_REG, ".sld");
  _fsextra2.default.writeFile(sldFileName, sld).then(() => {
    console.log(sldFileName, "complied");
  });
}

// src/node/cli.ts


// src/node/dev.ts

async function createDevServer(root = process.cwd()) {
  return _vite.createServer.call(void 0, {
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
var cli = _cac2.default.call(void 0, "sldc").version("0.0.1").help();
cli.command("[root]", "sldc start").option("-w, --watch", "watching changes").action(async (root, { watch }) => {
  root = root ? _path.resolve.call(void 0, root) : process.cwd();
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
