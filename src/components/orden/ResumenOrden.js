import { Col, Row, Card, message } from 'antd';
import React from 'react';
import TagMedidas from '../TagMedidas';

const ResumenOrden = ({ direccion, carrito }) => {
  return (
    <>
    <Card>
        <Row>
          <Col span={12}>
            <Card title="Producto/Precio" bodyStyle={{ display: 'none' }} />
          </Col>
          <Col span={12}>
            <Card title="Direccion de Envío" bodyStyle={{ display: 'none' }} />
          </Col>
        </Row>
        {carrito?.map((item) => (
          <Row>
            <Col span={12} >
            <Card>
              <Col>
                <Row>
                    <h3 style={{ marginRight: 5 }}>{item.nombre}</h3>
                    -
                    <p style={{ marginTop: 3, marginLeft: 5 }}>{item.descripcion}</p>
                </Row>
                <Row>
                    <TagMedidas medidas={[item.medida]} />
                </Row>
                <Row style={{ marginTop: 5 }}>
                    <h4><b>{item.empresa?.precioBase && `C$${item.empresa.precioBase*item.cantidad}`}</b></h4>
                </Row>
                <Row>
                    Individual - {item.empresa?.precioBase && `C$${item.empresa.precioBase}`}
                </Row>
                <Row>
                    Cantidad - {item.cantidad}
                </Row>
                <Row>
                    Vendido por - {item.empresa.idEmpresa.nombre}
                </Row>
              </Col>
              </Card>
              </Col>
            </Row>
        ))}
    </Card>
    </>
  );
};

export default ResumenOrden;
