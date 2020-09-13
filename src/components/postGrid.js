import React from 'react';
import Post from './post';
import RGL, { WidthProvider } from 'react-grid-layout';
import { Pagination } from 'antd';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import post1 from '../img/hoodie.jpg';
import post2 from '../img/mancuerdas.jpg';
import post3 from '../img/snack.jpg';
import post4 from '../img/protein.png';
import post5 from '../img/parallets.jpg';
import post6 from '../img/zapatos.jpg';
import post8 from '../img/messi.jpg';
import post9 from '../img/volleyball.jpg';


const ReactGridLayout = WidthProvider(RGL);

const postLayout = [
    { i: '7', x: 0, y: 0, h: 2, w: 4, minH: 4},
    { i: '8', x: 0, y: 1, h: 9, w: 4, minH: 4},
    { i: '9', x: 0, y: 2, h: 9, w: 4, minH: 4},
    { i: '10', x: 0, y: 3, h: 1, w: 4, minH: 4},
    { i: '0', x: 4, y: 0, h: 2, w: 6, minH: 4},
    { i: '1', x: 4, y: 1, h: 6, w: 3, minH: 4},
    { i: '2', x: 7, y: 1, h: 6, w: 3, minH: 4},
    { i: '3', x: 4, y: 2, h: 6, w: 3, minH: 4},
    { i: '4', x: 7, y: 2, h: 6, w: 3, minH: 4},
    { i: '5', x: 4, y: 3, h: 6, w: 3, minH: 4},
    { i: '6', x: 7, y: 3, h: 6, w: 3, minH: 4},
    { i: '11', x: 4, y: 4, h: 1, w: 6, minH: 4},
];

const PostGrid = () => {
  return (
    <ReactGridLayout
      cols={10}
      layout={postLayout}
      rowHeight={50}
      isResizable={false}
      isDraggable={false}
      style={{ margin: 15 }}
    >
      <div key='7'> <h2 style={{ textAlign: 'center', borderLeft: 'outset' }}>Tendencias</h2> </div>
      <div key='8'> <Post type="tendencia" title="Futbol" image={post8} /> </div>
      <div key='9'> <Post type="tendencia" title="Volleyball" image={post9} /> </div>
      <div key='10'> <Pagination current={1} size="small" style={{ textAlign: '-webkit-center' }} total={50} /> </div>
      <div key='0'> <h2 style={{ textAlign: 'center', borderLeft: 'outset' }}>Nuevo En La Tienda</h2> </div>
      <div key='1'> <Post title="Hoodie" image={post1} /> </div>
      <div key='2'> <Post title="Mancuerdas" image={post2} /> </div>
      <div key='3'> <Post title="Snack" image={post3} /> </div>
      <div key='4'> <Post title="Proteina" image={post4} /> </div>
      <div key='5'> <Post title="Parallets" image={post5} /> </div>
      <div key='6'> <Post title="Zapatos" image={post6} /> </div>
      <div key='11'> <Pagination current={1} size="small" style={{ textAlign: '-webkit-center' }} total={250} /> </div>
    </ReactGridLayout>
  );
};

export default PostGrid;