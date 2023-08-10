import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/PageHeader';
import Footer from '../Components/PageFooter';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;