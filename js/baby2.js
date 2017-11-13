var baby2Obj = function () {
    this.x;
    this.y;
    this.angle;
    this.bx;
    this.by;
    //小鱼尾巴摇摆动作
    this.babyTail = [];
    this.babyTailTimer = 0;
    this.babyTailCount = 0;
    //小鱼眨眼睛
    this.babyEye = [];
    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;
    //小鱼身体变白
    this.babyBody = [];
    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}
baby2Obj.prototype.init = function () {
    this.x =Math.random() * 500;
    this.y =Math.random() * 500;
    this.angle = 0;
    for(var i = 0; i < 2; i++){
        this.babyEye[i] = new Image();
        this.babyEye[i].src = './src/babyEye' + i + '.png';
    }
    for(var i = 0; i < 20; i++){
        this.babyBody[i] = new Image();
        this.babyBody[i].src = './src/babyFade' + i + '.png';
    }
    this.babyBody.src = './src/babyFade0.png';
    for(var i = 0; i < 8; i++){
        this.babyTail[i] = new Image();
        this.babyTail[i].src = './src/babyTail' + i + '.png';
    }
}
baby2Obj.prototype.draw = function () {
    //lerp x,y
    this.x = lerpDistance(mom.x, this.x, 0.997);
    this.y = lerpDistance(mom.y, this.y, 0.997);
    //delta angle
    //Math.atan2(y,x)
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;//-PI,PI
    //lerp angle 反应快慢
    this.angle = lerpAngle(beta,this.angle,0.6);
    //小鱼眨眼睛
    this.babyEyeTimer += deltaTime * 0.8;
    if(this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if(this.babyEyeCount == 0){
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        }else{
            this.babyEyeInterval = 200;
        }
    }
    //小鱼身体变白
    this.babyBodyTimer += deltaTime ;
    if(this.babyBodyTimer > 1000){
        this.babyBodyCount += 1;
        this.babyBodyTimer %= 1000;
        if(this.babyBodyCount > 15){
            sound.src = './audio/cry.wav';
            sound.volume = 0.5;
            if(data.gameOver == true){
                sound.src = '';
            }
        }
        if(this.babyBodyCount >19){
            this.babyBodyCount = 19;
            //game over
            data.gameOver = true;
        }
    }
    //小鱼摆尾巴
    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer > 50){
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;
    }
    //画小鱼
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    var eyeCount = this.babyEyeCount;
    var tailCount = this.babyTailCount;
    var bodyCount = this.babyBodyCount;
    ctx1.drawImage(this.babyTail[tailCount], +this.babyTail[tailCount].width * 0.5-1, -this.babyTail[tailCount].height * 0.5);
    ctx1.drawImage(this.babyBody[bodyCount], -this.babyBody[bodyCount].width * 0.5, -this.babyBody[bodyCount].height * 0.5);
    ctx1.drawImage(this.babyEye[eyeCount],-this.babyEye[eyeCount].width * 0.5, -this.babyEye[eyeCount].height * 0.5);
    ctx1.restore();
}