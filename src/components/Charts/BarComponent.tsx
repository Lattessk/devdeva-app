import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/charts';

const BarComponent: React.FC = ({ data }: any) => {
    // const data = [
    //     {
    //         company: 'บริษัท A',
    //         value: 60.2,
    //         color: "red"
    //     },
    //     {
    //         company: 'บริษัท B',
    //         value: 38.8,
    //         color: "yellow"
    //     },
    //     {
    //         company: 'บริษัท C',
    //         value: 22.7,
    //         color: "red"
    //     },
    //     {
    //         company: 'บริษัท D',
    //         value: 94.4,
    //         color: "yellow"
    //     },
    // ];
    const config = {
        data,
        width: 500,
        height: 350,
        xField: 'value',
        yField: 'id',
        seriesField: 'id',
        legend: { position: 'bottom' },
    };
    return <Bar {...config} />;
};

export default BarComponent;