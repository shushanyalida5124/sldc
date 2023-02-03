## 介绍
将js对象转化为SLD,基于[xml](https://www.npmjs.com/package/xml)实现

## 使用

```
npm i sldc
```
某些情况下似乎需要再全局安装一次
```
npm i sldc -g
```
```
sldc example.ts
```
```typescript
// example.ts
import { defineSLD, Rule } from 'sldc';

const colorMap = {
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
  purple: '#ff00ff',
  yellow: '#ffff00'
};

function getRule(field: string, value: string): Rule {
  return {
    Rule: [
      {
        'ogc:Filter': [
          {
            'ogc:PropertyIsEqualTo': [
              {
                'ogc:PropertyName': field
              },
              {
                'ogc:Literal': value
              }
            ]
          }
        ]
      },
      {
        LineSymbolizer: [
          {
            Stroke: [
              {
                CssParameter: [
                  {
                    _attr: {
                      name: 'stroke'
                    }
                  },
                  colorMap[value]
                ]
              },
              {
                CssParameter: [
                  {
                    _attr: {
                      name: 'stroke-width'
                    }
                  },
                  7
                ]
              },
              {
                CssParameter: [
                  {
                    _attr: {
                      name: 'fill-opacity'
                    }
                  },
                  0.7
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}
export default defineSLD({
  NamedLayer: [
    {
      UserStyle: [
        {
          FeatureTypeStyle: [
            getRule('color', 'red'),
            getRule('color', 'green'),
            getRule('color', 'blue'),
            getRule('color', 'purple'),
            getRule('color', 'yellow')
          ]
        }
      ]
    }
  ]
});
```
```xml
<!-- example.sld -->
<?xml version="1.0" encoding="UTF-8"?>
<sld:StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
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
              <CssParameter name="stroke">#ff0000</CssParameter>
              <CssParameter name="stroke-width">7</CssParameter>
              <CssParameter name="fill-opacity">0.7</CssParameter>
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
              <CssParameter name="stroke">#00ff00</CssParameter>
              <CssParameter name="stroke-width">7</CssParameter>
              <CssParameter name="fill-opacity">0.7</CssParameter>
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
              <CssParameter name="stroke">#0000ff</CssParameter>
              <CssParameter name="stroke-width">7</CssParameter>
              <CssParameter name="fill-opacity">0.7</CssParameter>
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
              <CssParameter name="stroke">#ff00ff</CssParameter>
              <CssParameter name="stroke-width">7</CssParameter>
              <CssParameter name="fill-opacity">0.7</CssParameter>
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
              <CssParameter name="stroke">#ffff00</CssParameter>
              <CssParameter name="stroke-width">7</CssParameter>
              <CssParameter name="fill-opacity">0.7</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</sld:StyledLayerDescriptor>
```