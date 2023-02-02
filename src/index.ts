/**
 * A reference to a named layer in the server catalog
 */
export type Config = Record<'NamedLayer', UserStyle[]>;

/**
 * The definition of a style to apply to the layer
 */
export type UserStyle = Record<'UserStyle', FeatureTypeStyle[]>;

/**
 * 	Defines the symbology for rendering a single feature type.
 */
export type FeatureTypeStyle = Record<'FeatureTypeStyle', Rule[]>;

/**
 * 	A styling rule to be evaluated
 */
export type Rule = Record<'Rule', (ScaleDenominator | Filter | Symbolizer)[]>;

type ScaleDenominatorKey = 'MaxScaleDenominator' | 'MinScaleDenominator';

/**
 * 	Specifies the minimum or maximum  scale denominator (inclusive or exclusive) for the scale range in which this rule applies. If present, the rule applies at scales smaller or larger than the given scale..
 */
export type ScaleDenominator = Record<ScaleDenominatorKey, number>;

/**
 * 	Specifies a filter controlling when the rule is applied.
 */
export type Filter = Record<
  'ogc:Filter',
  (LogicalExpression | ComparisonExpression)[]
>;
type LogicalKey = 'ogc:And' | 'ogc:Or' | 'ogc:Not';
/**
 * Logical operators are used to create logical combinations of other filter operators. They may be nested to any depth.
 */
export type LogicalExpression = {
  [key in LogicalKey]?: (LogicalExpression | ComparisonExpression)[];
};

type ComparisonKey =
  | 'ogc:PropertyIsEqualTo'
  | 'ogc:PropertyIsNotEqualTo'
  | 'ogc:PropertyIsLessThan'
  | 'ogc:PropertyIsGreaterThan'
  | 'ogc:PropertyIsLessThanOrEqualTo'
  | 'ogc:PropertyIsGreaterThanOrEqualTo';

/**
 * Comparison operators are used to specify conditions on the non-spatial attributes of a feature.
 */
export type ComparisonExpression = {
  [key in ComparisonKey]?: [
    {
      'ogc:PropertyName': string;
    },
    {
      'ogc:Literal': string | number | boolean;
    }
  ];
};

type SymbolizerKey =
  | 'PolygonSymbolizer'
  | 'TextSymbolizer'
  | 'PointSymbolizer'
  | 'LineSymbolizer';

/**
 * A PointSymbolizer styles features as points.
 * A LineSymbolizer styles features as lines.
 * A PolygonSymbolizer styles features as polygons.
 * A TextSymbolizer styles features as text labels.
 */
export type Symbolizer = {
  [key in SymbolizerKey]?: (
    | Geometry
    | Graphic
    | Stroke
    | PerpendicularOffset
    | Fill
    | Label
    | Font
    | LabelPlacement
    | Halo
    | Priority
    | VendorOption
  )[];
};

/**
 * The Geometry element is optional. If present, it specifies the featuretype property from which to obtain the geometry to style using the PropertyName element.
 */
export type Geometry = Record<'Geometry', unknown>;

/**
 * Specifies the styling for the point symbol.
 */
export type Graphic = Record<
  'Graphic',
  (ExternalGraphic | Mark | Opacity | Size | Rotation)[]
>;

/**
 * Specifies an external image file to use as the symbol.
 */
export type ExternalGraphic = Record<
  'ExternalGraphic',
  [
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
  ]
>;

/**
 * Marks are predefined vector shapes identified by a well-known name.
 */
export type Mark = Record<'Mark', (WellKnownName | Fill | Stroke)[]>;

/**
 * 	Specifies the opacity (transparency) of the symbol. Values range from 0 (completely transparent) to 1 (completely opaque).
 */
export type Opacity = Record<'Opacity', number>;

/**
 * 	Specifies the size of the symbol, in pixels. When used with an image file, this specifies the height of the image, with the width being scaled accordingly. if omitted the native symbol size is used.
 */
export type Size = Record<'Size', number>;

/**
 * Specifies the rotation of the symbol about its center point, in decimal degrees. Positive values indicate rotation in the clockwise direction, negative values indicate counter-clockwise rotation.
 */
