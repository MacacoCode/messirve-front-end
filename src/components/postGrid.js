import React, { useState } from 'react';
import Post from './post';
import { Responsive, WidthProvider } from 'react-grid-layout';
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


const ResponsiveGridLayout = WidthProvider(Responsive);

const lgmdLayout = [
  { i: '7', x: 0, y: 0, h: 2, w: 4 },
  { i: '8', x: 0, y: 1, h: 9, w: 4 },
  { i: '9', x: 0, y: 2, h: 9, w: 4 },
  { i: '10', x: 0, y: 3, h: 1, w: 4 },
  { i: '0', x: 4, y: 0, h: 2, w: 6 },
  { i: '1', x: 4, y: 1, h: 6, w: 3 },
  { i: '2', x: 7, y: 1, h: 6, w: 3 },
  { i: '3', x: 4, y: 2, h: 6, w: 3 },
  { i: '6', x: 7, y: 3, h: 6, w: 3 },
  { i: '4', x: 7, y: 2, h: 6, w: 3 },
  { i: '5', x: 4, y: 3, h: 6, w: 3 },
  { i: '11', x: 4, y: 4, h: 1, w: 6 },
];

const smLayout = [
  { i: '7', x: 0, y: 0, h: 1, w: 3 },
  { i: '8', x: 0, y: 1, h: 9, w: 3 },
  { i: '9', x: 0, y: 2, h: 9, w: 3 },
  { i: '10', x: 0, y: 4, h: 1, w: 3 },
  { i: '0', x: 3, y: 0, h: 1, w: 3 },
  { i: '1', x: 3, y: 1, h: 6, w: 3 },
  { i: '2', x: 3, y: 2, h: 6, w: 3 },
  { i: '3', x: 3, y: 3, h: 6, w: 3 },
  { i: '11', x: 3, y: 4, h: 1, w: 3 },
];

const xsxxsLayout = [
  { i: '7', x: 0, y: 0, h: 1, w: 4 },
  { i: '8', x: 0, y: 1, h: 9, w: 4 },
  { i: '10', x: 0, y: 2, h: 1, w: 4 },
  { i: '0', x: 0, y: 4, h: 1, w: 4 },
  { i: '1', x: 0, y: 5, h: 6, w: 4 },
  { i: '2', x: 0, y: 6, h: 6, w: 4 },
  { i: '3', x: 0, y: 7, h: 6, w: 4 },
  { i: '11', x: 0, y: 8, h: 1, w: 4 },
];

const postLayouts = {
  lg: lgmdLayout,
  md: lgmdLayout,
  sm: smLayout,
  xs: xsxxsLayout,
  xxs: xsxxsLayout,
};

const PostGrid = () => {
  const [ currentCols, setCurrentCols ] = useState();
  const breakPointChange = (newBreakPoint, newCols) => {
    console.log(newCols)
    setCurrentCols(newCols);
  };
  return (
    <ResponsiveGridLayout
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 10, md: 10, sm: 6, xs: 4, xxs: 4}}
      layouts={postLayouts}
      rowHeight={60}
      isResizable={false}
      isDraggable={false}
      style={{ margin: 15 }}
      onBreakpointChange={breakPointChange}
    >
      <div key='7'> <h2 style={{ textAlign: 'center', borderLeft: 'outset' }}>Categorias</h2> </div>
      <div key='8'> <Post type="tendencia" title="Futbol" image={post8} /> </div>

      <div style={currentCols < 6 ? {display:'none'} : null} key='9'> <Post type="tendencia" title="Volleyball" image={post9} /> </div>

      <div key='10'> <Pagination current={1} size="small" style={{ textAlign: '-webkit-center' }} total={50} /> </div>
      <div key='0'> <h2 style={{ textAlign: 'center', borderLeft: 'outset' }}>Nuevo En La Tienda</h2> </div>
      <div key='1'> <Post title="Hoodie" image={post1} /> </div>
      <div key='2'> <Post title="Mancuerdas" image={post2} /> </div>
      <div key='3'> <Post title="Snack" image={post3} /> </div>
      <div style={currentCols <= 6 ? {display:'none'} : null} key='4'> <Post title="Proteina" image={post4} /> </div>
      <div style={currentCols <= 6 ? {display:'none'} : null} key='5'> <Post title="Parallets" image={post5} /> </div>
      <div style={currentCols <= 6 ? {display:'none'} : null} key='6'> <Post title="Zapatos" image={post6} /> </div>
      
      <div key='11'> <Pagination current={1} size="small" style={{ textAlign: '-webkit-center' }} total={250} /> </div>
    </ResponsiveGridLayout>
  );
};

export default PostGrid;