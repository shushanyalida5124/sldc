import { defineSLD, Rule } from '../../index';

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
