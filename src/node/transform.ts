import XML from 'xml';
import { Config } from '..';
import fastGlob from 'fast-glob';
import fse from 'fs-extra';
import { pathToFileURL } from 'url';
import { FILE_SUFFIX_REG } from './constants';

export function transform(config: Config) {
  const xml = XML(
    {
      'sld:StyledLayerDescriptor': [
        {
          _attr: {
            version: '1.0.0',
            'xsi:schemaLocation':
              'http://www.opengis.net/sld StyledLayerDescriptor.xsd',
            xmlns: 'http://www.opengis.net/sld',
            'xmlns:ogc': 'http://www.opengis.net/ogc',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
          }
        },
        config as unknown as any
      ]
    },
    {
      indent: '  ',
      declaration: {
        encoding: 'UTF-8'
      }
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

// 将js对象转换为xml-js需要的格式
// function configTransform() {}
