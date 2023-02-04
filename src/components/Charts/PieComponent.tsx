import React from 'react';
import { Pie } from '@ant-design/charts';
import numeral from 'numeral';

const PieComponent: React.FC = ({ text, value }: any) => {
    const data = [
        {
            type: text,
            value: value || 0,
        }
    ];
    const config = {
        appendPadding: 10,
        data,
        width: 250,
        height: 250,
        autoFit: false,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.64,
        meta: {
            value: {
                formatter: function formatter(v) {
                    return ''.concat(numeral(v).format('0,0'), '');
                },
            },
        },
        statistic: {
            style: {
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
            title: {
                formatter: function formatter(v) {
                    return text;
                },
                style: { fontSize: 11 }
            },
        },
        legend: {
            layout: 'horizontal',
            position: 'bottom'
        },
        label: {
            type: 'inner',
            offset: '-50%',
            style: { textAlign: 'center' },
            autoRotate: false,
            content: `${numeral(value).format('0,0')}`,
        },
        interactions: [
            { type: 'element-selected' },
            { type: 'element-active' },
            { type: 'pie-statistic-active' },
        ],
    };
    return <Pie {...config} />;
};

export default PieComponent;