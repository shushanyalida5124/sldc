/**
 * A reference to a named layer in the server catalog
 */
type Config = Record<'NamedLayer', UserStyle[]>;
/**
 * The definition of a style to apply to the layer
 */
type UserStyle = Record<'UserStyle', FeatureTypeStyle[]>;
/**
 * 	Defines the symbology for rendering a single feature type.
 */
type FeatureTypeStyle = Record<'FeatureTypeStyle', Rule[]>;
/**
 * 	A styling rule to be evaluated
 */
type Rule = Record<'Rule', (ScaleDenominator | Filter | Symbolizer)[]>;
type ScaleDenominatorKey = 'MaxScaleDenominator' | 'MinScaleDenominator';
/**
 * 	Specifies the minimum or maximum  scale denominator (inclusive or exclusive) for the scale range in which this rule applies. If present, the rule applies at scales smaller or larger than the given scale..
 */
type ScaleDenominator = {
    [key in ScaleDenominatorKey]?: number;
};
/**
 * 	Specifies a filter controlling when the rule is applied.
 */
type Filter = Record<'ogc:Filter', (LogicalExpression | ComparisonExpression)[]>;
type LogicalKey = 'ogc:And' | 'ogc:Or' | 'ogc:Not';
/**
 * Logical operators are used to create logical combinations of other filter operators. They may be nested to any depth.
 */
type LogicalExpression = {
    [key in LogicalKey]?: (LogicalExpression | ComparisonExpression)[];
};
type ComparisonKey = 'ogc:PropertyIsEqualTo' | 'ogc:PropertyIsNotEqualTo' | 'ogc:PropertyIsLessThan' | 'ogc:PropertyIsGreaterThan' | 'ogc:PropertyIsLessThanOrEqualTo' | 'ogc:PropertyIsGreaterThanOrEqualTo';
/**
 * Comparison operators are used to specify conditions on the non-spatial attributes of a feature.
 */
type ComparisonExpression = {
    [key in ComparisonKey]?: [
        {
            'ogc:PropertyName': string;
        },
        {
            'ogc:Literal': string | number | boolean;
        }
    ];
};
type SymbolizerKey = 'PolygonSymbolizer' | 'TextSymbolizer' | 'PointSymbolizer' | 'LineSymbolizer';
/**
 * A PointSymbolizer styles features as points.
 * A LineSymbolizer styles features as lines.
 * A PolygonSymbolizer styles features as polygons.
 * A TextSymbolizer styles features as text labels.
 */
type Symbolizer = {
    [key in SymbolizerKey]?: (Geometry | Graphic | Stroke | PerpendicularOffset | Fill | Label | Font | LabelPlacement | Halo | Priority | VendorOption)[];
};
/**
 * The Geometry element is optional. If present, it specifies the featuretype property from which to obtain the geometry to style using the PropertyName element.
 */
type Geometry = Record<'Geometry', unknown>;
/**
 * Specifies the styling for the point symbol.
 */
type Graphic = Record<'Graphic', (ExternalGraphic | Mark | Opacity | Size | Rotation)[]>;
/**
 * Specifies an external image file to use as the symbol.
 */
type ExternalGraphic = Record<'ExternalGraphic', [
    {
        OnlineResource: [
            {
                _attr: {
                    'xmlns:xlink'?: string;
                    'xlink:type': 'simple';
                    'xlink:href': string;
                };
            }
        ];
    },
    {
        Format: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/svg+xml';
    }
]>;
/**
 * Marks are predefined vector shapes identified by a well-known name.
 */
type Mark = Record<'Mark', (WellKnownName | Fill | Stroke)[]>;
/**
 * 	Specifies the opacity (transparency) of the symbol. Values range from 0 (completely transparent) to 1 (completely opaque).
 */
type Opacity = Record<'Opacity', number>;
/**
 * 	Specifies the size of the symbol, in pixels. When used with an image file, this specifies the height of the image, with the width being scaled accordingly. if omitted the native symbol size is used.
 */
type Size = Record<'Size', number>;
/**
 * Specifies the rotation of the symbol about its center point, in decimal degrees. Positive values indicate rotation in the clockwise direction, negative values indicate counter-clockwise rotation.
 */
