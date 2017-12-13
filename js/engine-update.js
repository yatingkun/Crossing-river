/**************这里是我更新的engine.js*************/

/*****获得画布，设置画布大小，宽505，高606*****/
let Engine = function(global) {
    let win = global.window,
        canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        collision = 0, //记录碰撞的次数。
        lastTime;

    canvas.height = 606;
    canvas.width = 505;

    /**这个main函数调用渲染函数render（），和描绘动画的函数updata()***********/
    function main() {
        let now = Date.now(),
            dt = (now - lastTime) / 1000.0; //这是一个在canvas制作动画的公式，保证了在不同的电脑动画的移动速度一样，只有因fps不同引起的流畅度不同。公式的推导过程记录在笔记中。
        render();
        renderEntities();
        update(dt);
        lastTime = now;
        win.requestAnimationFrame(main);
    }

    /****** 游戏的初始化**********/
    function init() {
        lastTime = Date.now(); //获得相应的时间
        background(); //初始化背景。
        playerInit(); //初始化人物图片。
        gameStart();
    }

    /********随机获得一个角色图片，用于初始化。**********/
    function playerInit() {
        const roleImages = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png'
        ];
        let index = Math.floor(Math.random() * roleImages.length);
        player.reset();
        player.sprite = roleImages[index];
        player.render();
    }

    /**
     * 点击“开始”按钮游戏开始。
     */
    function gameStart() {
        const play = $('.start-btn');
        play.bind('click', function(e) {
            main();
            $(e.target)[0].className = ' disappear'; //游戏开始后设置“开始”按钮的样式不可见。
        });
    }

    /********这个函数用来在每个时间隙更新游戏界面的数据。**********/
    function update(dt) {
        updateEntities(dt);
    }

    /*** 检测人物是否发生碰撞，若发生则生命值减1（爱心图片减1），在生命值变为0前分数达到1200游戏过关，否则失败。***********/
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            if (enemy.update(dt)) {
                collision++;
                $('.heart-num ul li')[3 - collision].className = 'disappear';
                if (collision % 3 === 0) {
                    if (Number(score) >= 1200) {
                        gameReset('.success', 'success');
                        $('.over')[0].className = 'disappear';
                    }
                    gameReset('.over', 'over');
                    collision = 0;
                }
            }
        });

    }

    /**
     * 这个函数用来描绘敌人和玩家。
     */
    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        if (player.y >= 55 && player.y <= 83 * 4 + 55) { //这里会涉及人物“跑”出画布的问题，在app-update.js中的playerl类做了处理。
            player.render();
        }
    }

    /**
     *描绘函数。
     */
    function render() {
        const rowImages = [
                'images/water-block.png', // 这一行是河
                'images/stone-block.png', // 第一行石头
                'images/stone-block.png', // 第二行石头
                'images/stone-block.png', // 第三行石头
                'images/grass-block.png', // 第一行草地
                'images/grass-block.png' // 第二行草地
            ],
            numRows = 6,
            numCols = 5;
        let row, col;
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * clothx, row * clothy);
            }
        }
    }

    /**
     *描绘初始化的背景
     */
    function background() {
        render();
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Heart.png',
        'images/grass-block.png',
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
    global.collision = collision;
};

Engine(this);