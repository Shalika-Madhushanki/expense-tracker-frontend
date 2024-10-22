
import { Button, Form, Input } from 'antd-mobile';
import React, { useState } from 'react';

import { signUpWithEmailAndPassword } from '../services/authenticationService';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SignUpScreen = () => {
    const [form] = Form.useForm();
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const selectedPath = location.pathname.startsWith('/login') ? 'login' : 'signup';

    const handleClick = () => { }

    const handleOnFinish = async (values) => {
        try {
            console.log('Login Form values', values);
            const res = await signUpWithEmailAndPassword(values.username, values.password);
            if (res?.status === 200) {
                const data = await res.json(); // TODO: set logged in user and update token
                form.resetFields();
                navigate('/dashboard/home');
            } else {
                const data = await res.json();
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
                            color: 'red',
                            paddingBottom: '3px',
                            marginBottom: '2px',
                            display: 'block'
                        }}>{error}</span>
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