import React from 'react';
import NuevoEnTienda from '../components/home/NuevoEnTienda';
import Tendencias from '../components/home/Tendencias';
import HomeBanner from '../components/home/HomeBanner';

const HomePage = ({}) => {

  return (
    <>
      <HomeBanner />
      <Tendencias />
      <NuevoEnTienda />
    </>
  );
};

export default HomePage;
