import type { Element } from 'xml-js';

export interface Config extends Element {
  elements: UserLayer[];
}
type TextNode<name, text> = {
  type: 'element';
  name: name;
  elements: [
    {
      type: 'text';
      text: text;
    }
  ];
};
export interface UserLayer extends Element {
  type: 'element';
  name: 'UserLayer';
  elements: UserStyle[];
}
export interface UserStyle extends Element {
  type: 'element';
  name: 'UserStyle';
  elements: FeatureTypeStyle[];
}
export interface FeatureTypeStyle extends Element {
  type: 'element';
  name: 'FeatureTypeStyle';
  elements: Rule[];
}
export interface Rule extends Element {
  type: 'element';
  name: 'Rule';
  elements: (ScaleDenominator | Filter | Symbolizer)[];
}
export type ScaleDenominator = TextNode<
  'MaxScaleDenominator' | 'MinScaleDenominato',
  number
>;
export interface Filter extends Element {
  type: 'element';
  name: 'ogc:Filter';
  elements: (LogicalExpression | ComparisonExpression)[];
}
export interface LogicalExpression extends Element {
  type: 'element';
  name: 'ogc:And' | 'ogc:Or' | 'ogc:Not';
  elements: (LogicalExpression | ComparisonExpression)[];
}
export interface ComparisonExpression extends Element {
  type: 'element';
  name:
    | 'ogc:PropertyIsEqualTo'
    | 'ogc:PropertyIsNotEqualTo'
    | 'ogc:PropertyIsLessThan'
    | 'ogc:PropertyIsGreaterThan'
    | 'ogc:PropertyIsLessThanOrEqualTo'
    | 'ogc:PropertyIsGreaterThanOrEqualTo';
  elements: [
    TextNode<'ogc:PropertyName', string>,
    TextNode<'ogc:Literal', unknown>
  ] &
    Element[];
}
export interface Symbolizer extends Element {
  type: 'element';
  name:
    | 'PolygonSymbolizer'
    | 'TextSymbolizer'
    | 'PointSymbolizer'
    | 'LineSymbolizer';
}

export function defineSLD(config: Config) {
  return config;
}
