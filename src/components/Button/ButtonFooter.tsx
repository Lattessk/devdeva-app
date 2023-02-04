import React from 'react';
import { Row, Col, Button } from 'antd';
import { history } from 'umi';
import { ThemeColor } from '@/consants/theme';

const ButtonFooter = ({
    back = true,
    backText = 'Back',
    submit = true,
    submitText = 'Create',
    onSubmit = null,
    backPage = null,
    disable = false,
    justify = 'center',
    isUpdate = false,
    updateText = 'Update',
    onUpdate = null,
    cancel = false,
    onBack = null,
    // loading = false,
    // history = null,
}) => (
    <Row gutter={12} justify={justify}>
        {
            back &&
            <Col>
                <Button size="large" style={{ minWidth: 100, backgroundColor: 'rgba(0, 0, 0, 0.08)' }} onClick={() => history.goBack()}>
                    {backText}
                </Button>
            </Col>
        }
        {
            cancel &&
            <Col>
                <Button size="large" style={{ minWidth: 100, backgroundColor: 'rgba(0, 0, 0, 0.08)' }} onClick={() => onBack()}>
                    {backText}
                </Button>
            </Col>
        }
        {isUpdate &&
            <Col>
                <Button
                    disabled={disable} type="primary" size="large"
                    style={{ minWidth: 100, color: '#FFF' }}
                    htmlType="submit"
                    onClick={onUpdate}>
                    {updateText}
                </Button>
            </Col>
        }
        {
            submit &&
            <Col>
                <Button
                    // loading={loading}
                    disabled={disable} type="primary" size="large"
                    style={{ minWidth: 100, color: '#FFF', backgroundColor: ThemeColor.Theme, border: `1px solid ${ThemeColor.Theme}` }}
                    htmlType="submit" onClick={onSubmit}>
                    {submitText}
                </Button>
            </Col>
        }
    </Row>
);

export default ButtonFooter;