type Rotation = Record<'Rotation', number>;
/**
 * The name of the shape. Standard SLD shapes are circle, square, triangle, star, cross, or x.
 */
type WellKnownName = Record<'WellKnownName', 'circle' | 'square' | 'triangle' | 'star' | 'cross' | 'x'>;
/**
 * 	Specifies how the symbol should be filled (for closed shapes).
 */
type Fill = Record<'Fill', (CssParameter<'fill' | 'fill-opacity'> | GraphicFill)[]>;
/**
 * Specifies how the symbol linework should be drawn.
 */
type Stroke = Record<'Stroke', (CssParameter<'stroke' | 'stroke-dasharray' | 'stroke-width' | 'fill-opacity' | 'stroke-dashoffset' | 'stroke-linejoin' | 'stroke-linecap'> | GraphicStroke | GraphicFill)[]>;
/**
 * Determines the styling parameters.
 */
type CssParameter<name extends 'fill' | 'stroke' | 'fill-opacity' | 'stroke-dasharray' | 'stroke-dashoffset' | 'stroke-width' | 'stroke-linejoin' | 'stroke-linecap' | 'font-family' | 'font-style' | 'font-weight' | 'font-size'> = {
    CssParameter: [
        {
            _attr: {
                name: name;
            };
        },
        ...(name extends 'fill' ? (GraphicFill | CssParameter<'fill'> | CssParameter<'fill-opacity'>)[] : []),
        string | number
    ];
};
/**
 * 	Renders the fill with a repeated pattern.
 */
type GraphicFill = Record<'GraphicFill', [Graphic]>;
/**
 * 	Renders the line with a repeated linear graphic.
 */
type GraphicStroke = Record<'GraphicStroke', [Graphic]>;
/**
 * 	The text content for the label.
 */
type Label = Record<'Label', string | number>;
/**
 * 	The font information for the label。
 */
type Font = Record<'Font', CssParameter<'font-family' | 'font-style' | 'font-weight' | 'font-size'>[]>;
/**
 * 	Sets the position of the label relative to its associated geometry.
 */
type LabelPlacement = Record<'LabelPlacement', (PointPlacement | LinePlacement)[]>;
/**
 * 	Labels a geometry at a single point
 */
type PointPlacement = Record<'PointPlacement', (AnchorPoint | Displacement | Rotation)[]>;
/**
 * 	Labels a geometry along a linear path
 */
type LinePlacement = Record<'LinePlacement', PerpendicularOffset[]>;
/**
 * 	The offset from the linear path, in pixels. Positive values offset to the left of the line, negative to the right.
 */
type PerpendicularOffset = Record<'PerpendicularOffset', number | string>;
/**
 * The location within the label bounding box that is aligned with the label point. The location is specified by AnchorPointX and AnchorPointY sub-elements, with values in the range [0..1].
 */
type AnchorPoint = Record<'AnchorPoint', Record<'AnchorPointX' | 'AnchorPointY', number | string>[]>;
/**
 * 	Specifies that the label point should be offset from the original point. The offset is specified by DisplacementX and DisplacementY sub-elements, with values in pixels.
 */
type Displacement = Record<'Displacement', Record<'DisplacementX' | 'DisplacementY', number | string>[]>;
/**
 * 	Creates a colored background around the label text, for improved legibility.
 */
type Halo = Record<'Halo', (Radius | Fill)[]>;
/**
 *  The halo radius, in pixels.
 */
type Radius = Record<'Radius', number | string>;
/**
 * 	The priority of the label during conflict resolution.
 */
type Priority = Record<'Priority', number | string>;
/**
 * 	A GeoServer-specific option.
 */
type VendorOption = Record<'VendorOption', unknown>;
declare function defineSLD(config: Config): Config;

export { AnchorPoint, ComparisonExpression, Config, CssParameter, Displacement, ExternalGraphic, FeatureTypeStyle, Fill, Filter, Font, Geometry, Graphic, GraphicFill, GraphicStroke, Halo, Label, LabelPlacement, LinePlacement, LogicalExpression, Mark, Opacity, PerpendicularOffset, PointPlacement, Priority, Radius, Rotation, Rule, ScaleDenominator, Size, Stroke, Symbolizer, UserStyle, VendorOption, WellKnownName, defineSLD };
