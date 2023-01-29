import { Element } from 'xml-js';

interface Config extends Element {
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
interface UserLayer extends Element {
    type: 'element';
    name: 'UserLayer';
    elements: UserStyle[];
}
interface UserStyle extends Element {
    type: 'element';
    name: 'UserStyle';
    elements: FeatureTypeStyle[];
}
interface FeatureTypeStyle extends Element {
    type: 'element';
    name: 'FeatureTypeStyle';
    elements: Rule[];
}
interface Rule extends Element {
    type: 'element';
    name: 'Rule';
    elements: (ScaleDenominator | Filter | Symbolizer)[];
}
type ScaleDenominator = TextNode<'MaxScaleDenominator' | 'MinScaleDenominato', number>;
interface Filter extends Element {
    type: 'element';
    name: 'ogc:Filter';
    elements: (LogicalExpression | ComparisonExpression)[];
}
interface LogicalExpression extends Element {
    type: 'element';
    name: 'ogc:And' | 'ogc:Or' | 'ogc:Not';
    elements: (LogicalExpression | ComparisonExpression)[];
}
interface ComparisonExpression extends Element {
    type: 'element';
    name: 'ogc:PropertyIsEqualTo' | 'ogc:PropertyIsNotEqualTo' | 'ogc:PropertyIsLessThan' | 'ogc:PropertyIsGreaterThan' | 'ogc:PropertyIsLessThanOrEqualTo' | 'ogc:PropertyIsGreaterThanOrEqualTo';
    elements: [
        TextNode<'ogc:PropertyName', string>,
        TextNode<'ogc:Literal', unknown>
    ] & Element[];
}
interface Symbolizer extends Element {
    type: 'element';
    name: 'PolygonSymbolizer' | 'TextSymbolizer' | 'PointSymbolizer' | 'LineSymbolizer';
}
declare function defineSLD(config: Config): Config;

export { ComparisonExpression, Config, FeatureTypeStyle, Filter, LogicalExpression, Rule, ScaleDenominator, Symbolizer, UserLayer, UserStyle, defineSLD };
