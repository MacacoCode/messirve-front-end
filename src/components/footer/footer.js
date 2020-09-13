import React from 'react';
import { Card, Col, Row } from 'antd';
import { FacebookFilled, InstagramFilled, TwitterSquareFilled } from '@ant-design/icons';


const wrapper = {
  backgroundColor: '#fcb131',
  paddingTop: '4em',

  paddingLeft: '8em',
  paddingRight: '8em',
};

const cardStyle = {
  backgroundColor: '#fcb131',
  color: 'white',
  paddingLeft: '2em',
  paddingRight: '2em',
  fontSize: '1.1em'
}

const Footer = () => (
  <div className="site-card-wrapper" style={wrapper}>
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Más información" style={cardStyle} bordered={false}>
          <p>Integrarse</p>
          <p>Blog</p>
          <p>Acerca de Nosotros</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Contacto y Legal" style={cardStyle} bordered={false}>
          <p>Contactar a Soporte</p>
          <p>Terminos y Condiciones</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Nuestras Redes!" style={cardStyle} bordered={false}>
          <FacebookFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} />
          <InstagramFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} />
          <TwitterSquareFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} />
        </Card>
      </Col>
    </Row>
  </div>
);

export default Footer;
