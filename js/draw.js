/**
 * - Canvas绘画函数 -
 * 各种基础图形、工具封装、类
 * 
 * -- 地鼠 | 2018.10.15
 */

/************************
 * - DSdraw静态类 -
 * 用于Canvas开发，方便开发
 ************************/
var DSdraw = function(){}

/**
 * [addEvent 事件绑定]
 * @param {[DOM Object]} obj [绑定事件的DOM对象]
 * @param {[String]} ev  [事件名称 Such:'click' 'mouseover']
 * @param {Function} fn  [执行函数]
 */
DSdraw.addEvent = function(obj, ev, fn){
 if(obj.attachEvent){
   obj.attachEvent('on'+ev, fn);//if lt IE9
 }else{
   obj.addEventListener(ev, fn, false);
 }
};
/**
 * [getMouse 获取鼠标坐标]
 * @param  {[Object]} elem [DOM操作对象]
 * @return {[JSON]}   {}   [x:鼠标x坐标；y:鼠标y坐标]
 */
DSdraw.getMouse = function(elem){
  var mouse = {x: 0, y: 0};

  DSdraw.addEvent(elem, 'mousemove', function(ev){
    var x, y;
    var ev = ev || window.event;
    if(ev.pageX || ev.pageY){
      x = ev.pageX;
      y = ev.pageY;
    }else{
      x = ev.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
      y = ev.clientY + document.body.scrollTop || document.documentElement.scrollTop;
    }
    x -= elem.offsetLeft;
    y -= elem.offsetTop;

    mouse.x = x;
    mouse.y = y;
  });
  
  return mouse;
};
/**
 * [getKey 绑定在window下的keydown事件，获取键盘按键]
 * @return {[JSON-string]} [key.dir]
 */
DSdraw.getKey = function(){
  var key = {};

  DSdraw.addEvent(window, 'keydown', function(ev){
    var ev = ev || window.event;
    var keyCode = ev.keyCode;

    if(keyCode === 38 || keyCode === 87){
      key.dir = 'up';
    }else if(keyCode === 39 || keyCode === 68){
      key.dir = 'right';
    }else if(keyCode === 40 || keyCode === 83){
      key.dir = 'down';
    }else if(keyCode === 37 || keyCode === 65){
      key.dir = 'left';
    }else{
      key.dir = 'other';
    }
  });

  return key;
};
/**
 * 数值转换为弧度  60 -> 60rad
 * @param  {[Number]} i [数值]
 * @return {[Number]}   [弧度]
 */
DSdraw.angle = DSdraw.rad = function(i)
{
  var C = 1;
  return i * ( (180*C) / Math.PI );
};
/**
 * 数值转换为角度  60 -> 60°
 * @param  {[Number]} i [数值]
 * @return {[Number]}   [角度/度数]
 */
DSdraw.deg = function(i)
{ 
  i = i==undefined ? 0 : i;
  var C = 1;
  return i * ( Math.PI / (180*C) );
};
/**
 * [clearCanvas 清洗整个Canvas画布]
 * @param  {[DOM]} cnv [JSCanvas对象]
 */
DSdraw.clearCanvas = function(cnv)
{
  var cxt = cnv.getContext('2d');
  cxt.clearRect(0, 0, cnv.width, cnv.height);
  return cnv;
};
/**
 * [randomColor 产生随机0x颜色]
 * @return {[String]} [十六进制随机颜色]
 */
DSdraw.randomColor = function(){
  return '#' +
  (function(color){
    return (color += '0123456789abcdef'[Math.floor(Math.random()*16)]) &&
           (color.length == 6) ? color : arguments.callee(color);
  })('');
};
/**
 * [random 范围[a,b)随机数，左闭右开]
 * @param  {[Number]} a [最小值]
 * @param  {[Number]} b [最大值]
 * @return {[Number]}   [随机数[a,b)]
 */
DSdraw.random = function(a,b){
  return a + Math.random()*(b-a);
};
/**
 * 绘制圆角矩形
 * @param  {[Object]} cxt [canvas.getCotent('2d')]
 * @param  {[Number]} x0  [起点x坐标]
 * @param  {[Number]} y0  [起点y坐标]
 * @param  {[Number]} w   [矩形宽度]
 * @param  {[Number]} h   [矩形长度]
 * @param  {[Number]} r   [圆角半径]
 * @return {[Object]}     [DSdraw]
 */
