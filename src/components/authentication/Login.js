import React, { useState } from 'react';
import {
  Card, Form, Button, Input, message
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Modal from 'antd/lib/modal/Modal';
import { connect } from 'unistore/react';
import { actions } from '../../store';
import jwt from 'jwt-decode';

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
            const decodedUser = jwt(data.token)
            setUser({...decodedUser, token: data.token, user: data.user})
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
        <Card title="Iniciar Sesion" style={{ width: '100%' }}>
          <Form
            onFinish={submit}
          >
            <Form.Item
                label="E-Mail"
                name="email"
                rules={[{ required: true, message: 'Por favor ingrese su E-Mail!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="E-Mail" />
            </Form.Item>

            <Form.Item
                label="Contraseña"
                name="password"
                rules={[{ required: true, message: 'Por favor ingrese su Contraseña!' }]}
            >
                <Input.Password placeholder="********" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                Enviar
                </Button>
            </Form.Item>

            <Form.Item>
                <p>
                ¿Olvido su contraseña? Click
                <Link to="/reset-password"> aqui </Link>
                </p>
            </Form.Item>
            <Form.Item>
                <p>
                ¿No tiene una cuenta todavia? Registrese
                <Link to="/register"> aqui </Link>
                </p>
            </Form.Item>
          </Form>
        </Card>
    </Modal>
  );
};

export default connect('', actions)(Login);
