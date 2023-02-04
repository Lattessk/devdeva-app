import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ThemeColor } from '@/consants/theme';

const ButtonAdd = ({
    text = 'Add',
    onClick = null,
}) => (
    <Button onClick={() => onClick()} style={{ backgroundColor: ThemeColor.Theme, border: `1px solid ${ThemeColor.Theme}` }} type="primary" icon={<PlusOutlined />}>
        {text}
    </Button>
);

export default ButtonAdd;
