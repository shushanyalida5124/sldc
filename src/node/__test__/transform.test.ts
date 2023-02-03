import { describe, test, expect } from 'vitest';
import { transform, transformFile, transformFiles } from '../transform';
import { defineSLD } from '../../index';
import fse from 'fs-extra';
import path from 'path';
import { normalizePath } from 'vite';

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
  test('transform file', async () => {
    await transformFile(normalizePath(path.join(__dirname, './example.ts')));
    const sldFile = (
      await fse.readFile(path.join(__dirname, './example.sld'))
    ).toLocaleString();
    expect(sldFile).toMatchInlineSnapshot(`
      "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>
      <sld:StyledLayerDescriptor version=\\"1.0.0\\" xsi:schemaLocation=\\"http://www.opengis.net/sld StyledLayerDescriptor.xsd\\" xmlns=\\"http://www.opengis.net/sld\\" xmlns:ogc=\\"http://www.opengis.net/ogc\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\">
        <NamedLayer>
          <UserStyle>
            <FeatureTypeStyle>
              <Rule>
                <ogc:Filter>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>color</ogc:PropertyName>
                    <ogc:Literal>red</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Filter>
                <LineSymbolizer>
                  <Stroke>
                    <CssParameter name=\\"stroke\\">#ff0000</CssParameter>
                    <CssParameter name=\\"stroke-width\\">7</CssParameter>
                    <CssParameter name=\\"fill-opacity\\">0.7</CssParameter>
                  </Stroke>
                </LineSymbolizer>
              </Rule>
              <Rule>
                <ogc:Filter>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>color</ogc:PropertyName>
                    <ogc:Literal>green</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Filter>
                <LineSymbolizer>
                  <Stroke>
                    <CssParameter name=\\"stroke\\">#00ff00</CssParameter>
                    <CssParameter name=\\"stroke-width\\">7</CssParameter>
                    <CssParameter name=\\"fill-opacity\\">0.7</CssParameter>
                  </Stroke>
                </LineSymbolizer>
              </Rule>
              <Rule>
                <ogc:Filter>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>color</ogc:PropertyName>
                    <ogc:Literal>blue</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Filter>
                <LineSymbolizer>
                  <Stroke>
                    <CssParameter name=\\"stroke\\">#0000ff</CssParameter>
                    <CssParameter name=\\"stroke-width\\">7</CssParameter>
                    <CssParameter name=\\"fill-opacity\\">0.7</CssParameter>
                  </Stroke>
                </LineSymbolizer>
              </Rule>
              <Rule>
                <ogc:Filter>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>color</ogc:PropertyName>
                    <ogc:Literal>purple</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Filter>
                <LineSymbolizer>
                  <Stroke>
                    <CssParameter name=\\"stroke\\">#ff00ff</CssParameter>
                    <CssParameter name=\\"stroke-width\\">7</CssParameter>
                    <CssParameter name=\\"fill-opacity\\">0.7</CssParameter>
                  </Stroke>
                </LineSymbolizer>
              </Rule>
              <Rule>
                <ogc:Filter>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>color</ogc:PropertyName>
                    <ogc:Literal>yellow</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Filter>
                <LineSymbolizer>
                  <Stroke>
                    <CssParameter name=\\"stroke\\">#ffff00</CssParameter>
                    <CssParameter name=\\"stroke-width\\">7</CssParameter>
                    <CssParameter name=\\"fill-opacity\\">0.7</CssParameter>
                  </Stroke>
                </LineSymbolizer>
              </Rule>
            </FeatureTypeStyle>
          </UserStyle>
        </NamedLayer>
      </sld:StyledLayerDescriptor>"
    `);
    fse.rmSync(path.join(__dirname, './example.sld'));
  });
  test('transform floder', async () => {
    await transformFiles(normalizePath(path.join(__dirname, './testfiles')));
    const sldFile = (
      await fse.readFile(path.join(__dirname, './testfiles/example.sld'))
    ).toLocaleString();
    expect(sldFile).toMatchInlineSnapshot(`
      "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>
      <sld:StyledLayerDescriptor version=\\"1.0.0\\" xsi:schemaLocation=\\"http://www.opengis.net/sld StyledLayerDescriptor.xsd\\" xmlns=\\"http://www.opengis.net/sld\\" xmlns:ogc=\\"http://www.opengis.net/ogc\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\">
        <NamedLayer>
          <UserStyle>
            <FeatureTypeStyle>
              <Rule>
                <ogc:Filter>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>color</ogc:PropertyName>
                    <ogc:Literal>red</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Filter>
                <LineSymbolizer>
                  <Stroke>
                    <CssParameter name=\\"stroke\\">#ff0000</CssParameter>
                    <CssParameter name=\\"stroke-width\\">7</CssParameter>
                    <CssParameter name=\\"fill-opacity\\">0.7</CssParameter>
                  </Stroke>
                </LineSymbolizer>
              </Rule>
              <Rule>
                <ogc:Filter>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>color</ogc:PropertyName>
                    <ogc:Literal>green</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Filter>
                <LineSymbolizer>
                  <Stroke>
                    <CssParameter name=\\"stroke\\">#00ff00</CssParameter>
                    <CssParameter name=\\"stroke-width\\">7</CssParameter>
                    <CssParameter name=\\"fill-opacity\\">0.7</CssParameter>
                  </Stroke>
                </LineSymbolizer>
              </Rule>
              <Rule>
                <ogc:Filter>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>color</ogc:PropertyName>
                    <ogc:Literal>blue</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Filter>
                <LineSymbolizer>
                  <Stroke>
                    <CssParameter name=\\"stroke\\">#0000ff</CssParameter>
                    <CssParameter name=\\"stroke-width\\">7</CssParameter>
                    <CssParameter name=\\"fill-opacity\\">0.7</CssParameter>
                  </Stroke>
                </LineSymbolizer>
              </Rule>
              <Rule>
                <ogc:Filter>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>color</ogc:PropertyName>
                    <ogc:Literal>purple</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Filter>
                <LineSymbolizer>
                  <Stroke>
                    <CssParameter name=\\"stroke\\">#ff00ff</CssParameter>
                    <CssParameter name=\\"stroke-width\\">7</CssParameter>
                    <CssParameter name=\\"fill-opacity\\">0.7</CssParameter>
                  </Stroke>
                </LineSymbolizer>
              </Rule>
              <Rule>
                <ogc:Filter>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>color</ogc:PropertyName>
                    <ogc:Literal>yellow</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Filter>
                <LineSymbolizer>
                  <Stroke>
                    <CssParameter name=\\"stroke\\">#ffff00</CssParameter>
                    <CssParameter name=\\"stroke-width\\">7</CssParameter>
                    <CssParameter name=\\"fill-opacity\\">0.7</CssParameter>
                  </Stroke>
                </LineSymbolizer>
              </Rule>
            </FeatureTypeStyle>
          </UserStyle>
        </NamedLayer>
      </sld:StyledLayerDescriptor>"
    `);
    fse.rmSync(path.join(__dirname, './testfiles/example.sld'));
  });
});
