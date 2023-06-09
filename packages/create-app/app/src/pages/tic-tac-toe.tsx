import React, { useState } from 'react';
import './tic-tac-toe.css';
import _ from 'lodash';

export default function TicTacToe() {
  // 指定行列数
  const count = 3;

  // 构造默认矩阵值，0表示没有填充，1表示O，-1表示X
  const defaultRect: number[][] = getDefaultRect();
  
  // 创建rect状态
  const [round, setRound] = useState(1);
  const [rect, setRect] = useState(defaultRect);
  const [isFinish, setIsFinish] = useState(false);

  // 如何优雅的判断是否存在一条长度为count的连线
  function getHasLine(rect: number[][]) {
    let hasLine = false;
    // 遍历行
    for (let i = 0; i < count; i++) {
      let total = 0;
      for (let j = 0; j < count; j++) {
        total += rect[i][j];
      }
      if (Math.abs(total) === count) {
        hasLine = true;
        break;
      }
    }
    if (hasLine) return true;
    // 遍历列
    for (let j = 0; j < count; j++) {
      let total = 0;
      for (let i = 0; i < count; i++) {
        total += rect[i][j];
      }
      if (Math.abs(total) === count) {
        hasLine = true;
        break;
      }
    }
    if (hasLine) return true;
    // 遍历对角
    let total = 0;
    for (let i = 0; i < count; i++) {
      total += rect[i][i];
    }
    if (Math.abs(total) === count) {
      return true;
    }
    total = 0;
    for (let i = 0; i < count; i++) {
      total += rect[i][count - 1 - i];
    }
    if (Math.abs(total) === count) {
      return true;
    }
    return hasLine;
  }

  function handleClick(rInd: number, cInd: number) {
    if (isFinish) {
      return;
    }
    // 设置矩阵值
    rect[rInd][cInd] = round % 2 === 1 ? 1 : -1;
    setRect(rect);
    console.log(rect);
    // 检查是否存在连线
    const hasLine = getHasLine(rect);
    if (hasLine || round >= 9) {
      setIsFinish(true);
    } else {
      setRound(round + 1);
    }
  }

  // 返回默认矩阵
  function getDefaultRect() {
    const defaultRect: number[][] = [];
    for (let i = 0; i < count; i++) {
      const rowArr: number[] = [];
      for (let j = 0; j < count; j++) {
        rowArr.push(0);
      }
      defaultRect.push(rowArr);
    }
    return defaultRect;
  }

  // 重新开始
  function handleRestart() {
    const defaultRect: number[][] = getDefaultRect();
    setRect(defaultRect);
    setIsFinish(false);
    setRound(1);
  }

  const rectDom: Array<any> = [];
  rect.forEach((row, rInd: number) => {
    const rowDom: Array<any> = [];
    row.forEach((cell: any, cInd: number) => {
      if (cell === 1) {
        rowDom.push(
          <div key={`${rInd}-${cInd}`} className='cell'>O</div>
        )
      } else if (cell === -1) {
        rowDom.push(
          <div key={`${rInd}-${cInd}`} className='cell'>X</div>
        )
      } else {
        rowDom.push(
          <div key={`${rInd}-${cInd}`} className='cell' onClick={() => { handleClick(rInd, cInd) }}></div>
        )
      }
    });
    rectDom.push(
      <div key={`${rInd}`} className='row'>{rowDom}</div>
    );
  });

  return (
    <>
      <div className='tic-tac-toe'>
        {rectDom}
        {isFinish && <div><div>游戏结束！</div><div onClick={handleRestart}>重新开始</div></div> }
      </div>
    </>
  )
}