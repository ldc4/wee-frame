import React from 'react';
import { Outlet } from 'react-router-dom';
import './second-layout.css';

export default function OtherSecondLayout() {
  return (
    <>
      <div className="other-second-layout">
        <div>
          <Outlet />
        </div>
        <div className="footer"></div>
      </div>
    </>
  )
}