export type Rotation = Record<'Rotation', number>;

/**
 * The name of the shape. Standard SLD shapes are circle, square, triangle, star, cross, or x.
 */
export type WellKnownName = Record<
  'WellKnownName',
  'circle' | 'square' | 'triangle' | 'star' | 'cross' | 'x'
>;
/**
 * 	Specifies how the symbol should be filled (for closed shapes).
 */
export type Fill = Record<
  'Fill',
  (CssParameter<'fill' | 'fill-opacity'> | GraphicFill)[]
>;

/**
 * Specifies how the symbol linework should be drawn.
 */
export type Stroke = Record<
  'Stroke',
  (
    | CssParameter<
        | 'stroke'
        | 'stroke-dasharray'
        | 'stroke-width'
        | 'fill-opacity'
        | 'stroke-dashoffset'
        | 'stroke-linejoin'
        | 'stroke-linecap'
      >
    | GraphicStroke
    | GraphicFill
  )[]
>;

/**
 * Determines the styling parameters.
 */
export type CssParameter<
  name extends
    | 'fill'
    | 'stroke'
    | 'fill-opacity'
    | 'stroke-dasharray'
    | 'stroke-dashoffset'
    | 'stroke-width'
    | 'stroke-linejoin'
    | 'stroke-linecap'
    | 'font-family'
    | 'font-style'
    | 'font-weight'
    | 'font-size'
> = {
  CssParameter: [
    {
      _attr: {
        name: name;
      };
    },
    ...(name extends 'fill'
      ? (GraphicFill | CssParameter<'fill'> | CssParameter<'fill-opacity'>)[]
      : []),
    string | number
  ];
};
/**
 * 	Renders the fill with a repeated pattern.
 */
export type GraphicFill = Record<'GraphicFill', [Graphic]>;

/**
 * 	Renders the line with a repeated linear graphic.
 */
export type GraphicStroke = Record<'GraphicStroke', [Graphic]>;

/**
 * 	The text content for the label.
 */
export type Label = Record<'Label', string | number>;

/**
 * 	The font information for the label。
 */
export type Font = Record<
  'Font',
  CssParameter<'font-family' | 'font-style' | 'font-weight' | 'font-size'>[]
>;

/**
 * 	Sets the position of the label relative to its associated geometry.
 */
export type LabelPlacement = Record<
  'LabelPlacement',
  (PointPlacement | LinePlacement)[]
>;

/**
 * 	Labels a geometry at a single point
 */
export type PointPlacement = Record<
  'PointPlacement',
  (AnchorPoint | Displacement | Rotation)[]
>;
/**
 * 	Labels a geometry along a linear path
 */
export type LinePlacement = Record<'LinePlacement', PerpendicularOffset[]>;

/**
 * 	The offset from the linear path, in pixels. Positive values offset to the left of the line, negative to the right.
 */
export type PerpendicularOffset = Record<
  'PerpendicularOffset',
  number | string
>;
/**
 * The location within the label bounding box that is aligned with the label point. The location is specified by AnchorPointX and AnchorPointY sub-elements, with values in the range [0..1].
 */
export type AnchorPoint = Record<
  'AnchorPoint',
  Record<'AnchorPointX' | 'AnchorPointY', number | string>[]
>;

/**
 * 	Specifies that the label point should be offset from the original point. The offset is specified by DisplacementX and DisplacementY sub-elements, with values in pixels.
 */
export type Displacement = Record<
  'Displacement',
  Record<'DisplacementX' | 'DisplacementY', number | string>[]
>;
/**
 * 	Creates a colored background around the label text, for improved legibility.
 */
export type Halo = Record<'Halo', (Radius | Fill)[]>;
/**
 *  The halo radius, in pixels.
 */
export type Radius = Record<'Radius', number | string>;
/**
 * 	The priority of the label during conflict resolution.
 */
export type Priority = Record<'Priority', number | string>;
/**
 * 	A GeoServer-specific option.
 */
export type VendorOption = Record<'VendorOption', unknown>;
export function defineSLD(config: Config) {
  return config;
}