DSdraw.drawRoundedRect = function(cxt, x0, y0, w, h, r)
{
  cxt.beginPath();
  cxt.moveTo( x0 + r , y0 );//begin dot
  cxt.lineTo( x0 + w - r , y0 );//top-line
  cxt.arcTo( x0 + w, y0 , x0 + w , y0 + r , r );//right-top
  cxt.lineTo( x0 + w , y0 + h - r );//right-line
  cxt.arcTo( x0 + w , y0 + h , x0 + w - r , y0 + h , r );//right-bottom
  cxt.lineTo( x0 + r , y0 + h );//bottom-line
  cxt.arcTo( x0 , y0 + h , x0 , y0 + h - r , r );//left-bottom
  cxt.lineTo( x0 , y0 + r );//left-line
  cxt.arcTo( x0 , y0 , x0 + r , y0 , r );//left-top
  cxt.closePath();

  return this;
};
/**
 * [画扇形]
 * @param  {[type]} cxt    [canvas.getCotent('2d')]
 * @param  {[type]} x      [圆心x坐标]
 * @param  {[type]} y      [圆心y坐标]
 * @param  {[type]} r      [半径]
 * @param  {[type]} angles [起点角度]
 * @param  {[type]} anglee [结束角度]
 */
DSdraw.drawSector =  function(cxt, x, y, r, angles, anglee){
  cxt.beginPath();
  cxt.moveTo(x, y);
  cxt.arc(x, y, r, deg(angles), deg(anglee), false);
  cxt.closePath();
};
DSdraw.checkRect = function(rectA, rectB)
{
  return !( rectA.x + rectA.width < rectB.x  ||
            rectB.x + rectB.width < rectA.x  ||
            rectA.y + rectA.height < rectB.y ||
            rectB.y + rectB.height < rectA.y );
};
DSdraw.checkCircle = function(circleA, circleB)
{
  var dx = circleB.x - circleA.x;
  var dy = circleB.y - circleA.y;
  var distance =  Math.sqrt( dx*dx + dy*dy );

  if( distance < (circleA.radius + circleB.radius) ){
    return true;
  }else{
    return false;
  }
};
/////帧动画API兼容写法/////
var requestAnimationFrame = (function(){
  return window.requestAnimationFrame        ||
         window.webkitRequestAnimationFrame  ||
         window.mozRequestAnimationFrame     ||
         window.oRequestAnimationFrame       ||
         window.msRequestAnimationFrame      ||
         function(callback){
          window.setTimeout(callback, 1000/60);
         };
})();


/////////////////////  /////////////////////


/************************
 * - CANVAS类 -
 * 用于Canvas开发，方便开发
 ************************/

/**
 * ;;CLASS箭头类;;
 */
function Arrow(x,y,color,angle)
{
  this.x = x || 0;
  this.y = y || 0;
  this.color = color || '#F09';
  this.angle = angle || 0;
}
Arrow.prototype = {
  constructor: Arrow,
  stroke: function(cxt){
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.rotate(this.angle);
    cxt.strokeStyle = this.color;
    cxt.beginPath();
    cxt.moveTo(-20, -10);
    cxt.lineTo(0, -10);
    cxt.lineTo(0, -20);
    cxt.lineTo(20, 0);
    cxt.lineTo(0, 20);
    cxt.lineTo(0, 10);
    cxt.lineTo(-20, 10);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();
  },
  fill: function(cxt){
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.rotate(this.angle);
    cxt.fillStyle = this.color;
    cxt.beginPath();
    cxt.moveTo(-20, -10);
    cxt.lineTo(0, -10);
    cxt.lineTo(0, -20);
    cxt.lineTo(20, 0);
    cxt.lineTo(0, 20);
    cxt.lineTo(0, 10);
    cxt.lineTo(-20, 10);
    cxt.closePath();
    cxt.fill();
    cxt.restore();
  }
}

/**
 * ;;CLASS小球类;;
 */
