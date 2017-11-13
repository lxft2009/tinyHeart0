var aneObj = function () {
    //start point, control point, end point(sin)
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.amp = [];
    this.alpha = 0;
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function () {
    for(var i = 0; i < this.num; i++){
        this.rootx[i] = i * 16 + Math.random() * 20;
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 200 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 +50;
    }
}
aneObj.prototype.draw = function () {
    //作用ctx2.save()/ctx2.restore():两个API之间属性起作用
    this.alpha += deltaTime * 0.0008;//[-1,1]
    var l = Math.sin(this.alpha);
    ctx2.save();
    ctx2.globalAlpha = 0.5;
    ctx2.lineWidth = "20";
    ctx2.strokeStyle = "#3b154e";
    ctx2.lineCap = "round";
    for(var i = 0; i < this.num; i++){
        //beginPath
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i],canHeight-150,this.headx[i],this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
}