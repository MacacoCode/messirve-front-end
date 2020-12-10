import React, { useEffect, useState } from 'react';
import { InputNumber, Row, Button } from 'antd';

const PriceRange = ({ checkable, precioRango, setPrecioRango, filterByRango }) => {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState();

  return (
    <Row>
            <InputNumber
                style={{ width: '5em' }}
                formatter={value => `C$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/[C]\$\s?|(,*)/g, '')}
                size="small"
                max={9999}
                min={0}
                onChange={(value) => {
                  setFirst(value);
                  // setPrecioRango([ value, precioRango[1] ])
                }}
            />
            <p
              style={{ fontWeight: 'bold', alignSelf: 'center', marginRight: 4, marginLeft: 4 }}
            >
                _
            </p>
            <InputNumber
                style={{ width: '5em' }}
                formatter={value => `C$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/[C]\$\s?|(,*)/g, '')}
                size="small"
                max={9999}
                min={first}
                onChange={(value) => {
                  setSecond(value);
                  // setPrecioRango([ precioRango[0], value ])
                }}
            />
            {checkable && <Button onClick={() => filterByRango(first, second)} style={{ alignSelf: 'center', marginRight: 4, marginLeft: 4 }}>Ok</Button>}
    </Row>
  )
};

export default PriceRange;
