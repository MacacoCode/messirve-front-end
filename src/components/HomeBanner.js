import React, { useState, useEffect } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { Pagination } from 'antd';
import homeBanner from '../img/home-banner.jpg';
import homeBanner2 from '../img/home-banner2.png';
import homeBanner3 from '../img/home-banner3.jpg';

const ReactGridLayout = WidthProvider(RGL);

const HomeBanner = ({}) => {
  const [currentPagination, changePagination] = useState(1);
  const [currentBanner, changeBannerTo] = useState();

  const onChange = (page) => {
    changePagination(page)
  };
  useEffect(() => {
      switch(currentPagination) {
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
  }, [currentPagination]);

  return (
    <div>
    <ReactGridLayout
      cols={12}
      rowHeight={50}
      isResizable={false}
      isDraggable={false}
    >
        <div 
          key="home-banner"
          data-grid={{
            x: 0,
            y: 0,
            w: 12,
            h: 7
          }}
        >
          <img
            src={currentBanner}
            alt="home banner"
            width="100%"
            height="100%"
          />
        </div>
    </ReactGridLayout>
    <Pagination current={currentPagination} size="small" style={{ textAlign: '-webkit-center' }} onChange={onChange} total={30} />
    </div>
  );
};

export default HomeBanner;
