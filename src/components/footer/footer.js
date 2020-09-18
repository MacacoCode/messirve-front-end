import React from 'react';
import { Card, Col, Row } from 'antd';
import { FacebookFilled, InstagramFilled, TwitterSquareFilled } from '@ant-design/icons';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

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

const layouts = {
  sm: [
  { i: '1', x: 0, y: 0, h: 1, w: 1 },
  { i: '2', x: 1, y: 0, h: 1, w: 1 },
  { i: '3', x: 2, y: 0, h: 1, w: 1 },
  ],
  xs: [
  { i: '1', x: 0, y: 0, h: 1, w: 1 },
  { i: '2', x: 0, y: 1, h: 1, w: 1 },
  { i: '3', x: 0, y: 2, h: 1, w: 1 },
  ],
};

const Footer = () => (
  <div style={wrapper}>
    <ResponsiveGridLayout
      breakpoints={{ sm: 768, xs: 480 }}
      cols={{sm: 3, xs: 1}}
      layouts={layouts}
      isResizable={false}
      isDraggable={false}
      rowHeight={280}
    >
      <div key="1">
        <Card title="Más información" style={cardStyle} bordered={false}>
          <p>Integrarse</p>
          <p>Blog</p>
          <p>Acerca de Nosotros</p>
        </Card>
      </div>
      <div key="2">
        <Card title="Contacto y Legal" style={cardStyle} bordered={false}>
          <p>Contactar a Soporte</p>
          <p>Terminos y Condiciones</p>
        </Card>
      </div>
      <div key="3">
        <Card title="Nuestras Redes!" style={cardStyle} bordered={false}>
          <FacebookFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} />
          <InstagramFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} />
          <TwitterSquareFilled style={{ fontSize: '2.8em', paddingRight:'0.4em' }} />
        </Card>
      </div>
    </ResponsiveGridLayout>
  </div>
);

export default Footer;
