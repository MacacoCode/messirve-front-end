import React, { useEffect, useState } from 'react';
import Post from '../post';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Pagination, Divider, Spin } from 'antd';

import post1 from '../../img/hoodie.jpg';
import post2 from '../../img/mancuerdas.jpg';
import post3 from '../../img/snack.jpg';
import post4 from '../../img/protein.png';
import post5 from '../../img/parallets.jpg';
import post6 from '../../img/zapatos.jpg';
import { isEmpty } from 'lodash';


const ResponsiveGridLayout = WidthProvider(Responsive);

const lgmdLayout = [
  { i: '1', x: 0, y: 0, h: 6, w: 3 },
  { i: '2', x: 3, y: 0, h: 6, w: 3 },
  { i: '3', x: 6, y: 0, h: 6, w: 3 },
  { i: '6', x: 0, y: 1, h: 6, w: 3 },
  { i: '4', x: 3, y: 1, h: 6, w: 3 },
  { i: '5', x: 6, y: 1, h: 6, w: 3 },
  { i: '11', x: 1, y: 3, h: 1, w: 10 },
];

const xsLayout = [
    { i: '1', x: 0, y: 0, h: 6, w: 3 },
    { i: '2', x: 3, y: 0, h: 6, w: 3 },
    { i: '3', x: 0, y: 0, h: 6, w: 3 },
    { i: '6', x: 3, y: 1, h: 6, w: 3 },
    { i: '4', x: 0, y: 1, h: 6, w: 3 },
    { i: '5', x: 3, y: 1, h: 6, w: 3 },
    { i: '11', x: 1, y: 2, h: 1, w: 6 },
];

const xxsLayout = [
  { i: '1', x: 0, y: 4, h: 6, w: 4 },
  { i: '2', x: 0, y: 5, h: 6, w: 4 },
  { i: '3', x: 0, y: 6, h: 6, w: 4 },
  { i: '11', x: 0, y:7, h: 1, w: 4 },
];

const postLayouts = {
  lg: lgmdLayout,
  sm: lgmdLayout,
  xs: xsLayout,
  xxs: xxsLayout,
};

const NuevoEnTienda = () => {
  const [currentCols, setCurrentCols] = useState();
  const [productos, setNuevoEnTienda] = useState([])
  const breakPointChange = (newBreakPoint, newCols) => {
    setCurrentCols(newCols);
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/productos')
      .then((res) => res.json())
      .then((data) => setNuevoEnTienda(data))
  }, [])

  if (isEmpty(productos)) return <Spin />
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
        <div key='1'> 
              <Post producto={productos[0]}
                  id={productos[0].id}
                  title={productos[0].nombre}
                  description={productos[0].descripcion}
                  marca={productos[0].marca?.nombre}
                  image={productos[0].imagenes_set[0]?.imagen}
                  medidas={productos[0].tallaproducto_set} 
              />
        </div>
        <div key='2'> 
              <Post producto={productos[1]}
                  id={productos[1].id}
                  title={productos[1].nombre}
                  description={productos[1].descripcion}
                  marca={productos[1].marca?.nombre}
                  image={productos[1].imagenes_set[0]?.imagen}
                  medidas={productos[1].tallaproducto_set} 
              />
         </div>
        <div key='3'> 
              <Post producto={productos[2]}
                  id={productos[2].id}
                  title={productos[2].nombre}
                  description={productos[2].descripcion}
                  marca={productos[2].marca?.nombre}
                  image={productos[2].imagenes_set[0]?.imagen}
                  medidas={productos[2].tallaproducto_set} 
              />
         </div>
        <div style={currentCols < 6 ? {display:'none'} : null} key='4'> 
              <Post producto={productos[3]}
                  id={productos[3].id}
                  title={productos[3].nombre}
                  description={productos[3].descripcion}
                  marca={productos[3].marca?.nombre}
                  image={productos[3].imagenes_set[0]?.imagen}
                  medidas={productos[3].tallaproducto_set} 
              />
        </div>
        <div style={currentCols < 6 ? {display:'none'} : null} key='5'>
            <Post producto={productos[4]}
                  id={productos[4].id}
                  title={productos[4].nombre}
                  description={productos[4].descripcion}
                  marca={productos[4].marca?.nombre}
                  image={productos[4].imagenes_set[0]?.imagen}
                  medidas={productos[4].tallaproducto_set} 
              />
        </div>
        <div style={currentCols < 6 ? {display:'none'} : null} key='6'>
              <Post producto={productos[5]}
                  id={productos[5].id}
                  title={productos[5].nombre}
                  description={productos[5].descripcion}
                  marca={productos[5].marca?.nombre}
                  image={productos[5].imagenes_set[0]?.imagen}
                  medidas={productos[5].tallaproducto_set} 
              />
        </div>

        </ResponsiveGridLayout>
    </>
  );
};

export default NuevoEnTienda;