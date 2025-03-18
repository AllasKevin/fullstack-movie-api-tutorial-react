import { Outlet } from 'react-router-dom';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

const Layout = () => {
  return (
    <main>
        <Outlet />
    </main>
  )
}

export default Layout