

  var doc = document;
  var loadingDone = false;

  var loadingPage = doc.getElementById('loadingPage');
  var loadingText = doc.getElementById('loadingText');
  var bar = doc.getElementById('loadingBarInner');
  var p = loadingText.innerHTML;


  //---------//
  
  var gameBox = doc.getElementById('gameBox');

  function gameView(){
    var oRole = doc.getElementById('role');
    var bgm = doc.getElementById('music');
    var btnMsc = doc.getElementById('btn-msc');
    var tcMsc = doc.getElementById('tc-msc');
    var ysMsc = doc.getElementById('ys-msc');
    var scbMsc = doc.getElementById('scb-msc');
    var hjBgm = doc.getElementById('hj-msc');
    var zdndBgm = doc.getElementById('zdnd-msc');
    var zlBgm = doc.getElementById('zl-msc');
    var pages = $('.game-page');
    var one = true;
    var timer = null;//落地循环器
    var timer2 = null;
    var t = 0;//角色身处高度
    var speed = 0;//坠落叠加速度
    var isOn = false;//是否往上飞
    var count = 0;
    var isGameOver = false;
    var dist = 0;
    var num = 0;


    gameBox.style.display = 'block';
    gameBox.addEventListener('touchend', function(){
      if(one){//首次音乐加载
        one = false;
        bgm.play();
        bgm.loop = true;
      }
    })
    function rd(min,max){//随机数-[min,max)
      return (min+Math.random()*(max-min))
    }
    function fail(){
      clearInterval(timer);
      clearInterval(timer2);
      timer = timer2 = null;
      isGameOver = true;

      $('.game-page-current').removeClass('game-page-current');
      $(pages).eq(2).addClass('game-page-current');
      $('#nl2').animate({transform:'translate3d(-50%, -100%, 0px) matrix(0.5, 0, 0, 0.5, 190, 1070)',opacity:1}, 2000, function(){
        $('#zn2').animate({transform:'translate3d(-50%, -100%, 0px) matrix(0.4, 0, 0, 0.4, 530, 840)',opacity:1}, 1000, function(){
          setTimeout(function(){
            $('#zn2').animate({transform:'translate3d(0, -100%, 0px) matrix(0.4, 0, 0, 0.4, 530, 840)',opacity:0}, 1000, function(){
              $('.res1').eq(1).text(dist);
              $('.res1').animate({opacity:1}, 600, function(){
                $('.res2').animate({opacity:1}, 600, function(){
                  $('#tudi').css('display','block').animate({opacity:1}, 1000, function(){
                    $('.gztxBtn').eq(0).css('display','block');
                    $('.gztxBtn').eq(0).animate({opacity:1}, 400, function(){
                      $('.cxlgBtn').eq(0).css('display','block');
                      $('.cxlgBtn').eq(0).animate({opacity:1},400);
                    });
                  });
                });
              })
            });
          }, 1000)
        });
      });
    }
    function rolefall(){
      clearInterval(timer);
      zlBgm.play();
      count = 20;
      timer = setInterval(function(){
        t = $(oRole).offset().top;
        if(t>=810 || t<=-200){
          fail();//游戏结束
        }else{
          count++;
          speed=(1/2)*10*Math.pow((0.03*count), 2);
          oRole.style.top = t+speed+'px';
        }
      }, 30);
    }
    

    //page1
    $('#title').animate({transform:'translate3d(-50%, -100%, 0) matrix(1, 0, 0, 1, 320, 410)'}, 600, function(){
      setTimeout(function(){
        $('#nl1').animate({transform:'translate3d(-50%, -100%, 0) matrix(1, 0, 0, 1, 190, 1040)'}, 1000, function(){
          $('#yd1').animate({transform:'translate3d(-50%, -100%, 0) matrix(1, 0, 0, 1, 512, 876)'}, 1000);
          $('#zn1').animate({transform:'translate3d(-50%, -100%, 0) matrix(1, 0, 0, 1, 540, 834)'}, 1000, function(){
            $('#yxgzBtn').css('display','block');
            $('#yxgzBtn').animate({opacity:1}, 400, function(){
              $('#ksyxBtn').css('display','block');
              $('#ksyxBtn').animate({opacity:1},400);
            });
          });
        });
      }, 400);
    });
    $('#yxgzBtn').on('tap', function(){//游戏规则
      $('#gameRule').css('display','block');
      $('#zxzxBtn').css('display','block');
    })
    $('#zxzxBtn').on('tap', function(){//在下知晓
      $('#gameRule').css('display','none');
      $(this).css('display','none');
    })
    $('#ksyxBtn').on('tap', function(){//开始游戏
      $('.game-page-current').removeClass('game-page-current');
      $(pages).eq(1).addClass('game-page-current');
      (function(){
        var stone = $('#stone').offset();
        var role = $('#role').offset();
        var cloud1 = $('#cloud1').offset();
        var cloud2 = $('#cloud2').offset();
        var hail1 = $('#hail1').offset();
        var hail2 = $('#hail2').offset();
        function rockfall(){
          if(isGameOver) return;
          setTimeout(function(){
            $('#stone').animate({top:'1040px',left:rd(80,180)+'px'}, rd(2000,5000), function(){
              $('#stone').css({top:'-100px',left:rd(260,400)+'px'});
              rockfall();
            });
            ysMsc.play();
          }, rd(5000,12000))
        }
        rockfall();
        function cloudmove(){
          if(isGameOver) return;
          setTimeout(function(){
            $('#cloud1').animate({left:rd(-400,-200)+'px'}, 6000, function(){
              $(this).css({left:rd(640,720)+'px',top:rd(100,600)+'px',display:'block'});
              cloudmove();
            })
            $('#cloud2').animate({left:rd(-300,-200)+'px'}, 3000, function(){
              $(this).css({left:rd(640,700)+'px',top:rd(640,810)+'px',display:'block'});
            })
          }, rd(3000,10000))
        }
        cloudmove();
        function hailmove(){
          if(isGameOver) return;
          setTimeout(function(){
            $('#hail1').animate({left:rd(-500,-360)+'px'}, 6000, function(){
              $(this).css({left:rd(640,770)+'px'});
              hailmove();
            })
            $('#hail2').animate({left:rd(-500,-200)+'px'}, 3500, function(){
              $(this).css({left:rd(640,660)+'px'});
            })
          }, rd(3000,5000));
        }
        hailmove();
        rolefall();
        timer2 = setInterval(function(){//碰撞检测定时器
          num++;
          if(num%30===0){
            dist = num/30;
            $('#jl').text('共飞行了'+dist+'米');
          }
          stone = $('#stone').offset();
          role = $('#role').offset();
          cloud1 = $('#cloud1').offset();
          cloud2 = $('#cloud2').offset();
          hail1 = $('#hail1').offset();
          hail2 = $('#hail2').offset();

          if( role.left+role.width-20>=stone.left && 
              role.top+role.height-30>=stone.top && 
              role.top+30<=stone.top+stone.height &&
              role.left+30<=stone.left+stone.width ){
            zdndBgm.play();
            fail();
          }
          if( role.left+role.width-20>=hail1.left && 
              role.top+role.height-30>=hail1.top && 
              role.top+30<=hail1.top+hail1.height &&
              role.left+30<=hail1.left+hail1.width ){
            zdndBgm.play();
            fail();
          }
          if( role.left+role.width-20>=hail2.left && 
              role.top+role.height-30>=hail2.top && 
              role.top+30<=hail2.top+hail2.height &&
              role.left+30<=hail2.left+hail2.width ){
            zdndBgm.play();
            fail();
          }
          if( role.left+role.width-20>=cloud1.left && 
              role.top+role.height-30>=cloud1.top && 
              role.top+30<=cloud1.top+cloud1.height &&
              role.left+30<=cloud1.left+cloud1.width ){
            $('#cloud1').css('display','none');
            dist= (dist-10<0) ? 0 : dist-10;//撞到云朵距离减10米
            num=dist*30;
            $('#jl').text('共飞行了'+dist+'米');
          }
          if( role.left+role.width-20>=cloud2.left && 
              role.top+role.height-30>=cloud2.top && 
              role.top+30<=cloud2.top+cloud2.height &&
              role.left+30<=cloud2.left+cloud2.width ){
            $('#cloud2').css('display','none');
            dist=dist-10;
            num=dist*30;
            $('#jl').text('共飞行了'+dist+'米');
          }

        }, 30);

      })()
    })

    //page2
    $('#game').on('tap', function(){//开始游戏
      if(isOn || isGameOver) return;
      isOn = true;
      clearInterval(timer);
      oRole.src = './images/2.png';
      scbMsc.play();
      $(oRole).animate({top:(t-80)+'px'}, 400, function(){
        isOn = false;
        oRole.src = './images/1.png';
        rolefall();
      });
    })
    
    
    //page3
    $('#tudi').on('tap', function(){//点我点我
      $('#tudijianghuw').css('display','block');
    })
    $('#tdy').on('tap',function(){//关闭讲话
      $('#tudijianghuw').css('display','none');
    })
    $('#fsmbBtn').on('tap', function(){//奉上秘宝
      $('.game-page-current').removeClass('game-page-current');
      $(pages).eq(3).addClass('game-page-current');
      bgm.pause();
      hjBgm.play();//获救音乐
      hjBgm.loop = true;
      setTimeout(function(){
        $('.res3').animate({opacity:1}, 600);
      }, 600);
    })

    //page4
    $('#wyymbBtn').on('tap', function(){//我也要秘宝
      window.open('http://web.fosu.edu.cn/lambda');
    })
    
    //page3、4
    $('.gztxBtn').on('tap', function(){//告知天下
      $('.share').css('display','block');
      $('.gztxBtn').remove();
      $('#wyymbBtn').css('transform','translate3d(-50%, -100%, 0) matrix(1, 0, 0, 1, 320, 880)')
    })
    $('.share').on('tap', function(){//转发
      $('.share').css('display','none');
    })
    $('.cxlgBtn').on('tap', function(){//重新来过
      window.location.reload();
    })
    $('.btn').on('tap', function(){//按钮生效
      btnMsc.play();
    })
    $('.tc').on('tap', function(){//弹窗音效
      tcMsc.play();
    })
  }

  //进度加载
  function onprogress(){
    if(loadingDone){//加载完成
      clearInterval(timer);
      loadingPage.parentNode.removeChild(loadingPage);//移除加载层
      gameView();//打开游戏层
    }
    if(loadingText.innerHTML==='100') loadingDone=true;
    else{//加载中
      p = loadingText.innerHTML-0+4;
      loadingText.innerHTML = p+'';
      bar.style.width = (p)+'%';
    }
  }
  var timer = setInterval(onprogress, 100);
