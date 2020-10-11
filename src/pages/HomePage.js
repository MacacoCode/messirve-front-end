import React from 'react';
import Footer from '../components/footer/footer';
import PostGrid from '../components/postGrid';
import HomeBanner from '../components/HomeBanner';

const HomePage = ({}) => {

  return (
    <>
      <HomeBanner />
      <PostGrid />
      <Footer />
    </>
  );
};

export default HomePage;
