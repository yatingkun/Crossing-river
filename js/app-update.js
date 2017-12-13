/**************这是重写的app.js***************/

/*********将敌人速度，每个矩形的长宽设为全局变量***********/
const MAX_SPEED = 200;
const MIDDLE_SPEED = 150;
const MIN_SPEED = 50;
const clothx = 101;
const clothy = 83;
const clothmiddle = 55;
const speed = [MAX_SPEED, MIN_SPEED, MIDDLE_SPEED]; //存放生成敌人实例时的速度。

/********创建一个类，作为敌人和人物的父类。****************/
let Father = class Father {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};
/**创建了角色子类***********/
class Player extends Father {
    constructor(x, y, sprite) {
        super(x, y);
        this.sprite = sprite;
    }

    update() {
        if (this.x >= 4 * clothx) { //保证人物在水平方向上在规定的范围内移动。
            this.x = 4 * clothx;
        } else if (this.x <= 0) {
            this.x = 0;
        }
        if (this.y <= clothmiddle) { //检测人物是否成功到达河流。并保证人物在竖直方向上在规定范围内活动。（上部）
            this.y = clothmiddle;
            setTimeout(function() {
                player.reset();
            }, 200);
            let scoreNum = $('.score-num')[0].firstChild.nodeValue;
            score = Number(scoreNum);
            score += 400;
            if (scoreNum) {
                $('.score-num')[0].firstChild.nodeValue = '';
                $('.score-num')[0].firstChild.nodeValue = score;
                if (score >= 1200) {
                    gameReset('.success', 'success');
                }
            }

        } else if (this.y >= 4 * clothy + clothmiddle) { //保证人物在竖直方向上在规定范围内活动。（下部）
            this.y = 4 * clothy + clothmiddle;
        }
    }
    handleInput(movement) { //这里设置上下左右键每按一次人物坐标移动的大小.

        switch (movement) {
            case 'left':
                {
                    this.x -= clothx; //人物向左移动clothx;
                    break;
                }
            case 'right':
                {
                    this.x += clothx;
                    break;
                }
            case 'up':
                {
                    this.y -= clothy;
                    break;
                }
            case 'down':
                {
                    this.y += clothy;
                    break;
                }
        }

        player.update();
    }
    reset() { //设置人物回到原点的位置。
        player.x = 2 * clothx;
        player.y = 4 * clothy + clothmiddle;
    }
}

/**********创建了一个敌人子类。***************/
class Enemy extends Father {
    constructor(x, y, speed) {
        super(x, y);
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    checkCollision(player) { //冲突检测
        let distance = Math.abs(this.x - player.x); //求敌人与碰撞物坐标X差的绝对值
        if (this.y === player.y && distance < 50) { //如果水平距离（坐标x的差）小于50，且处于同一水平线上（坐标y相等），则发生碰撞。
            player.reset(); //人物回到原位。
            return true;
        }
    }
    update(dt) { //在每个时间间隙都更新一次敌人的位置情况，碰撞情况。
        this.x += dt * this.speed;
        if (this.x >= 5 * clothx) {
            this.x = -50;
        }
        if (this.checkCollision(player)) {
            return true;
        }
    }

}

/************生成敌人的实例，这里生成三个敌人，敌人的位置，速度都是随机的**********/
/**********************这三段函数是我询问学习小组成员后得到的，并非我自己写的
**********************/
var allEnemies = []; //存放敌人实例的数组。
function enemyGenerator(ENEMY_LENGTH) { //生成的敌人实例其坐标随机生成，速度随机生成
    let row_index = getRandomArr(3, 2);
    let cols_index = getRandomArr(3, 2);
    let speed_index = getRandomArr(3, 2);
    for (let i = 0; i < ENEMY_LENGTH; i++) {
        let enemy = new Enemy(row_index[i] * clothx, cols_index[i] * clothy + clothmiddle, speed[speed_index[i]]);
        allEnemies.push(enemy);
    }
}

function getRandomArr(len, max) {
    let sub_arr = new Array();
    let has_arr = new Array();
    let temp = '';
    for (let i = 0; i <= len - 1; i++) {
        do {
            temp = getRandomNum(0, max);
        } while (has_arr[temp] !== undefined)
        has_arr[temp] = 'has';
        sub_arr[i] = temp;
    }
    return sub_arr;
}

function getRandomNum(min, max) {
    return min + Math.round(Math.random() * (max - min));
}
enemyGenerator(3);
let score = 0;
let player = new Player(); //生成人物实例。
/*********这里是原本提供的按键监听函数***********/
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
/**************点击“游戏说明”按钮，会在界面上显示相关说明,点击“ok”按钮，说明消失**************/
$(document).ready(function() {
    const instructionBtn = $('.instruction-btn');
    const instructionMsg = $('.instruction-msg');
    const confirm = $('.confirm'); //定位到“ok”按钮。
    instructionBtn.bind("click", function() {
        instructionMsg[0].className = 'instruction-msg';
    });
    confirm.bind("click", function() {
        instructionMsg[0].className = 'disappear';
    });
});

/********重置函数*************/
function gameReset(selector, msg) {
    $(selector)[0].className = msg;
    $('.' + msg + '-btn').bind("click", function() {
        $(selector)[0].className = msg + ' disappear';
        $('.heart-num ul li').each(function() {
            this.className = '';
        });
        $('.score-num')[0].firstChild.nodeValue = 0;
        allEnemies.splice(0, allEnemies.length);
        enemyGenerator(3);
        player.reset();
    })
}
var rest = $('reset-btn');
rest.bind('click', function() {
    alert("!!");
})
/**********让玩家选择人物角色*************/
var playerBtn = $('.playerBtn');
var players = $('.player-select');
playerBtn.bind('click', function() { //第一次点击“选择角色”按钮时，出现人物选择的div，再次点击该按钮此div消失。
    if (players[0].className === 'player-select') {
        players[0].className = 'player-select disappear';
    } else {
        players[0].className = 'player-select'; //选择人物时出现的的div样式。
    }
});

$('.player-select ul li').click(function(e) {
    players[0].className = ' disappear';
    player.reset();
    player.sprite = $(e.target)[0].attributes[0].value; //获得鼠标点击img属性的值，即点击选择的人物图片路径。
    player.render();
});