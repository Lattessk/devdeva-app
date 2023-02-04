import React, { Component } from 'react'
import { Card, Col, Row } from 'antd';
import styles from './style.less'

interface CardProps {
    children: any;
    props: any;
    data: any;
    icon: any;
    text: string;
    count: number;
}

const CardTask: React.FC<CardProps> = ({ children, data, icon, text, count, ...props }) => {
    return (
        <React.Fragment>
            <div className={styles.cardStyle}>
                <Card {...props}>
                    <Row>
                        <Col span={4}>{icon}</Col>
                        <Col span={18}>{text}</Col>
                        <Col span={2}>{count}</Col>
                    </Row>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default CardTask