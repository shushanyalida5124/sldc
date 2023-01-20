import { defineSLD } from '../dist/index.js';
export default defineSLD({
    elements: [
        {
            type: 'element',
            name: 'UserLayer',
            elements: [
                {
                    name: 'UserStyle',
                    type: 'element',
                    elements: [{
                            type: 'element',
                            name: 'FeatureTypeStyle',
                            elements: [{
                                    name: 'Rule',
                                    type: 'element',
                                    elements: [
                                        {
                                            type: 'element',
                                            name: 'ogc:Filter',
                                            elements: [
                                                {
                                                    type: 'element',
                                                    name: 'ogc:And',
                                                    elements: [
                                                        {
                                                            type: 'element',
                                                            name: 'ogc:PropertyIsLessThan',
                                                            elements: [
                                                                {
                                                                    type: 'element',
                                                                    name: 'ogc:PropertyName',
                                                                    elements: [{
                                                                            type: 'text',
                                                                            text: 'roadrsrp1'
                                                                        }]
                                                                },
                                                                {
                                                                    type: 'element',
                                                                    name: 'ogc:Literal',
                                                                    elements: [{
                                                                            type: 'text',
                                                                            text: -110
                                                                        }],
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }]
                        }]
                }
            ]
        }
    ]
});
