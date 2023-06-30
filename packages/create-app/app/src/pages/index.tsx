import React from 'react';
import { useEffect } from 'react';
import { Link, useHref } from 'react-router-dom';
import { animated, wait } from '../utils/animation';

import './index.css';

function init() {
  // 设置背景
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const formatStr = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
  const appDom: Record<string, any> = document.getElementById('app') || {};
  if (appDom && appDom.style) {
    appDom.style.background = `url('https://bing-1251945389.cos.ap-guangzhou.myqcloud.com/bing_${formatStr}') center center no-repeat rgba(255,255,255, 0.75)`;
    appDom.style['background-size'] = 'cover';
    appDom.style['background-attachment'] = 'fixed';
  }
}

async function animate() {
  const doms = document.getElementsByClassName('animate-init');
  const run = async () => {
    for (let dom of doms) {
      await wait(200);
      animated(dom, { opacity: 1, top: 0 }, 200);
    }
  }
  await run();
  locationAnimate();
}

function locationAnimate() {
  const doms = document.getElementsByClassName('location-icon');
  animated(doms[0], { opacity: 1, top: 0 }, 200);
}

export default function App() {
  useEffect(() => {
    init();
    animate();
  }, []);
  return (
    <div className="app" id="app">
      <div className="main">
        <div className="content">
          <div className="header">
            <div className="title animate-init">
              <div className="name">wee-frame</div>
            </div>
            <div className="quote show">
              <p className="quote-text animate-init">just a react frame for funny</p>
            </div>
          </div>
          <div className="menu">
            <Link to="/demo" className="animate-init">示例1：路由与布局示例</Link>
            <Link to="/tic-tac-toe" className="animate-init">示例2：TicTacToe</Link>
            <Link to="/other/docs" className="animate-init">示例3：Markdown生成页面</Link>
          </div>
          <div className="location">
            <i className="location-icon"></i>
            <span className="location-text animate-init">ShenZhen - China</span>
          </div>
        </div>
      </div>
    </div>
  )
}