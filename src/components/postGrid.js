import React from 'react';
import Post from './post';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

const postLayout = [
    { i: '1', x: 1, y: 0, h: 5, w: 1, minH: 4},
    { i: '2', x: 2, y: 0, h: 5, w: 1, minH: 4},
    { i: '3', x: 1, y: 1, h: 5, w: 1, minH: 4},
    { i: '4', x: 2, y: 1, h: 5, w: 1, minH: 4},
    { i: '5', x: 1, y: 2, h: 5, w: 1, minH: 4},
    { i: '6', x: 2, y: 3, h: 5, w: 1, minH: 4},
];

const PostGrid = () => {
  return (
    <ReactGridLayout
      cols={3}
      layout={postLayout}
      rowHeight={50}
      isResizable={false}
      isDraggable={false}
    >
      <div key='1' style={{ width:'100%', height:'100%' }}> <Post title="UwU" image="image" /> </div>
      <div key='2' style={{ width:'100%', height:'100%' }}> <Post title="UwU" image="image" /> </div>
      <div key='3' style={{ width:'100%', height:'100%' }}> <Post title="UwU" image="image" /> </div>
      <div key='4' style={{ width:'100%', height:'100%' }}> <Post title="UwU" image="image" /> </div>
      <div key='5' style={{ width:'100%', height:'100%' }}> <Post title="UwU" image="image" /> </div>
      <div key='6' style={{ width:'100%', height:'100%' }}> <Post title="UwU" image="image" /> </div>
    </ReactGridLayout>
  );
};

export default PostGrid;