import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Row, Col, Input, Button, Divider, Form, Select, InputNumber, DatePicker, Modal, Popconfirm } from 'antd';
import style from './style.less';
import type { ProColumns } from '@ant-design/pro-table';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, ExportOutlined, FileOutlined, FileTextOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { Formik } from 'formik';
import * as R from 'ramda';
import * as yup from 'yup';
import TableComponent from '@/components/TableComponent';
import ButtonAdd from '@/components/Button/ButtonAdd';
import ButtonFooter from '@/components/Button/ButtonFooter';
import moment from 'moment';
import CardApprove from '@/components/CardComponent/CardApprove';
import CardTask from '@/components/CardComponent/CardTask';
import FileSaver from "file-saver";
import XLSX from 'xlsx';

const validationSchema = yup.object().shape({
    bill_id: yup.string().required('กรุณาระบุ ID ใบเบิก'),
    bill_number: yup.string().required('กรุณาระบุ เลขที่ใบเบิก'),
    amount: yup.string().required('กรุณาระบุ จำนวนเงิน'),
    year: yup.string().required('กรุณาระบุ เลือกปีงบประมาณ'),
    date: yup.string().required('กรุณาระบุ วันที่เบิก'),
});
const validationSchema1 = yup.object().shape({
    number: yup.string().required('กรุณาระบุ เลขครุภัณฑ์'),
    name: yup.string().required('กรุณาระบุ ชื่อครุภัณฑ์'),
    brand: yup.string().required('กรุณาระบุ ยี่ห้อ/รุ่น/ขนาด'),
    qty: yup.string().required('กรุณาระบุ จำนวน'),
    amount: yup.string().required('กรุณาระบุ จำนวนเงิน'),
});
let mockDataApprove = [];
for (let i = 0; i < 3; i++) {
    mockDataApprove.push({
        bill_id: i + 100,
        bill_number: '11ds1',
        agency: 'test',
        date: new Date(),
        amount: 100,
        year: new Date().getFullYear(),
    });
}
let mockData = [];
for (let i = 0; i < 3; i++) {
    mockData.push({
        number: i + 100,
        name: 'ddd',
        brand: 'sss',
        qty: 1,
        amount: 100,
    });
}
const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const PickUp = (props) => {
    const [form] = Form.useForm();
    const [dataApprove, setDataApprove] = useState(mockDataApprove)
    const [data, setData] = useState(mockData)
    const [visible, setVisible] = useState(false)
    const view = new URL(window.location.href).searchParams.get('view');
    const [page, setPage] = useState(1);

    const handleSubmits = (val: any) => {
        console.log('submit', val)

        const payload = {
            ...val
        }
        setData(data.concat(payload))
        setVisible(false)
    };
    const handleSubmitApprove = (val: any) => {
        console.log('submit', val)

        const payload = {
            ...val
        }
        setDataApprove(dataApprove.concat(payload))
    };
    const field = ({ values, setFieldValue, setFieldTouched, handleChange, handleBlur }: any) => {
        return [
            {
                name: 'bill_id',
                span: 8,
                component: <Input onChange={handleChange} onBlur={handleBlur} />,
                props: { value: values.bill_id },
                propsForm: { label: 'ID ใบเบิก', required: true },
            },
            {
                name: 'bill_number',
                span: 8,
                component: <Input onChange={handleChange} onBlur={handleBlur} maxLength={13} />,
                props: { value: values.bill_number },
                propsForm: { label: 'เลขที่ใบเบิก', required: true },
            },
            {
                name: 'document',
                span: 8,
                component: <Input onChange={handleChange} onBlur={handleBlur} maxLength={10} />,
                props: { value: values.document },
                propsForm: { label: 'ทะเบียนเอกสาร' },
            },
            {
                name: 'agencies',
                span: 8,
                component: <Select
                    value={values.agencies}
                    onChange={v => {
                        setFieldValue('agencies', v);
                        form.setFieldsValue({ agencies: '' })
                    }}
                    onBlur={() => setFieldTouched('agencies')}
                />,
                props: { value: values.agencies, showSearch: true },
                propsForm: { label: 'หน่วยงาน' },
                children: [{ value: 1, label: 'หน่วยงาน' }].map(each => (
                    <Option key={each.value} value={each.value}>
                        {each.label}
                    </Option>
                )),
            },
            {
                name: 'eligibility',
                span: 8,
                component: <Input onChange={handleChange} onBlur={handleBlur} />,
                props: { value: values.eligibility },
                propsForm: { label: 'ผู้มีสิทธิ์' },
            },
            {
                name: 'date',
                span: 8,
                component: <DatePicker
                    disabledDate={(current) => current && current > moment().endOf('day')}
                    showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm"
                    onChange={(v) => {
                        setFieldValue('date', v)
                    }}
                    onOk={(v) => {
                        setFieldValue('date', v)
                    }}
                />,
                props: { value: values.date, style: { width: 150 } },
                propsForm: { label: 'วันที่เบิก', required: true },
            },
            {
                name: 'agency',
                span: 8,
                component: <Input onChange={handleChange} onBlur={handleBlur} />,
                props: { value: values.agency },
                propsForm: { label: 'หน่วยงาน' },
            },
            {
                name: 'amount',
                span: 8,
                component: <InputNumber
                    min={0}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={(v) => {
                        setFieldValue('amount', v)
                    }}
                    onBlur={() => setFieldTouched('amount')} />,
                props: { value: values.amount, style: { width: '100%' } },
                propsForm: { label: 'จำนวนเงิน', required: true, },
            },
            {
                name: 'year',
                span: 8,
                component: <DatePicker
                    disabledDate={(current) => current && current > moment().endOf('day')}
                    onChange={(v) => {
                        setFieldValue('year', v)
                    }} picker="year" />,
                props: { value: values.year, style: { width: 150 } },
                propsForm: { label: 'เลือกปีงบประมาณ', required: true },
            },
        ]
    }
    const field1 = ({ values, setFieldValue, setFieldTouched, handleChange, handleBlur }: any) => {
        return [
            {
                name: 'number',
                span: 12,
                component: <Input onChange={handleChange} onBlur={handleBlur} />,
                props: { value: values.number },
                propsForm: { label: 'เลขครุภัณฑ์', required: true },
            },
            {
                name: 'name',
                span: 12,
                component: <Input onChange={handleChange} onBlur={handleBlur} maxLength={13} />,
                props: { value: values.name },
                propsForm: { label: 'ชื่อครุภัณฑ์', required: true },
            },
            {
                name: 'brand',
                span: 12,
                component: <Input onChange={handleChange} onBlur={handleBlur} maxLength={10} />,
                props: { value: values.brand },
                propsForm: { label: 'ยี่ห้อ/รุ่น/ขนาด', required: true },
            },
            {
                name: 'serial_no',
                span: 12,
                component: <Input onChange={handleChange} onBlur={handleBlur} />,
                props: { value: values.serial_no },
                propsForm: { label: 'Serial No.' },
            },
            {
                name: 'distributor',
                span: 12,
                component: <Input onChange={handleChange} onBlur={handleBlur} />,
                props: { value: values.distributor },
                propsForm: { label: 'ผู้ผลิต/ผู้จำหน่าย' },
            },
            {
                name: 'qty',
                span: 12,
                component: <InputNumber
                    min={1}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={(v) => {
                        setFieldValue('qty', v)
                    }}
                    onBlur={() => setFieldTouched('qty')} />,
                props: { value: values.qty, style: { width: '100%' } },
                propsForm: { label: 'จำนวน', required: true, },
            },
            {
                name: 'amount',
                span: 12,
                component: <InputNumber
                    min={0}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={(v) => {
                        setFieldValue('amount', v)
                    }}
                    onBlur={() => setFieldTouched('amount')} />,
                props: { value: values.amount, style: { width: '100%' } },
                propsForm: { label: 'จำนวนเงิน', required: true, },
            },
        ]
    }
    const columns: ProColumns<any>[] = [
        {
            title: 'ลำดับ',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => (index + 1) + (10 * (page - 1)),
        },
        {
            title: 'เลขครุภัณฑ์',
            dataIndex: 'number',
            key: 'number',
            render: (_, record) => record.number
        },
        {
            title: 'ชื่อครุภัณฑ์',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => record.name
        },
        {
            title: 'ยี่ห้อ/รุ่น/ขนาด',
            dataIndex: 'brand',
            key: 'brand',
            render: (_, record) => record.brand
        },
        {
            title: 'Serial No.',
            dataIndex: 'serial_no',
            key: 'serial_no',
            render: (_, record) => record.serial_no
        },
        {
            title: 'ผู้ผลิต/ผู้จำหน่าย',
            dataIndex: 'distributor',
            key: 'distributor',
            render: (_, record) => record.distributor
        },
        {
            title: 'จำนวน',
            dataIndex: 'qty',
            key: 'qty',
            render: (_, record) => record.qty
        },
        {
            title: 'จำนวนเงิน',
            dataIndex: 'amount',
            key: 'amount',
            render: (_, record) => record.amount
        },
        {
            title: '',
            key: 'action',
            hideInSearch: true,
            width: '5%',
            render: (text, record, i) => (
                <span>
                    <Popconfirm
                        title="คุณแน่ใจหรือไม่ที่จะลบรายการนี้ ?"
                        key={record.number}
                        onConfirm={() => {
                            const newData = data.filter((item, index) => i !== index)
                            setData(newData)
                        }}
                    >
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<DeleteOutlined />}
                            style={{ marginRight: 8, backgroundColor: 'red', borderColor: 'red' }} />
                    </Popconfirm>
                </span>
            )
        },
    ];
    const onExport = (list) => {
        // let Heading = {}
        const Heading = [{
            number: 'เลขครุภัณฑ์',
            name: 'ชื่อครุภัณฑ์',
            brand: 'ยี่ห้อ/รุ่น/ขนาด',
            serial_no: 'Serial No.',
            distributor: 'ผู้ผลิต/ผู้จำหน่าย',
            qty: 'จำนวน',
            amount: 'จำนวนเงิน'
        }];

        Promise.all(list.map(async record => {
            const newRecord = {};
            return {
                ...newRecord,
                number: record.number ? record.number : '-',
                name: record.name ? record.name : '-',
                brand: record.brand ? record.brand : '-',
                serial_no: record.serial_no ? record.serial_no : '-',
                distributor: record.distributor ? record.distributor : '-',
                qty: record.qty ? record.qty : '-',
                amount: record.amount ? record.amount : '-',
            };
        })).then(file => {
            const wscols = [
                { wch: Math.max(...file.map(f => f.number.length)) },
                { wch: Math.max(...file.map(f => f.name.length)) },
                { wch: Math.max(...file.map(f => f.brand.length)) },
                { wch: Math.max(...file.map(f => f.serial_no.length)) },
                { wch: Math.max(...file.map(f => f.distributor.length)) },
                { wch: Math.max(...file.map(f => f.qty.length)) },
                { wch: Math.max(...file.map(f => f.amount.length)) },
            ];
            const headercols = [
                { wch: Math.max(...Heading.map(f => f.number.length)) },
                { wch: Math.max(...Heading.map(f => f.name.length)) },
                { wch: Math.max(...Heading.map(f => f.brand.length)) },
                { wch: Math.max(...Heading.map(f => f.serial_no.length)) },
                { wch: Math.max(...Heading.map(f => f.distributor.length)) },
                { wch: Math.max(...Heading.map(f => f.qty.length)) },
                { wch: Math.max(...Heading.map(f => f.amount.length)) },
            ];
            const ws = XLSX.utils.json_to_sheet(Heading, {
                header: ["number"],
                skipHeader: true,
                origin: 0 // ok
            });
            if (list.length > 0) {
                ws["!cols"] = wscols;
            } else {
                ws["!cols"] = headercols;
            }
            XLSX.utils.sheet_add_json(ws, file, {
                header: ["number"],
                skipHeader: true,
                origin: -1 // ok
            });
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const datas = new Blob([excelBuffer], { type: fileType });
            const pages = 'Report';
            FileSaver.saveAs(datas, `${pages}${moment().format('YYYYMMDD')}` + fileExtension);
        });
    }
    return (
        <PageHeaderWrapper header={{
            title: 'อนุมัติใบเบิกครุภัณฑ์',
            breadcrumb: {},
        }}>
            <div className={style.card}>
                <Card title="รายการเสนออนุมัติประจำวัน" style={{ backgroundColor: '#FFF', margin: 10, height: 'auto' }}
                    extra={window.innerWidth <= 992 ? null : <div style={{ display: 'flex' }}>
                        <DatePicker format="DD/MM/YYYY" disabledDate={(current) => current && current > moment().endOf('day')} style={{ width: 150 }} />
                        <Input style={{ width: 200 }} placeholder="หน่วยงานที่เสนอ รหัส P4P" />
                        <Input style={{ width: 150 }} placeholder="ดูทั้งหมด" />
                    </div>}>
                    {window.innerWidth <= 992 ? <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <DatePicker format="DD/MM/YYYY" disabledDate={(current) => current && current > moment().endOf('day')} style={{ width: '100%' }} />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Input placeholder="หน่วยงานที่เสนอ รหัส P4P" />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Input placeholder="ดูทั้งหมด" />
                        </Col>
                    </Row> : null}
                    <Divider style={{ margin: '10px 0' }} />
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <CardTask icon={<FileTextOutlined />} text="ทั้งหมด" count={5} />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <CardTask icon={<FileOutlined />} text="รออนุมัติ" count={5} />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <CardTask icon={<CheckCircleOutlined />} text="อนุมัติแล้ว" count={5} />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <CardTask icon={<CloseCircleOutlined />} text="Reject" count={5} />
                        </Col>
                    </Row>
                </Card>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                        <Card title="รายการเสนออนุมัติ" style={{ backgroundColor: '#FFF', margin: 10, height: 600, }}>
                            {dataApprove && dataApprove.map((each, i) =>
                                <CardApprove data={each}>
                                    <Divider style={{ margin: '10px 0' }} />
                                    <div style={{ textAlign: 'end' }}>
                                        <Popconfirm
                                            title="คุณแน่ใจหรือไม่ที่จะลบรายการนี้ ?"
                                            key={i}
                                            onConfirm={() => {
                                                const newData = dataApprove.filter((item, index) => i !== index)
                                                setDataApprove(newData)
                                            }}
                                        >
                                            <Button type="primary" danger>Reject</Button>
                                        </Popconfirm>
                                        <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c41a', marginLeft: 5 }}>อนุมัติ</Button>
                                    </div>
                                </CardApprove>)}
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                        <Card style={{ marginTop: 10 }}>
                            <div style={{ display: window.innerWidth <= 992 ? 'grid' : 'flex', justifyContent: 'space-between' }}>
                                <Title level={5}>
                                    รายการรอขออนุมัติเบิกจ่ายครุภัณฑ์
                                </Title>
                                <div>
                                    <Button>ดูรายละเอียด</Button>
                                    <Button type="primary" icon={<ExportOutlined />} style={{ marginLeft: 5 }}
                                        onClick={() => onExport(data)}>พิมพ์</Button>
                                </div>
                            </div>
                        </Card>
                        <Formik
                            onSubmit={handleSubmitApprove}
                            initialValues={{
                                ...dataApprove,
                                amount: 0,
                            }}
                            validationSchema={validationSchema}
                        >
                            {({ handleSubmit, ...formik }) => (
                                <Form
                                    form={form}
                                    layout="inline"
                                    onFinish={handleSubmit}
                                    colon={false}
                                    labelCol={{ xs: { span: 24 }, sm: { span: 16 } }}
                                    wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
                                // wrapperCol={{ xs: { span: 24 } }}
                                >
                                    <Card title="บันทึกใบเบิกครุภัณฑ์" style={{ backgroundColor: '#FFF', height: 'auto' }}
                                        extra={
                                            <Button type="primary" htmlType="submit">บันทึก</Button>}
                                    >
                                        <Row gutter={24}>
                                            {field(formik).map(({ component, span, props: prop, propsForm, name, children }) => (
                                                <Col key={name} xs={24} sm={24} md={24} lg={span} xl={span}>
                                                    <Form.Item
                                                        name={name}
                                                        labelAlign="left"
                                                        valuePropName="checked"
                                                        style={{ ...propsForm.style, width: '100%', display: 'grid' }}
                                                        {...propsForm}
                                                        help={
                                                            (formik.touched[name] || formik.submitCount > 0) && formik.errors[name]
                                                                ? formik.errors[name]
                                                                : ''
                                                        }
                                                        validateStatus={
                                                            (formik.touched[name] || formik.submitCount > 0) && formik.errors[name]
                                                                ? 'error'
                                                                : undefined
                                                        }
                                                    >
                                                        {React.cloneElement(
                                                            component,
                                                            {
                                                                disabled: !!view, ...prop,
                                                                name,
                                                                checked: props.value,
                                                                defaultValue: prop.value,
                                                                // value: props.value,
                                                            },
                                                            children,
                                                        )}
                                                    </Form.Item>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card>
                                </Form>
                            )
                            }
                        </Formik>
                        <Card title="รายการบันทึกใบเบิกครุภัณฑ์" style={{ backgroundColor: '#FFF', height: 'auto' }}>
                            <TableComponent
                                showSizeChanger={true}
                                key="document"
                                toolBarRender={() =>
                                    <React.Fragment>
                                        <ButtonAdd text='เพิ่มใบเบิกครุภัณฑ์' onClick={() => setVisible(true)} />
                                    </React.Fragment>
                                }
                                search={false}
                                setPage={(v) => setPage(v)}
                                columns={columns}
                                dataSource={data}
                                total={data.length}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
            {
                visible && <Modal
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    footer={null}
                >
                    <Formik
                        onSubmit={handleSubmits}
                        initialValues={{
                            ...data,
                            qty: 1,
                            amount: 0,
                        }}
                        validationSchema={validationSchema1}
                    >
                        {({ handleSubmit, ...formik }) => (
                            <Form
                                form={form}
                                layout="inline"
                                onFinish={handleSubmit}
                                colon={false}
                                labelCol={{ xs: { span: 24 }, sm: { span: 16 } }}
                                wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
                            // wrapperCol={{ xs: { span: 24 } }}
                            >
                                <Row gutter={24}>
                                    {field1(formik).map(({ component, span, props: prop, propsForm, name, children }) => (
                                        <Col key={name} xs={24} sm={24} md={24} lg={span} xl={span}>
                                            <Form.Item
                                                name={name}
                                                labelAlign="left"
                                                valuePropName="checked"
                                                style={{ ...propsForm.style, width: '100%', display: 'grid' }}
                                                {...propsForm}
                                                help={
                                                    (formik.touched[name] || formik.submitCount > 0) && formik.errors[name]
                                                        ? formik.errors[name]
                                                        : ''
                                                }
                                                validateStatus={
                                                    (formik.touched[name] || formik.submitCount > 0) && formik.errors[name]
                                                        ? 'error'
                                                        : undefined
                                                }
                                            >
                                                {React.cloneElement(
                                                    component,
                                                    {
                                                        disabled: !!view, ...prop,
                                                        name,
                                                        checked: props.value,
                                                        defaultValue: prop.value,
                                                        // value: props.value,
                                                    },
                                                    children,
                                                )}
                                            </Form.Item>
                                        </Col>
                                    ))}
                                </Row>
                                <div style={{ display: 'grid', justifyContent: 'end', width: '100%' }}>
                                    <ButtonFooter submit={true} onBack={() => setVisible(false)} backText="Close" back={false} cancel />
                                </div>
                            </Form>
                        )
                        }
                    </Formik>
                </Modal>
            }
        </PageHeaderWrapper>
    );
};

export default PickUp;
