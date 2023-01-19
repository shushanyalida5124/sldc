import { js2xml } from 'xml-js';
import { Config } from '..';

export default function transform(js: Config) {
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
