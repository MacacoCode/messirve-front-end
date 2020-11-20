import React, { useEffect, useState } from 'react';
import { Input, Cascader, Row, Col } from 'antd';
import '../styles.css';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { connect } from 'unistore/react';

const { Search } = Input;
 
const SearchBar = ({ categorias, subCategorias, filterActual }) => {
  let options = [{ value: "Todo", label: "Todo" }];
  const history = useHistory();
  const [ filter, setFilter ] = useState(["Todo"]);

  if (categorias) {
    options = options.concat(categorias.map((categoria) => ({
      value: categoria.nombre,
      label: categoria.nombre,
      children:
        subCategorias && subCategorias.filter((subCategoria) => subCategoria.idCategoria === categoria.id)
        .map((subCategoria) => ({
        value: subCategoria.nombre,
        label: subCategoria.nombre
        }))
    })));
  }
  const search = (value) => {
    if (filter[0] === "Todo" && !isEmpty(value)) history.push(`/search/producto=${value}`)
    else if (filter.length === 2 && !isEmpty(value)) history.push(`/search/producto=${value}/categoria=${filter[0]}/subcategoria=${filter[1]}`)
    else if (filter.length === 1 && !isEmpty(value)) history.push(`/search/producto=${value}/categoria=${filter[0]}`)
  };

  useEffect(() => {
    if (!isEmpty(filterActual)) setFilter(filterActual);
  }, [filterActual]);

  return (
    <Row>
      <Col offset={5}>
        <Cascader
          options={options}
          expandTrigger="hover"
          defaultValue={filter}
          style={{ width: '6em' }}
          allowClear={false}
          value={filter}
          onChange={(value) => setFilter(value)}
        />
      </Col>
      <Col span={12}>
        <Search
          style={{ textAlign:'center' }}
          placeholder="Busca Lo Que Quieras!"
          enterButton
          onSearch={search}
        />
      </Col>
    </Row>
  );
};

export default connect('filterActual')(SearchBar);
