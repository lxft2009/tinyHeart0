var can1;
var can2;
//对应场景
var ctx1;
var ctx2;
//外框架
var div;
//两针时间间隔
var lastTime;
var deltaTime;
//加载背景
var bgPic = new Image();
//获取canvas尺寸
var canWidth;
var canHeight;
//定义海葵
var ane;
//定义水果
var fruit;
//定义大鱼
var mom;
//定义两个小鱼
var baby1;
var baby2;
//定义鼠标
var mx;
var my;
//数值计算
var data;
//定义圆圈
var wave;
var halo;
//定义漂浮物
var dust;
//开始按钮
var play;
var pl = true;
//暂停按钮
var pause;
var iD = 0;
var pauseTime = true;
//音效
var sound;
var gameOver;
var back;
var swim;
document.body.onload = game;
function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameLoop();
}
function init() {
    //获得canvas context
    //fishes,dust,UI,circle
    can1 = document.getElementById("canvas1");
    ctx1 = can1.getContext("2d");
    can1.addEventListener('click',function () {
       if(play.style.visibility == 'hidden' && !data.gameOver){
           //lastID = iD;
           sound.src = './audio/timeStop.wav';
           // sound.volume = 0.5;
           window.cancelAnimationFrame(iD);
           pauseTime = false;
           pause.style.visibility = 'hidden';
           play.style.visibility = 'visible';
           back.pause();
           swim.pause();
       }
    },false);
    //background one,fruits
    can2 = document.getElementById("canvas2");
    ctx2 = can2.getContext("2d");
    bgPic.src = './src/background.jpg';
    canWidth = can1.width;
    canHeight = can1.height;
    ane = new aneObj();
    ane.init();
    fruit = new fruitObj();
    fruit.init();
    mom = new momObj();
    mom.init();
    mx = canWidth * 0.5;
    my = canHeight * 0.5;
    baby1 = new baby1Obj();
    baby1.init();
    baby2 = new baby2Obj();
    baby2.init();
    data = new dataObj();
    ctx1.fillStyle = 'white';
    ctx1.font = '20px Verdana';
    ctx1.textAlign = 'center';
    wave = new waveObj();
    wave.init();
    halo = new haloObj();
    halo.init();
    dust = new dustObj();
    dust.init();
    play = document.getElementById('play_1');
    pause = document.getElementById('pause_1');
    sound = document.getElementById('sound');
    back = document.getElementById("back");
    swim = document.getElementById("swim");
    back.volume = 0.2;
    swim.volume = 0.2;
    gameOver = document.getElementById("gameOver");

}
function gameLoop() {
    //循环加载gameLoop
    iD = window.requestAnimationFrame(gameLoop);//setInteral,setTimeout,frame per second
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if(deltaTime > 40){
        deltaTime = 17;
    }
    drawBackground();
    ane.draw();
    fruit.fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    momFruitsCollision();
    baby1.draw();
    baby2.draw();
    momBabyCollision();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
    // if(data.gameOver){
    //     gameOver.play();
    //
    //     return;
    //     // for(var i = 0; i< 200; i++){
    //     //     back.volume -= i * 0.001;
    //     //     swim.volume -= i * 0.001;
    //     // }
    //     // gameOver = document.getElementById("gameOver");
    //     // gameOver.play();
    // }
}
function onMouseMove(e) {
    if(!data.gameOver){
        if(e.offsetX || e.layerX){
            mx =  e.offsetX == undefined ? e.layerX : e.offsetX;
            my =  e.offsetY == undefined ? e.layerY : e.offsetY;
        }
    }
    if(data.gameOver){
        for(var i = 0; i< 10; i++){
            back.volume = back.volume - i * 0.001;
            swim.volume = swim.volume - i * 0.001;
            if(back.volume < 0.01 || swim.volume < 0.01){
                back.volume = 0 ;
                swim.volume =0;

                break;
            }
        }

    }

}
function playGame() {
    if(pauseTime || data.gameOver){
        game();
    }else {
        gameLoop();
        back.play();
        swim.play();
    }
    can1.addEventListener('mousemove',onMouseMove,false);
    if(pl){
        window.cancelAnimationFrame(iD);
    }
    play.style.visibility = 'hidden';
    pause.style.visibility = 'visible';
    data.gameOver = false;
    pl = false;
}
// function pauseGame() {
//     gameLoop();
//     window.cancelAnimationFrame(iD);
//     pause.style.visibility = 'hidden';
//     play.style.visibility = 'visible';
// }