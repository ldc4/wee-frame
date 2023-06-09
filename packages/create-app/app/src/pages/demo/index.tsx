import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Demo() {

  const location = useLocation();

  return (
    <>
      <div>
        <div>
          <Link to="/main-layout/demo">示例1：简单布局页面</Link>
        </div>
        <div>
          <Link to="/main-layout/other/first-layout/demo">示例2：嵌套布局页面1</Link>
        </div>
        <div>
          <Link to="/other/first-layout/main-layout/demo">示例2：嵌套布局页面2</Link>
        </div>
        <div>
          <Link to="/main-layout/other/second-layout/demo">示例2：嵌套布局页面3</Link>
        </div>
        <div>
          <Link to="/other/second-layout/main-layout/demo">示例2：嵌套布局页面4</Link>
        </div>
        <div>
          <Link to="/demo/page1">示例3：多层级路由页面1</Link>
        </div>
        <div>
          <Link to="/demo/page2">示例3：多层级路由页面2</Link>
        </div>
        <div>
          <Link to="/demo/page2/page2a">示例3：多层级路由页面3</Link>
        </div>
        <div>
          <Link to="/demo/page2/page2b">示例3：多层级路由页面4</Link>
        </div>
      </div>
    </>
  )
}