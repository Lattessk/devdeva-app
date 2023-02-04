import React, { Component } from 'react'
import { Card, Col, Row } from 'antd';
import styles from './style.less'
import moment from 'moment';

interface CardProps {
    children: any;
    props: any;
    data: any;
}

const CardApprove: React.FC<CardProps> = ({ children, data, ...props }) => {
    return (
        <React.Fragment>
            <div className={styles.cardStyle}>
                <Card {...props}>
                    <Row>
                        <Col span={8}>
                            เลขที่ใบเบิก
                        </Col>
                        <Col span={8}>
                            {data.bill_id}
                        </Col>
                        <Col span={8}>
                            {moment(data.date).format('DD/MM/YYYY HH:mm')}
                        </Col>
                        <Col span={8}>
                            หน่วยงานที่เสนอ
                        </Col>
                        <Col span={8}>
                            {data.agency}
                        </Col>
                    </Row>
                    {children}
                </Card>
            </div>
        </React.Fragment>
    )
}

export default CardApprove