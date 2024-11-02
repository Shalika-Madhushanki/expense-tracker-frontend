import { useState } from "react";
import { Button, Form, Input } from "antd-mobile";
import { Link, useNavigate } from "react-router-dom";

import { callSignInWithEmailAndPassword } from "../services/authenticationService";
import { FormInstance } from "antd-mobile/es/components/form";

interface FormValues {
  username: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const [form] = Form.useForm<FormInstance>();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleOnFinish = async (values: FormValues): Promise<void> => {
    try {
      const data = await callSignInWithEmailAndPassword(
        values.username,
        values.password,
      );
      localStorage.setItem("token", data?.token);
      form.resetFields();
      navigate("/dashboard/home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };
  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Login</h1>
      </div>

      <Form
        form={form}
        initialValues={{
          username: "",
          password: "",
        }}
        footer={
          <>
            <span
              style={{
                color: "red",
                paddingBottom: "3px",
                marginBottom: "2px",
                display: "block",
              }}
            >
              {error}
            </span>
            <Button type="submit" block color="primary" size="large">
              Submit
            </Button>
          </>
        }
        mode="default"
        onFinish={handleOnFinish}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
        }}
      >
        <Form.Item
          name="username"
          label="Username"
          help=" Email address "
          rules={[{ required: true, message: "Please enter the username" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter the password" }]}
        >
          <Input type="password" />
        </Form.Item>
      </Form>
      <div className="signup-link">
        <Link to={"/signup"}>Don't have an account?</Link>
      </div>
    </div>
  );
};

export default LoginScreen;
