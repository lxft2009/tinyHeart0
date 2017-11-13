var momObj = function () {
    this.x;
    this.y;
    this.angle;
    //大鱼眨眼睛
    this.bigEye = [];
    this.bigEyeTimer = 0;
    this.bigEyeCount = 0;
    this.bigEyeInterval = 1000;
    //大鱼身体
    this.bigBodyOra = [];
    this.bigBodyBlu = [];
    this.bigBodyCount = 0;
    //大鱼摇尾巴
    this.bigTail = [];
    this.bigTailTimer = 0;
    this.bigTailCount = 0;
    this.mx;
    this.my;
}
momObj.prototype.init = function () {
    this.x = canWidth * 0.5 + Math.random() * 200;
    this.y = canHeight * 0.5 + Math.random() * 100;
    this.angle = 0;
    for(var i = 0; i < 2; i++){
        this.bigEye[i] = new Image();
        this.bigEye[i].src = "./src/bigEye" + i + ".png";
    }
    for(var i = 0; i < 8; i++){
        this.bigBodyBlu[i] = new Image();
        this.bigBodyOra[i] = new Image();
        this.bigBodyBlu[i].src = "./src/bigSwimBlue" + i + ".png";
        this.bigBodyOra[i].src = "./src/bigSwim" + i + ".png";
    }
    for(var i = 0; i < 8; i++){
        this.bigTail[i] = new Image();
        this.bigTail[i].src = "./src/bigTail" + i + ".png";
    }
}
momObj.prototype.draw = function () {
    //lerp x,y 调节运动
    this.x = lerpDistance(mx,this.x,0.98);
    this.y = lerpDistance(my,this.y,0.98);
    //delta angle
    //Math.atan2(y,x)
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;//-PI,PI
    //lerp angle 反应快慢
    this.angle = lerpAngle(beta,this.angle,0.6);
    //大鱼眨眼睛
    this.bigEyeTimer += deltaTime;
    if(this.bigEyeTimer > this.bigEyeInterval){
       this.bigEyeTimer %= this.bigEyeInterval;
       this.bigEyeCount = (this.bigEyeCount + 1) % 2;
       if(this.bigEyeCount == 0){
           this.bigEyeInterval = Math.random() * 1500 + 2000;
       }else{
           this.bigEyeInterval = 200;
       }
    }
    //大鱼摇尾巴
    this.bigTailTimer += deltaTime;
    if(this.bigTailTimer > 50){
        this.bigTailTimer %= 50;
        this.bigTailCount = (this.bigTailCount + 1) % 8;
    }
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    var tailCount = this.bigTailCount;
    var eyeCount = this.bigEyeCount;
    var bodyCount = this.bigBodyCount;
    ctx1.drawImage(this.bigTail[tailCount],+this.bigTail[tailCount].width * 0.5,-this.bigTail[tailCount].height * 0.5);
    if(data.double === 1){
        ctx1.drawImage(this.bigBodyOra[bodyCount],-this.bigBodyOra[bodyCount].width * 0.5,-this.bigBodyOra[bodyCount].height * 0.5);
    }else{
        ctx1.drawImage(this.bigBodyBlu[bodyCount],-this.bigBodyBlu[bodyCount].width * 0.5,-this.bigBodyBlu[bodyCount].height * 0.5);
    }
    ctx1.drawImage(this.bigEye[eyeCount],-this.bigEye[eyeCount].width * 0.5,-this.bigEye[eyeCount].height * 0.5);
    ctx1.restore();
}