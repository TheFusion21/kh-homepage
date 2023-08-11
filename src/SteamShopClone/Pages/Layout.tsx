import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/PageHeader';
import Footer from '../Components/PageFooter';

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="pt-12 md:pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;