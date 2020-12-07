import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import homeBanner from '../../img/home-banner.jpg';
import homeBanner2 from '../../img/home-banner2.png';
import homeBanner3 from '../../img/home-banner3.jpg';

const bannerStyles = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  height: '25em',
  width: '80%',
  marginTop: 10,
  marginBottom: 5,
}

const HomeBanner = ({}) => {
  const [currentPagination, changePagination] = useState(1);
  const [currentBanner, changeBannerTo] = useState(homeBanner);

  /* setInterval(() => {
    switch(currentPagination) {
      case 1:
        changePagination(2)
        changeBannerTo(homeBanner2)
        break;
      case 2:
        changePagination(3)
        changeBannerTo(homeBanner3)
        break;
      case 3:
        changePagination(1)
        changeBannerTo(homeBanner)
        break;
    }
  }, 5000) */

  const onChange = (page) => {
    changePagination(page)
    switch(page) {
      case 1:
          changeBannerTo(homeBanner);
          break;
      case 2:
          changeBannerTo(homeBanner2);
          break;
      case 3:
          changeBannerTo(homeBanner3);
          break;
    }
  };

  return (
    <>
      <div style={bannerStyles}>
        <img
          src={currentBanner}
          alt="home banner"
          width="100%"
          height="100%"
        />
      </div>
      <Pagination current={currentPagination} size="small" style={{ textAlign: '-webkit-center' }} onChange={onChange} total={30} />
    </>
  );
};

export default HomeBanner;
