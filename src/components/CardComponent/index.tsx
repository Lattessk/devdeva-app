import React, { Component } from 'react'
import { Card, } from 'antd';
import styles from './style.less'

interface CardProps {
    children: any;
    title: string;
    props: any;
    color: any;
    width: any;
}

const CardComponent: React.FC<CardProps> = ({ children, title, color, width = '100%', ...props }) => {
    return (
        <React.Fragment>
            <div className={styles.cardStyle}>
                <Card title={title} bodyStyle={{ borderRadius: 25, backgroundColor: color, width }} {...props}>
                    {children}
                </Card>
            </div>
        </React.Fragment>
    )
}

export default CardComponent