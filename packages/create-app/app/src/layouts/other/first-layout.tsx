import React from 'react';
import { Outlet } from 'react-router-dom';
import './first-layout.css';

export default function OtherFirstLayout() {
  return (
    <>
      <div className="other-first-layout">
        <div className="header"> </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  )
}
