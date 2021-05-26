import { Button, Input, Form, Modal, Alert, Upload, message } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import { SERVER_URL } from '../../constants';
import { UploadOutlined } from '@ant-design/icons';

const NewStudent = ({f, ...props}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [choice, setChoice] : [Number, any] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [form] = Form.useForm();
    const [disabled,setDisabled] = useState(false);
    const [file, setFile] = useState([]);

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const showModal = (c: Number) => {
        setChoice(c);
        setIsModalVisible(true);
    }

    const handleSubmit = async (val: any) => {
        setDisabled(true);

        let data = await axios.post(
                    `${SERVER_URL}/student/register`,
                    val, 
                    { 
                        headers: 
                            { 
                                authorization: `Bearer ${localStorage.getItem('vl-token')}`
                            }
                    });
        
        console.log(data.data);
        if(data.data.error) {
            setError(data.data.message);

            setTimeout(() => setError(''), 5000);
        } else {
            setSuccess(data.data.message);
            setTimeout(() => setSuccess(''), 5000);

            form.resetFields();
            f();
        }
        handleCancel();
        setDisabled(false);
    }

    const beforeUpload = (file) => {
        return (file.name.slice(-3) == 'csv') ? true: Upload.LIST_IGNORE;
    }

    const onFileUpload = (info) => {
        setFile(info.fileList.slice(-1));

        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);

            handleCancel();
            setFile([]);
            f();
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
    }


    return (
        <>
        {error && <Alert message={error} type="error" showIcon />}
        {success && <Alert message={success} type="success" showIcon />}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2px', marginTop: '5px' }}>

            <Button style={{marginRight: '5px'}} onClick={() => showModal(0) }>Add Student</Button>


            <Button type="primary" onClick={ () => showModal(1) }>Upload CSV</Button>
            

            {/* ADD NEW STUDENT MODAL */}
            <Modal 
                centered 
                title={ choice == 0 ? 'New Student': 'Upload a CSV'} 
                visible={isModalVisible} onCancel={handleCancel}
                footer={null}
                >
                {
                    choice == 0 && <>
                              <Form
                                form={ form }
                                name="basic"
                                layout={'vertical'}
                                initialValues={{ password: 123456 }}
                                onFinish={handleSubmit}
                                >
                                <br />
                                <Form.Item
                                    label="Email"
                                    name="email"
                                
                                    rules={[{ required: true, message: 'Email cannot be empty' }]}
                                >
                                    <Input type="email" />
                                </Form.Item>

                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Name cannot be empty' }]}
                                >
                                    <Input />
                                </Form.Item>

                                

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {required: true, message: 'Password cannot be empty' },
                                    ]}
                                >
                                    <Input.Password value="123456" />
                                </Form.Item>

                                <Form.Item
                                    label="Roll No"
                                    name="roll_no"
                                    rules={[{ required: true, message: 'Roll No cannot be empty' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Registration ID"
                                    name="registration_id"
                                    rules={[{ required: true, message: 'Registration ID cannot be empty' }]}
                                >
                                    <Input />
                                </Form.Item>
                    

                                <Form.Item>
                                    <Button disabled={disabled} type="primary" htmlType="submit">
                                        Add Student
                                    </Button>
                                </Form.Item>
                            </Form>              
                    </>
                }

                {
                    choice == 1 && <>
                        <p>Only CSV file is supported <small>(Columns required <i>RegistrationID, Name, RollNo</i>)</small></p>
                        <Upload
                            fileList={file} 
                            multiple={false} 
                            onChange={onFileUpload} 
                            beforeUpload={beforeUpload}
                            action={`${SERVER_URL}/admin/new/students/file`}
                            name="file"
                            headers= {{ 
                                    authorization: `Bearer ${localStorage.getItem('vl-token')}`
                                }}
                            
                            >
                            <Button icon={<UploadOutlined />}>Choose file</Button>
                        </Upload>
                    </>
                }
            </Modal>
            {/* END OF NEW STUDENT MODAL */}

        </div>
    </>)
}

export default NewStudent
