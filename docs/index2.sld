<?xml version="1.0" encoding="utf-8"?>
<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">
  <UserLayer>
    <UserStyle>
      <FeatureTypeStyle>
        <Rule>
          <ogc:Filter>
            <ogc:And>
              <ogc:PropertyIsLessThan>
                <ogc:PropertyName>roadrsrp1</ogc:PropertyName>
                <ogc:Literal>-110</ogc:Literal>
              </ogc:PropertyIsLessThan>
            </ogc:And>
          </ogc:Filter>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </UserLayer>
</sld:StyledLayerDescriptor>