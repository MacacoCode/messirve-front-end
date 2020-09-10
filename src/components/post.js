import React from 'react';
import { Card } from 'antd';
import './styles.css'


const Post = ({ title, image, description }) => {
  return (
    <Card title={title} extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>{image}</p>
      <p>{description}</p>
    </Card>
  );
};

export default Post;