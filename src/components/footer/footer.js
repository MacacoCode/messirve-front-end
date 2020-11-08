import React from 'react';
import { Card, Row, Col } from 'antd';
import { FacebookFilled, InstagramFilled, TwitterSquareFilled } from '@ant-design/icons';
import useWindowSize from '../../hooks/useWindowSize';

const wrapper = {
  backgroundColor: '#fcb131',
  paddingTop: '4em',
};

const cardStyle = {
  backgroundColor: '#fcb131',
  color: 'white',
  paddingLeft: '2em',
  paddingRight: '2em',
  fontSize: '1.1em'
}

const Footer = () => {
  const windowSize = useWindowSize();
  console.log(windowSize.width)
  return (
    <div style={wrapper}>
      {windowSize.width > 700 ? (
        <Row>
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
              {windowSize.width > 900 ? (
                <>
                  <FacebookFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} />
                  <InstagramFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} />
                  <TwitterSquareFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} />
                </>
              ) : (
                <>
                  <Row style={{ marginBottom: 5 }}><FacebookFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} /></Row>
                  <Row style={{ marginBottom: 5 }}><InstagramFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} /></Row>
                  <Row style={{ marginBottom: 5 }}><TwitterSquareFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} /></Row>
                </>
              )}
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          <Card title="Más información" style={cardStyle} bordered={false}>
            <p>Integrarse</p>
            <p>Blog</p>
            <p>Acerca de Nosotros</p>
          </Card>
          <Card title="Contacto y Legal" style={cardStyle} bordered={false}>
            <p>Contactar a Soporte</p>
            <p>Terminos y Condiciones</p>
          </Card>
          <Card title="Nuestras Redes!" style={cardStyle} bordered={false}>
            <FacebookFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} />
            <InstagramFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} />
            <TwitterSquareFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} />
          </Card>
        </>
      )}
    </div>
  );
};

export default Footer;
