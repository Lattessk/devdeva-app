import React, { useState } from 'react'
import { ConfigProvider, } from 'antd';
import ProTable from '@ant-design/pro-table';
import EN from 'antd/lib/locale/en_US';
import styles from './style.less'

interface TableProps {
    search: any;
    request: any;
    columns: any;
    toolBarRender: any;
    dataSource: any;
    showSizeChanger: boolean;
    total: any;
    setPage: any;
}

const TableComponent: React.FC<TableProps> = ({ search = false, showSizeChanger = true, total, setPage = null, ...props }) => {
    const [page, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const handleChange = (pagination = {}, filters = {}, sorter) => {
        setCurrentPage(pagination.current)
        setPageSize(pagination.pageSize)
        setPage(pagination.current)
    }
    return (
        <React.Fragment>
            <ConfigProvider locale={EN}>
                <ProTable
                    bordered
                    className={styles.customtable}
                    search={search}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                    options={false}
                    pagination={{ showTotal: false, showSizeChanger, total, current: page, pageSize }}
                    // actionRef={actionRef}
                    rowKey="key"
                    dateFormatter="string"
                    {...props}
                />
            </ConfigProvider>
        </React.Fragment>
    )
}

export default TableComponent