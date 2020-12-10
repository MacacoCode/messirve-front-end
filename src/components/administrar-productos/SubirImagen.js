import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

const updateButton = (image, loading, imageB64) => (
    <div>
      {image && !imageB64 && (
        <img src={image} alt="image-producto" style={{ maxWidth: '50%' }} />
      )}
      {imageB64 &&  (
        <img src={imageB64} alt="image-producto" style={{ maxWidth: '50%' }} />
      )}
      {!imageB64 && (
        <PlusOutlined />
      )}
      <div style={{ marginTop: 8 }}>Imagen</div>
    </div>
);


const SubirImagen = ({setImagen, image}) => {
  const [loading, setLoading] = useState(false);
  const [imageB64, setImageB64] = useState();

  const handleChange = (info) => {
    /* if (info.file.status === 'uploading') {
        setLoading(true);
          return;
    } */
    if (info.file) {
      // Get this url from response in real world.
      getBase64(info.file, (img) => {
        setImageB64(img);
        setLoading(false);
      });
    }
  };

  const beforeUpload = (f) => {
    const isJpgOrPng = f.type === 'image/jpeg' || f.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Solo puedes subir imagenes con formato JPG/PNG!');
    }
    setImagen(f);
    return false;
  };

  return (
    <>
      <Upload
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        action={undefined}
        name="image-producto"
      >
        {updateButton(image, loading, imageB64)}
      </Upload>
    </>
  );
};

export default SubirImagen;
