// 绘制
function draw(
  target: Element,
  cssInfo: Record<string, any>,
  props: Record<string, any>,
  start: number,
  duration: number,
) {
  const percent = getProgress(start, duration);
  setStyle(target, cssInfo, props, percent);
  if (percent >= 1) return;
  window.requestAnimationFrame(() => { draw(target, cssInfo, props, start, duration) });
}

// 获取Css样式信息
function getCssInfo(
  el: Element,
  props: Record<string, any>,
): Record<string, any> {
  const ownerWindow = el.ownerDocument.defaultView;
  if (!ownerWindow) {
    return {};
  }
  const css = ownerWindow.getComputedStyle(el, null);
  let cssInfo: Record<string, any> = {};
  Object.keys(props).forEach((key) => {
    cssInfo[key] = css.getPropertyValue(key);
  });
  return cssInfo;
}

// 获取进度
function getProgress(
  start: number,
  duration: number,
): number {
  const percent = (Date.now() - start) / duration;
  return percent >= 1 ? 1 : percent;
}

// 设置样式
function setStyle(
  target: Element,
  cssInfo: Record<string, any>,
  props: Record<string, any>,
  percent: number,
) {
  Object.keys(cssInfo).forEach((key) => {
    const cssInfoVal = parseFloat(cssInfo[key]);
    const propsVal = parseFloat(props[key]);
    const newVal = (propsVal - cssInfoVal) * percent + cssInfoVal;
    ((target as HTMLElement).style as Record<string, any>)[key] = cssInfo[key].replace(cssInfoVal, newVal);
  });
}

// 执行动画
export function animated(
  target: Element,
  props: Record<string, any>,
  duration: number,
) {
  const start = Date.now();
  const cssInfo = getCssInfo(target, props);
  window.requestAnimationFrame(() => { draw(target, cssInfo, props, start, duration) });
}


// 等待函数
export async function wait(time: number) {
  await new Promise((resolve) => {
    setTimeout(() => resolve('success'), time);
  });
}