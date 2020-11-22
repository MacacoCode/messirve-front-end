import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Divider, Pagination } from 'antd';

import post8 from '../../img/messi.jpg';
import post9 from '../../img/calistenia.jpg';
import PostTendencia from './PostTendencia';


const ResponsiveGridLayout = WidthProvider(Responsive);

const lgmdLayout = [
  { i: '8', x: 1, y: 0, h: 9, w: 4 },
  { i: '9', x: 5, y: 0, h: 9, w: 4 },
  { i: '10', x: 0, y: 1, h: 1, w: 10 },
];

const smLayout = [
  { i: '8', x: 0, y: 0, h: 9, w: 3 },
  { i: '9', x: 4, y: 0, h: 9, w: 3 },
  { i: '10', x: 0, y: 1, h: 1, w: 6 },
];

const xsxxsLayout = [
  { i: '8', x: 0, y: 0, h: 9, w: 4 },
  { i: '10', x: 0, y: 1, h: 1, w: 4 },
];

const postLayouts = {
  lg: lgmdLayout,
  sm: smLayout,
  xs: xsxxsLayout,
  xxs: xsxxsLayout,
};

const Tendencias = () => {
  const [ currentCols, setCurrentCols ] = useState();
  const breakPointChange = (newBreakPoint, newCols) => {
    setCurrentCols(newCols);
  };
  return (
    <>
        <Divider />
        <h2 style={{ textAlign: 'center' }}>Categorias</h2>
        <Divider />
        <ResponsiveGridLayout
        breakpoints={{lg: 1200, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 10, sm: 6, xs: 4, xxs: 4}}
        layouts={postLayouts}
        rowHeight={60}
        isResizable={false}
        isDraggable={false}
        style={{ margin: 15 }}
        onBreakpointChange={breakPointChange}
        >
        <div key='8'> <PostTendencia description="Madre mia el BIcho" title="Futbol" image={post8} /> </div>

        <div style={currentCols < 6 ? {display:'none'} : null} key='9'> <PostTendencia description="El arte de mover tu cuerpo" title="Calistenia" image={post9} /> </div>

        <div key='10'> <Pagination current={1} size="small" style={{ textAlign: '-webkit-center' }} pageSize={2} total={6}/> </div>
        </ResponsiveGridLayout>
    </>
  );
};

export default Tendencias;
