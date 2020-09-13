import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import PostGrid from '../components/postGrid';
import HomeBanner from '../components/HomeBanner';

const HomePage = ({}) => {

  return (
    <>
      <Header />
      <HomeBanner />
      <PostGrid />
      <Footer />
    </>
  );
};

export default HomePage;
