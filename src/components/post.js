import React from 'react';
import { Card } from 'antd';


const Post = () => {
  return (
    <Card title="Post" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Title</p>
      <p>Image</p>
      <p>Description</p>
    </Card>
  );
};

export default Post;