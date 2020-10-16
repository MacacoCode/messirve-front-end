import React from 'react';
import { Card, Col, Row, Tag } from 'antd';
import './styles.css'

const imageSizing = {
  maxWidth: '-webkit-fill-available',
  maxHeight: '-webkit-fill-available',
  height: '14.5em',
  width: '100%'
}

const imageSizingTendency = {
  maxWidth: '-webkit-fill-available',
  maxHeight: '-webkit-fill-available',
  height: '30em',
  width: '100%'
}

const Post = ({ fullPost, title, image, description, type, marca }) => {
  return (
    <Card
      title={title}
      extra={!fullPost ? <a href="#">More</a> : null}
      style={{ width:'100%', height:'100%' }}
      bodyStyle={{ textAlign: 'center' }}
    >
      <img style={type === 'tendencia' ? imageSizingTendency : imageSizing} src={image} />
      {type === 'tendencia' ? (null) : (
        <div>
          <Row justify="center">
            <Tag color="green">Fitness</Tag>
            <Tag color="black">Messirve</Tag>
          </Row>
          <Row>
            <Col span={8}>Precio: $5.00</Col>
            <Col span={8} offset={8}>Marca: {!marca ? "Sportline" : marca }</Col>
          </Row>
          <br />
          {!description ? (
            <p style={{ textAlign: 'left' }}>Lorem ipsum dolor sit amet, consectetur...</p>
          ) : (
            <p style={{ textAlign: 'left' }}>{description}</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default Post;