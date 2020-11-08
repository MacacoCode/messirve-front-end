import React, { useState } from 'react';
import {
  Card, Form, Alert, Button, Input
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Modal from 'antd/lib/modal/Modal';

const Login = ({ visible, setVisible }) => {
  // the errorMessage when the user tries to login and something happens
  const [errorMessage, setError] = useState();

  const submit = (values) => {
    console.log(values)
  }

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      style={{ textAlign: '-webkit-center' }}
      footer={null}
    >
        <Card title="Log In" style={{ width: '100%' }}>
          <Form
            onFinish={submit}
          >
            {/* <Form.Item
                label="E-Mail"
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="E-Mail" />
            </Form.Item> */}
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password placeholder="********" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>

            <Form.Item>
                <p>
                Forgot your password? Click
                <Link to="/reset-password"> here </Link>
                </p>
            </Form.Item>
            <Form.Item>
                <p>
                Don't have an account yet? Register
                <Link to="/register"> here </Link>
                </p>
            </Form.Item>
          </Form>
          {/** If the error message exists then it will render this alert */}
          {errorMessage ? <Alert closable onClose={() => setError()} type="error" message={errorMessage} /> : null}
        </Card>
    </Modal>
  );
};

export default Login;
