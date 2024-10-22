
import { Button, Form, Input, Space } from 'antd-mobile';
import React, { useState } from 'react';

import { callSignInWithEmailAndPassword } from '../services/authenticationService';
import { Link, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const [form] = Form.useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleOnFinish = async (values) => {
        try {
            console.log('Login Form values', values);
            const res = await callSignInWithEmailAndPassword(values.username, values.password);

            if (res?.status === 200) {
                const data = await res.json();
                console.log('data: ', data);
                form.resetFields();
                navigate('/dashboard/home');
            } else {
                const data = await res.json();
                console.log('data: ', data);
                setError(data?.errorMessage);
            }

        } catch (error) {
            console.log('err: ', error.message);

            setError(error.message);

        }
    }
    const handleOnFinishFailed = ({ values, errorFields, outOfDate }) => { }
    return (
        <div className="form-container">
            <div className="form-header">
                <h1>Login</h1>
            </div>

            <Form

                form={form}
                initialValues={{
                    username: '',
                    password: ''
                }}
                footer={
                    <>
                        <span style={{
                            color: 'red',
                            paddingBottom: '3px',
                            marginBottom: '2px',
                            display: 'block'
                        }}>{error}</span>
                        <Button
                            type="submit"
                            block
                            color="primary"
                            size="large"
                        >Submit</Button>
                    </>
                }
                mode="default"
                onFinish={handleOnFinish}
                onFinishFailed={handleOnFinishFailed}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '20px',
                }}

            >
                <Form.Item name="username" label="Username" help=" Email address " rules={[{ required: true, message: 'Please enter the username' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter the password' }]}>
                    <Input type="password" />
                </Form.Item>
            </Form>
            <div className="signup-link">
                <Link to={'/signup'}>Don't have an account?</Link>
            </div>
        </div>

    );
}

export default LoginScreen;