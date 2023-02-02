import { describe, test, expect } from 'vitest';
import { transform } from '../transform';
import { defineSLD } from '../../index';

describe('transform', () => {
  test('transform js to xml', () => {
    const js = defineSLD({
      NamedLayer: [
        {
          UserStyle: [
            {
              FeatureTypeStyle: [
                {
                  Rule: [
                    {
                      'ogc:Filter': [
                        {
                          'ogc:PropertyIsEqualTo': [
                            {
                              'ogc:PropertyName': 'name'
                            },
                            {
                              'ogc:Literal': '1'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      LineSymbolizer: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });
    expect(transform(js)).toMatchInlineSnapshot(`
      "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>
      <sld:StyledLayerDescriptor version=\\"1.0.0\\" xsi:schemaLocation=\\"http://www.opengis.net/sld StyledLayerDescriptor.xsd\\" xmlns=\\"http://www.opengis.net/sld\\" xmlns:ogc=\\"http://www.opengis.net/ogc\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\">
        <NamedLayer>
          <UserStyle>
            <FeatureTypeStyle>
              <Rule>
                <ogc:Filter>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>name</ogc:PropertyName>
                    <ogc:Literal>1</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Filter>
                <LineSymbolizer>
                </LineSymbolizer>
              </Rule>
            </FeatureTypeStyle>
          </UserStyle>
        </NamedLayer>
      </sld:StyledLayerDescriptor>"
    `);
  });
});
