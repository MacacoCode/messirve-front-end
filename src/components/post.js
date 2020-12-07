import React, { useEffect, useState } from 'react';
import {
  Card, Col, Row, Tag, Rate,
  Image, Button, Select
} from 'antd';
import { Link } from 'react-router-dom';
import AddToCartModal from './AddToCartModal';
import './styles.css'
import TagMedidas from './TagMedidas';
import CantidadSelector from './carrito/CantidadSelector';
import { connect } from 'unistore/react';

const imageSizing = {
  maxWidth: '-webkit-fill-available',
  maxHeight: '-webkit-fill-available',
  height: '14.5em',
  width: '100%'
}

const Post = ({
  noHeight, addDisabled,
  producto, id, title, image, description, marca, medidas,
  user,
}) => {
  const [addToCartVisible, setAddToCartVisible] = useState(false);

  const [selectedEmpresa, setSelectedEmpresa] = useState(producto?.empresaproducto_set ? producto.empresaproducto_set[0] : {});
  const [selectedCantidad, setSelectedCantidad] = useState(1);
  const [selectedMedida, setSelectedMedida] = useState(medidas ? medidas[0] : {})

  const [img, setImg] = useState({});

  const openModal = () => {
    if (addToCartVisible === false) setAddToCartVisible(true);
  };

  const handleSelectChange = (value) => {
    const empresaFound = producto.empresaproducto_set.find((emp) => emp.idEmpresa.id === value)
    setSelectedEmpresa(empresaFound)
  }

  useEffect(() => {
    const ima = document.createElement('IMG');
    setImg({
      height: ima.naturalHeight,
      width: ima.naturalWidth,
      isHeightBigger: ima.naturalHeight > ima.naturalWidth ? true : false,
    })
  }, [image]);

  return (
    <Card
      title={(
        <>
          <Link style={{ marginLeft: 10 }} to={`/producto/${id}`}>{title}</Link>
          <Row>
            {producto && (
              <Select onChange={handleSelectChange} style={{ marginLeft: 10 }} size="small" value={selectedEmpresa.idEmpresa.id}>
                {producto.empresaproducto_set?.map((emp) => (
                  <Select.Option value={emp.idEmpresa?.id}>
                    {emp.idEmpresa?.nombre}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Row>
        </>
      )}
      extra={(
        <>
          <Button
            disabled={(user.empresa && true) || addDisabled}
            type="primary"
            size="small"
            shape="round"
            onClick={openModal}
          >
            Al Carrito
            <AddToCartModal
              producto={producto}
              selectedEmpresa={selectedEmpresa}
              selectedCantidad={selectedCantidad}
              selectedMedida={selectedMedida}
              visible={addToCartVisible}
              setVisible={setAddToCartVisible}
            />
          </Button>
        </>
      )}
      style={noHeight ? { width:'100%' } : { width:'100%', height: '100%' }}
      bodyStyle={{ textAlign: 'center' }}
    >
      <Row>
        <Col span={14}>
          <Image 
            className={`image_${id}_${title}`}
            // style={imageSizing}
            height={img.isHeightBigger ? '50%' : `${img.width/img.height*50}%` }
            width={img.isHeightBigger ? `${img.height/img.width*50}%` : '50%'}
            src={image || "error"}
            fallback="data:image/png;base64,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"
          />
          <Row justify="center">
            <Tag color="green">Fitness</Tag>
            <Tag color="black">Messirve</Tag>
          </Row>
        </Col>
        <Col span={10}>
          <Row style={{ marginBottom: 10 }}>
            <Col>Precio: {selectedEmpresa.precioBase ? `CS$${selectedEmpresa.precioBase}` : "No Disponible"}</Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col>Marca: {marca || "Sin Marca"}</Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col>
              Medidas: { medidas ? (
              <TagMedidas setSelectedMedida={setSelectedMedida} selectedEmpresa={selectedEmpresa} medidas={medidas} />
              ) : "No Disponible"}
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col>
              <CantidadSelector setCantidadProductoCarrito={setSelectedCantidad} />
              {selectedMedida?.cantidad && `/${selectedMedida.cantidad}`}
            </Col>
          </Row>
        </Col>
      </Row>
      <Rate allowHalf defaultValue={4.5} />
      <p style={{ textAlign: 'left' }}>{description || "No Disponible"}</p>
      </Card>
  );
};

export default connect('user')(Post);