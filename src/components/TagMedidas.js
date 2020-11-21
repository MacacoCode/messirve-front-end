import React, { useEffect, useState } from 'react';
import { Col, Tag } from 'antd';

const { CheckableTag } = Tag;

const TagMedidas = ({ medidas, selectedEmpresa, setSelectedMedida }) => {
  const [medida, setMedida] = useState(medidas && medidas ? [medidas[0].idtalla.id]: []);
  const handleChange = (me, checked) => {
    if (checked) {
        setMedida([me.idtalla.id])
        setSelectedMedida(me)
    } /*else {
        setSelectedMedida([])
    }*/

  };

  /*useEffect(() => {
    console.log(selectedEmpresa, medidas)
  }, [selectedEmpresa])*/
  return (
    <>
        {medidas?.map((me) => (
        <CheckableTag
            key={me.idtalla.id}
            checked={medida.indexOf(me.idtalla.id) > -1}
            onChange={checked => handleChange(me, checked)}
        >
            {me.idtalla.tamanio}
        </CheckableTag>
        ))}
    </>
  );
};

export default TagMedidas;
