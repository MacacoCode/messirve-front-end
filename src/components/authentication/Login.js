import React, { useState } from 'react';
import {
  Card, Form, Button, Input, message
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Modal from 'antd/lib/modal/Modal';
import { connect } from 'unistore/react';
import { actions } from '../../store';

const Login = ({ visible, setVisible, setUser }) => {

  const submit = (values) => {
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    }).then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setVisible(false)
          setTimeout(() => {
            message.success("Ha ingresado a su cuenta correctamente!")
            setUser(data)
            localStorage.setItem('messirve-shop-user', JSON.stringify(data))
          }, 1000)
        }
        if (data.detail) message.error(data.detail)
      })
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
            <Form.Item
                label="E-Mail"
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="E-Mail" />
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
        </Card>
    </Modal>
  );
};

export default connect('', actions)(Login);
