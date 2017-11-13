//大鱼与果实碰撞检测
//判断大鱼和果实的距离
function momFruitsCollision() {
    if(!data.gameOver){
        for(var i = 0; i < fruit.num; i++){
            if(fruit.alive[i]){
                //calculate length
                var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
                if(l < 900){
                    //fruit eaten
                    fruit.dead(i);
                    data.fruitNum ++;
                    mom.bigBodyCount ++;
                    if(mom.bigBodyCount > 7){
                        mom.bigBodyCount = 7;
                    }
                    if(fruit.fruitType[i] == 'blue'){//blue
                        data.double = 2;
                    }else{
                        data.double = 1;
                    }
                    wave.born(fruit.x[i],fruit.y[i]);
                    sound.src = './audio/eat.wav';
                    sound.volume = 0.5;
                }
            }
        }
    }

}
//判断大鱼和小鱼的距离
function momBabyCollision() {
    if(data.fruitNum > 0 && !data.gameOver){
        var l = calLength2(baby1.x,baby1.y,mom.x,mom.y);
        var m = calLength2(baby2.x,baby2.y,mom.x,mom.y);
        if(l < 900){
            //fruit eaten
            baby1.babyBodyCount = 0;
            data.addScore();
            //data => 0
            data.reset();
            mom.bigBodyCount = 0;
            halo.born(baby1.x,baby1.y);
            sound.src = './audio/babyEat.wav';
            sound.volume = 0.5;
        };
        if(m < 900){
            //fruit eaten
            baby2.babyBodyCount = 0;
            data.addScore();
            //data => 0
            data.reset();
            mom.bigBodyCount = 0;
            halo.born(baby2.x,baby2.y);
            sound.src = './audio/babyEat.wav';
            sound.volume = 0.5;
        }
    }

}