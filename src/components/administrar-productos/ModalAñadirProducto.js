import { Button, message, Row, Form, InputNumber } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

const ModalAñadirProducto = ({ modal, openModal, empresa }) => {
    const añadirProd = (values) => {
        fetch(`http://localhost:8000/api/empresaproducto`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idEmpresa: empresa,
            idProducto: modal.value,
            cantidad: values.cantidad,
            precioBase: values.precioBase
          })
        }).then((res) => res.json())
          .then((data) => data.id && message.success('Producto añadido correctamente!'))
      };

  return (
    <>
      <Modal
        visible={modal.open}
        onCancel={() => openModal({ open: false })}
        footer={null}
      >
        <Row>¿Desea añadir el producto?</Row>
        <Form onFinish={añadirProd}>
            <Form.Item rules={[{ required: true, message: 'Se necesita un precio base' }]}  label="Precio Base C$" name="precioBase">
                <InputNumber min={1} prefix="C$" size="small" />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Se necesita una cantidad de existencia' }]}  label="Existencia" name="cantidad">
                <InputNumber min={1} size="small" />
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    style={{ float: 'right', backgroundColor: '#1a991c', borderColor: '#1a991c' }}
                    type="primary"
                    shape="round"
                >
                    Confirmar
                </Button>
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAñadirProducto;