
import { Button, Form, Input } from 'antd-mobile';
import React, { useState } from 'react';

import { signUpWithEmailAndPassword } from '../services/authenticationService';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SignUpScreen = () => {
    const [form] = Form.useForm();
    const [message, setMessage] = useState({text : '', isError : false});
    const navigate = useNavigate();

    const handleClick = () => { }

    const handleOnFinish = async (values) => {
        try {
            const data = await signUpWithEmailAndPassword(values.username, values.password);
            form.resetFields();  
            setMessage({ text: 'Account created successfully. Please login!', isError: false });
            navigate('/login');
        } catch (error) {
            setMessage({ text: error.message || 'Sign-up failed. Please try again.', isError: true });
        }
    }
    const handleOnFinishFailed = ({ values, errorFields, outOfDate }) => { }
    return (
        <div className="form-container">
            <div className="form-header">
                <h1>Sign Up</h1>
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
                            color: message.isError ? 'red' : 'green',
                            paddingBottom: '3px',
                            marginBottom: '2px',
                            display: 'block'
                        }}>{message.text}</span>
                        <Button
                            disabled={form.getFieldError}
                            type="submit"
                            block
                            color="primary"
                            size="large"
                            onClick={handleClick}>Submit</Button>
                    </>
                }
                mode="default"
                onFinish={handleOnFinish}
                onFinishFailed={handleOnFinishFailed}
                style={{
                    width: '100%',
                    maxWidth: '400px', // Adjust max width as needed
                    padding: '20px',
                }}

            >
                <Form.Item name="username" label="Username" help=" Email address " rules={[{ required: true, message: 'Please enter the username' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter the password' }]}>
                    <Input type="password" />
                </Form.Item>
                <Form.Item name="repeatPassword" label="Repeat Password" dependencies={['password']}

                    rules={[{ required: true, message: 'Please re enter the password' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords do not match'));
                        }
                    })
                    ]}>
                    <Input type="password" />
                </Form.Item>
            </Form>
            <div className="signup-link">
                <Link to={'/login'}>Already have an account?</Link>
            </div>
        </div>

    );
}

export default SignUpScreen;