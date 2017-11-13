var dataObj = function () {
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    this.gameOver = false;
    this.alpha = 0;
    this.over = 0;
}
dataObj.prototype.reset = function () {
    this.fruitNum = 0;
    this.double = 1;
}
dataObj.prototype.draw = function () {
    var w = can1.width;
    var h = can1.height;
    ctx1.save();
    ctx1.shadowBlur = 5;
    ctx1.shadowColor = 'green';
    ctx1.font="35px 隶书";
    //ctx1.fillText("NUM : " + this.fruitNum,w * 0.5, h - 40);
    //ctx1.fillText("DOUBLE : " + this.double, w * 0.5, h -60);
    ctx1.fillText("得分: " + this.score,400, 50);
    ctx1.fillText("鱼妈妈的一家人", 140,50);
    if(this.gameOver && pl ==false){
        play.style.visibility = 'visible';
		pause.style.visibility = 'hidden';
        this.alpha += deltaTime * 0.001;
        if(this.alpha > 1){
            this.alpha = 1;
        }
        this.over ++;
        ctx1.fillStyle = 'rgba(255,255,255,' + this.alpha + ')';
        ctx1.fillText("GAME OVER" , w * 0.5, h * 0.5);
        if(this.over == 2){
            gameOver.play();
        }
    }
    ctx1.restore();
}
dataObj.prototype.addScore = function () {
    this.score += this.fruitNum * 100 * this.double;
}
