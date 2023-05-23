/**  水印添加方法  */

const watermark = {} as any;
const setWatermark = (args: any) => {
  const id = '1.23452384164.123412415';
  const xIndex = 45; // 绘制文本的 x 坐标位置
  let yIndex = 65; // 绘制文本的 y 坐标位置
  const yInterval = 25; // 有多个参数时的行间间隔
  const Interval = 130; // 错位显示数值

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id)!);
  }
  const can = document.createElement('canvas');
  // 设置canvas画布大小
  can.width = 400;
  can.height = 260;
  const cans = can.getContext('2d');
  cans!.rotate((-20 * Math.PI) / 240); // 水印旋转角度
  cans!.font = '18px Vedana';
  cans!.fillStyle = '#666666';
  cans!.textAlign = 'center';
  cans!.textBaseline = 'middle';
  cans!.textBaseline = 'hanging';
  for (let i = 0; i < args.length; i++) {
    cans!.fillText(args[i], xIndex, yIndex); // 绘制第一组水印文案
    cans!.fillText(args[i], xIndex + Interval, yIndex + Interval); // 绘制第二组水印文案（错位显示）
    yIndex += yInterval; // 设置每行间隔
  }

  // 创建div用于显示
  const watermarkDiv = document.createElement('div');
  watermarkDiv.id = id;
  const styleStr = `
                  position:fixed;
                  top:-15px;
                  left:0;
                  width:${`${document.documentElement.clientWidth}px`};
                  height:${`${document.documentElement.clientHeight}px`};
                  z-index:100000;
                  opacity:0.3;
                  pointer-events:none;
                  background:url(${can!.toDataURL('image/png')})`;
  watermarkDiv.setAttribute('style', styleStr);
  document.body.appendChild(watermarkDiv);
  return id;
};

// 添加水印方法
watermark.set = function () {
  const args = Array.prototype.slice.apply(arguments);
  let id = setWatermark(args);
  // 检测如果水印被去掉了，自动给加上
  setInterval(function () {
    if (document.getElementById(id) === null) {
      id = setWatermark(args);
    }
  }, 500);
  // 在窗口大小改变之后,自动触发加水印事件
  window.onresize = function () {
    setWatermark(args);
  };
};
// 移除水印方法
watermark.remove = function () {
  const id = '1.23452384164.123412415';
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id)!);
  }
};

export default watermark;
