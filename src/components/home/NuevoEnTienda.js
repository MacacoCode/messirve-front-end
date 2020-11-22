import React, { useState } from 'react';
import Post from '../post';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Pagination, Divider } from 'antd';

import post1 from '../../img/hoodie.jpg';
import post2 from '../../img/mancuerdas.jpg';
import post3 from '../../img/snack.jpg';
import post4 from '../../img/protein.png';
import post5 from '../../img/parallets.jpg';
import post6 from '../../img/zapatos.jpg';


const ResponsiveGridLayout = WidthProvider(Responsive);

const lgmdLayout = [
  { i: '1', x: 0, y: 0, h: 7, w: 3 },
  { i: '2', x: 3, y: 0, h: 7, w: 3 },
  { i: '3', x: 6, y: 0, h: 7, w: 3 },
  { i: '6', x: 0, y: 1, h: 7, w: 3 },
  { i: '4', x: 3, y: 1, h: 7, w: 3 },
  { i: '5', x: 6, y: 1, h: 7, w: 3 },
  { i: '11', x: 1, y: 3, h: 1, w: 10 },
];

const xsLayout = [
    { i: '1', x: 0, y: 0, h: 7, w: 3 },
    { i: '2', x: 3, y: 0, h: 7, w: 3 },
    { i: '3', x: 0, y: 0, h: 7, w: 3 },
    { i: '6', x: 3, y: 1, h: 7, w: 3 },
    { i: '4', x: 0, y: 1, h: 7, w: 3 },
    { i: '5', x: 3, y: 1, h: 7, w: 3 },
    { i: '11', x: 1, y: 2, h: 1, w: 6 },
];

const xxsLayout = [
  { i: '1', x: 0, y: 4, h: 7, w: 4 },
  { i: '2', x: 0, y: 5, h: 7, w: 4 },
  { i: '3', x: 0, y: 6, h: 7, w: 4 },
  { i: '11', x: 0, y:7, h: 1, w: 4 },
];

const postLayouts = {
  lg: lgmdLayout,
  sm: lgmdLayout,
  xs: xsLayout,
  xxs: xxsLayout,
};

const NuevoEnTienda = () => {
  const [ currentCols, setCurrentCols ] = useState();
  const breakPointChange = (newBreakPoint, newCols) => {
    setCurrentCols(newCols);
  };
  return (
    <>
        <Divider />
        <h2 style={{ textAlign: 'center' }}>Nuevo En La Tienda</h2>
        <Divider />
        <ResponsiveGridLayout
        breakpoints={{lg: 1200, sm: 950, xs: 600, xxs: 0}}
        cols={{lg: 9, sm: 9, xs: 6, xxs: 4}}
        layouts={postLayouts}
        rowHeight={60}
        isResizable={false}
        isDraggable={false}
        style={{ margin: 15 }}
        onBreakpointChange={breakPointChange}
        >
        <div key='1'> <Post title="Hoodie" image={post1} /> </div>
        <div key='2'> <Post title="Mancuerdas" image={post2} /> </div>
        <div key='3'> <Post title="Snack" image={post3} /> </div>
        <div style={currentCols < 6 ? {display:'none'} : null} key='4'> <Post title="Proteina" image={post4} /> </div>
        <div style={currentCols < 6 ? {display:'none'} : null} key='5'> <Post title="Parallets" image={post5} /> </div>
        <div style={currentCols < 6 ? {display:'none'} : null} key='6'> <Post title="Zapatos" image={post6} /> </div>
        
        <div key='11'> <Pagination current={1} size="small" style={{ textAlign: '-webkit-center' }} pageSize={6} total={18} /> </div>
        </ResponsiveGridLayout>
    </>
  );
};

export default NuevoEnTienda;