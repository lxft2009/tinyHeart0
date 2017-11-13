var fruitObj = function () {
    this.alive = [];
    this.orange = new Image();
    this.blue = new Image();
    this.x = [];
    this.y = [];
    this.l = [];
    this.fruitType = [];
    this.speed = [];
    this.aneNO = [];
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function () {

    for(var i = 0; i< this.num; i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.speed[i] = Math.random()*0.017+0.003;//[0.003,0.002)
        this.fruitType[i] = "";
        this.aneNO[i] = 0;

    }
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";
}
fruitObj.prototype.draw = function () {
    for(var i = 0; i < this.num ;i++){
        //draw
        //find an one,fly up
        //检测水果状态是否超出背景范围
        var pic =  this.orange;
        if(this.fruitType[i] == "blue"){
            pic = this.blue;
        }
        if(this.alive[i] === true){
            if(this.l[i] <=13){
                //随海葵摇摆生成果实
                var no = this.aneNO[i];
                this.x[i] = ane.headx[no];
                this.y[i] = ane.heady[no];
                this.l[i] += this.speed[i] * deltaTime;
            }else{
                this.y[i] -= this.speed[i] * deltaTime*7;
            }
            ctx2.drawImage(pic,this.x[i] - this.l[i]*0.5,this.y[i] - this.l[i]*0.5,this.l[i],this.l[i]);
            if(this.y[i] < -10){
                this.alive[i] = false;
            }
        }

    }
}
fruitObj.prototype.born = function (i) {
    this.aneNO[i] =Math.floor(Math.random() * ane.num);
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if(ran < 0.2){
        this.fruitType[i] = "blue";
    }else {
        this.fruitType[i] = "orange";
    }

}
fruitObj.prototype.dead = function (i) {
    this.alive[i] = false;
}
fruitObj.prototype.fruitMonitor = function () {
    //监测水果数量
    var number = 0;
    for(var i = 0; i < this.num; i++){
        if(this.alive[i]){
            number ++;
        }
    }
    if(number < 15){
        //生成水果
        this.sendFruit();
        return;
    }
}
fruitObj.prototype.sendFruit = function () {
    for(var i = 0; i < this.num; i++){
        if(!this.alive[i]){
            this.born(i);
            return;
        }
    }
}