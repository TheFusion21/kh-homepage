import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {

  return (
    <div>
      <Header />
      <main className="pt-12">
        <Outlet />
      </main>
    </div>
  )
};

export default Layout;