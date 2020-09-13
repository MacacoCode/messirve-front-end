import React from 'react';
import { Card } from 'antd';
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

const Post = ({ title, image, description, type }) => {
  return (
    <Card
      title={title}
      extra={<a href="#">More</a>}
      style={{ width:'100%', height:'100%' }}
      bodyStyle={{ textAlign: 'center' }}
    >
      <img style={type === 'tendencia' ? imageSizingTendency : imageSizing} src={image} />
      {type === 'tendencia' ? (null) : (
        <p style={{ textAlign: 'left' }}>Descripcion Breve</p>
      )}
    </Card>
  );
};

export default Post;