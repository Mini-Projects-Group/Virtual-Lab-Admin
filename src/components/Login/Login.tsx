import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Alert } from 'antd';
import styles from './Login.module.css';
import axios from 'axios';
import { SERVER_URL } from '../../constants';
import { useHistory } from 'react-router';


const Login = () => {
    const history = useHistory();
    const [error, setError] = useState(false);

    const handleSubmit = async (val: any) => {
        const data = await axios.post(`${SERVER_URL}/admin/login`,{username: val.username, password: val.password});
        if(!data.data.error) {
            let token = data.data.token;
            localStorage.setItem('vl-token', token);
            history.push('/');
        } else {
            setError(true);
        }
    }

    return  <div className={styles.formContainer}>
                <Form
                    name="basic"
                    onChange={() => setError(false)}
                    layout={'vertical'}
                    initialValues={{ remember: false }}
                    onFinish={handleSubmit}
                    style={{width: '400px'}}
                    >
                    {error && <Alert message="Invalid credentials" type="error" showIcon />}
                    <br />
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            {min: 8, message: 'Password should have minimum 8 characters'}
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
    </div>
}

export default Login;