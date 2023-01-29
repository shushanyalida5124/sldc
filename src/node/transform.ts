import { js2xml } from 'xml-js';
import { Config } from '..';
import fastGlob from 'fast-glob';
import fse from 'fs-extra';
import { pathToFileURL } from 'url';
import { FILE_SUFFIX_REG } from './constants';

export function transform(js: Config) {
  const xml = js2xml(
    {
      declaration: {
        attributes: {
          version: '1.0',
          encoding: 'utf-8'
        }
      },
      elements: [
        {
          type: 'element',
          name: 'sld:StyledLayerDescriptor',
          attributes: {
            xmlns: 'http://www.opengis.net/sld',
            'xmlns:sld': 'http://www.opengis.net/sld',
            'xmlns:ogc': 'http://www.opengis.net/ogc',
            'xmlns:gml': 'http://www.opengis.net/gml',
            version: '1.0.0'
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
export function transformFiles(root: string) {
  const files = fastGlob
    .sync(['*.js', '*.ts'], {
      cwd: root,
      absolute: true,
      ignore: ['**/node_modules/**', '**/build/**', 'config.ts']
    })
    .sort();
  files.forEach(async (file) => {
    transformFile(file);
  });
}
export async function transformFile(file) {
  const newFileName = file.replace(FILE_SUFFIX_REG, `${Math.random()}.js`);
  await fse.copyFile(pathToFileURL(file), pathToFileURL(newFileName));
  const { default: config } = await import(
    pathToFileURL(newFileName) as unknown as string
  );
  fse.rmSync(newFileName);
  const sld = transform(config);
  const sldFileName = file.replace(FILE_SUFFIX_REG, '.sld');
  fse.writeFile(sldFileName, sld).then(() => {
    console.log(sldFileName, 'complied');
  });
}
