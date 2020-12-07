import { Col, Row, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'unistore/react';
import TagMedidas from '../TagMedidas';
import { isEmpty } from 'lodash';
import { configConsumerProps } from 'antd/lib/config-provider';

const ResumenOrden = ({
  ordenDireccion, user, carrito, detalleCarrito,
  altDetalle,
}) => {
  const [resumen, setResumen] = useState(!altDetalle ? carrito : []);
  const [direc, setDirec] = useState(!altDetalle ? ordenDireccion : {})
  const detalle = !altDetalle ? detalleCarrito : altDetalle;
  // const [subTotal, setSubTotal] = useState(0);

 /* const calculateSubTotal = () => {
    let sum = 0;
    for (let i=0; i<carrito.length; i+=1) {
      sum +=carrito[i].empresa.precioBase*carrito[i].cantidad
      setSubTotal(sum);
    }
  }; */

  useEffect(() => {
    console.log("hell")
    // calculateSubTotal();
    if (!isEmpty(altDetalle)) {
      console.log("hello")
      fetch(`http://localhost:8000/api/productoorden?idOrden=${altDetalle.id}`)
        .then((res) => res.json())
        .then((data) => setResumen(data));
    }
  }, [altDetalle])
  return (
    <>
    <Card>
        <Row>
          <Col span={12}>
            <Card title="Producto/Precio" bodyStyle={{ display: 'none' }} />
          </Col>
          <Col span={12}>
            <Card
              title="Direccion de Envío"
              // extra={<Button onClick={() => history.push('/orden/direccion')}>Modificar Direccion</Button>}
              bodyStyle={{ display: 'none' }}
            />
          </Col>
        </Row>
        {resumen?.map((item) => (
          <Row>
            <Col span={12} >
            <Card id={`${item.nombre}-${item.id}`}>
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
              <Col span={12}>
                <Card>
                    <Row>
                        Nombre - {`${direc.first_name} ${direc.last_name}`}
                    </Row>
                    <Row>
                        Direccion - {direc.direccion?.direccion}
                    </Row>
                    <Row>
                        Ciudad - {direc.direccion?.ciudad}
                    </Row>
                    {direc.direccion?.region && (
                      <Row>
                        Region - {direc.direccion?.region}
                      </Row>
                    )}
                    <Row>
                        Postal - {direc.direccion?.postal}
                    </Row>
                    <Row>
                        Telefono - {direc.telefono}
                    </Row>
                </Card>
              </Col>
            </Row>
        ))}
        <Row>
            <Col span={24}>
            <Card>
              <Row style={{ textAlign:'center' }}>
                <Col>Sub-Total
                  <h2 style={{ borderTop: '1px solid grey' }}><b>CS${detalle.subtotal || detalle.subTotal || 0.00}</b></h2>
                </Col>
              +
                <Col>IVA
                  <h2 style={{ borderTop: '1px solid grey' }}><b>CS${detalle.impuesto || 0.00}</b></h2>
                </Col>
              =
                <Col>Total
                  <h2 style={{ borderTop: '1px solid grey' }}><b>CS${detalle.total || 0.00}</b></h2>
                </Col>
              </Row>
            </Card> 
            </Col>
          </Row>
    </Card>
    </>
  );
};

export default connect(['ordenDireccion', 'detalleCarrito', 'altDetalle'])(ResumenOrden);