function Ball(x, y, radius, color)
{
  this.x = x || 0;
  this.y = y || 0;
  this.radius = radius || 12;
  this.color = color || '#69F';
  this.scaleX = 1;
  this.scaleY = 1;
}
Ball.prototype = {
  constructor: Ball,
  stroke: function(cxt){
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.scale(this.scaleX, this.scaleY);
    cxt.strokeStyle = this.color;
    cxt.beginPath();
    cxt.arc(0, 0, this.radius, DSdraw.deg(0), DSdraw.deg(360), false);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();
  },
  fill: function(cxt){
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.scale(this.scaleX, this.scaleY);
    cxt.fillStyle = this.color;
    cxt.beginPath();
    cxt.arc(0, 0, this.radius, DSdraw.deg(0), DSdraw.deg(360), false);
    cxt.closePath();
    cxt.fill();
    cxt.restore();
  },
  /**
   * [checkWall 检测是否触碰边框]
   * @param  {[Object]}  cnv      [JSCanvas对象]
   * @param  {[Boolean]} isLimit  [是否限制出界]
   * @return {[Object]}          [返回一个对象，包含四边，布尔值]
   */
  checkWall: function(cnv, isLimit, t, r, b, l){
    var cnv = cnv || document.getElementsByTagName('canvas')[0];
    var res = {top: false, right: false, bottom: false, left: false};
    if( this.y < this.radius ){//上边界
      if(isLimit && !t)
        this.y = this.radius;
      res.top = true;
    }
    if( this.y > cnv.height - this.radius ){//下边界
      if(isLimit && !b)
        this.y = cnv.height - this.radius;
      res.bottom = true;
    }
    if( this.x < this.radius ){//左边界
      if(isLimit && !l)
        this.x = this.radius;
      res.left = true;
    }
    if( this.x > cnv.width - this.radius ){//右边界
      if(isLimit && !r)
        this.x = cnv.width - this.radius;
      res.right = true;
    }

    //处理结果
    if( !res.top && !res.right && !res.bottom && !res.left )
      res = 0;

    return res;
  },
  /**
   * [throughWall 检测是否完全越出边界]
   * @param  {[Object]}  cnv        [JSCanvas对象]
   * @param  {[Boolean]} isThrough  [是否限制出界]
   * @return {[Number]} 0|1|2|3|4 [0代表不碰界 1代表上边界 2代表右边界 3代表下边界 4代表左边界]
   */
  throughWall: function(cnv, isThrough, t, r, b, l){
    var cnv = cnv || document.getElementsByTagName('canvas')[0];

    if( this.y < -this.radius ){//上边界
      if(isThrough && !t)
        this.y = cnv.height + this.radius;
      return 1;
    }else if( this.y > cnv.height + this.radius ){//下边界
      if(isThrough && !b)
        this.y = -this.radius;
      return 3;
    }else if( this.x < -this.radius ){//左边界
      if(isThrough && !l)
        this.x = cnv.width + this.radius;
      return 4;
    }else if( this.x > cnv.width + this.radius ){//右边界
      if(isThrough && !r)
        this.x = -this.radius;
      return 2;
    }

    return 0;
  },
  checkMouse: function(mouse){
    var dx = mouse.x - this.x;
    var dy = mouse.y - this.y;
    var dis = Math.sqrt(dx*dx + dy*dy);

    if(dis < this.radius){
      return true;
    }else{
      return false;
    }
  }
}
/**
 * ;;CLASS矩形类;;
 */
function Box(x, y, width, height, color)
{
  this.x = x || 0;
  this.y = y || 0;
  this.width = width || 80;
  this.height = height || 40;
  this.color = color || 'red';
  this.vx = 0;
  this.vy = 0;
}
Box.prototype = {
  constructor: Box,
  stroke: function(cxt){
    cxt.save();
    cxt.strokeStyle = this.color;
    cxt.beginPath();
    cxt.rect(this.x, this.y, this.width, this.height);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();
  },
  fill: function(cxt){
    cxt.save();
    cxt.fillStyle = this.color;
    cxt.beginPath();
    cxt.rect(this.x, this.y, this.width, this.height);
    cxt.closePath();
    cxt.fill();
    cxt.restore();
  }
}
/**
 * ;;CLASS雪花类;;
 */
function Snow(){}