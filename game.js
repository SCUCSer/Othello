const app = document.getElementById('app');
const overlay = document.getElementById('overlay');

window.onload = function() {
    const startButton = document.getElementById('start');
    startButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            showRules();
        }
    });
    startButton.focus();
};

function showCard(title, content, callback) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const dialog = document.createElement('div');
    dialog.classList.add('dialog');

    const dialogTitle = document.createElement('h2');
    dialogTitle.classList.add('text-lg', 'font-bold', 'mb-4');
    dialogTitle.textContent = title;

    const dialogContent = document.createElement('p');
    dialogContent.classList.add('mb-6');
    dialogContent.textContent = content;

    const closeButton = document.createElement('button');
    closeButton.classList.add(
        'justify-center',
        'float-right',
        'rounded-md',
        'bg-indigo-600',
        'px-3',
        'py-1.5',
        'text-sm',
        'font-semibold',
        'leading-6',
        'text-white',
        'shadow-sm',
        'focus:outline-none',
        'hover:bg-indigo-500',
        'focus-visible:outline',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
        'focus-visible:outline-indigo-600'
    );
    closeButton.textContent = 'OK';
    closeButton.addEventListener('click', () => {
        closeDialog(callback);
    });

    dialog.appendChild(dialogTitle);
    dialog.appendChild(dialogContent);
    dialog.appendChild(closeButton);

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    closeButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    closeButton.focus();

    // 添加按键事件监听器
    document.body.addEventListener('keydown', handleKeyDown);

    function closeDialog(callback) {
        overlayElements = document.getElementsByClassName('overlay');
        while (overlayElements.length > 0) {
            overlayElements[0].remove();
        }
        document.body.style.overflow = 'auto';
        document.body.removeEventListener('keydown', handleKeyDown);
        if (callback) {
            callback();
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            document.querySelector('.dialog button').click();
        }
    }
}

function showDialog(title, content, defaultValue, validateInput, callback) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const dialog = document.createElement('div');
    dialog.classList.add('dialog');

    const dialogTitle = document.createElement('h2');
    dialogTitle.classList.add('text-lg', 'font-bold', 'mb-4');
    dialogTitle.textContent = title;

    const dialogContent = document.createElement('p');
    dialogContent.classList.add('mb-6');
    dialogContent.textContent = content;

    const input = document.createElement('input');
    input.classList.add(
        'border-none',
        'px-3',
        'py-1.5',
        'text-lg',
        'font-semibold',
        'leading-6',
        'w-full',
        'mb-4',
        'focus:outline-none'
    );

    const hr = document.createElement('hr');

    input.addEventListener('focus', () => {
        hr.classList.remove('hr-default');
        hr.classList.add('hr-focus');
    });

    input.addEventListener('blur', () => {
        hr.classList.remove('hr-focus');
        hr.classList.add('hr-default');
    });

    const closeButton = document.createElement('button');
    closeButton.classList.add(
        'justify-center',
        'float-right',
        'rounded-md',
        'bg-indigo-600',
        'px-3',
        'py-1.5',
        'text-sm',
        'font-semibold',
        'leading-6',
        'text-white',
        'shadow-sm',
        'hover:bg-indigo-500',
        'focus-visible:outline',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
        'focus-visible:outline-indigo-600'
    );
    closeButton.textContent = '提交';

    hr.classList.add(
        'hr-default'
    );

    function checkInput(value) {
        const inputValid = validateInput(value);
        if (inputValid) {
            overlay.remove();
            document.body.style.overflow = 'auto';
            if (callback) {
                callback(input.value);
            }
        } else {
            input.value = '';
            input.focus();
            createMessageContainer("错误", "您的输入不符合要求，请重试！", "error")
        }
    }
    closeButton.addEventListener('click', () => {
        checkInput(input.value);
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkInput(input.value);
        }
    });

    dialog.appendChild(dialogTitle);
    dialog.appendChild(dialogContent);
    dialog.appendChild(input);
    dialog.appendChild(hr);
    dialog.appendChild(closeButton);

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    input.focus();
    input.value = defaultValue;
    input.select();
}

var messageContainers = []; // 保存所有提示框容器的数组
var containerSpacing = 20; // 提示框容器之间的垂直间距

function createMessageContainer(title, message, indicator) {
    var container = document.createElement('div');
    container.className = 'notice fixed top-10 right-10 flex items-start bg-white shadow-xl rounded pr-4 pl-4 pt-3 pb-4';

    var icon, colorClass;
    if (indicator === 'success') {
        icon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>';
        colorClass = 'text-green-500';
    } else if (indicator === 'error') {
        icon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
        colorClass = 'text-red-500';
    } else if (indicator === 'tips') {
        icon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>'
        colorClass = 'text-green-500';
    } else {
        icon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>';
        colorClass = 'text-gray-500';
    }

    var iconContainer = document.createElement('div');
    iconContainer.className = 'flex-shrink-0 mt-0.5 ' + colorClass;
    iconContainer.innerHTML = icon;

    var textContainer = document.createElement('div');
    textContainer.className = 'ml-4 mr-4';
    textContainer.innerHTML = '<h3 class="text-lg font-medium text-gray-900">' + title + '</h3><p class="text-sm text-gray-500">' + message + '</p>';

    var closeIconContainer = document.createElement('div');
    closeIconContainer.className = 'flex-shrink-0 text-gray-500 cursor-pointer';
    closeIconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>';

    container.appendChild(iconContainer);
    container.appendChild(textContainer);
    container.appendChild(closeIconContainer);

    closeIconContainer.addEventListener('click', function () {
        container.remove();
        messageContainers = messageContainers.filter(function (msg) {
            return msg !== container;
        });
        adjustMessageContainerPositions();
    });

    document.body.appendChild(container);
    messageContainers.push(container);
    adjustMessageContainerPositions();

    setTimeout(function () {
        container.remove();
        messageContainers = messageContainers.filter(function (msg) {
            return msg !== container;
        });
        adjustMessageContainerPositions();
    }, 5000);

    return container;
}

function adjustMessageContainerPositions() {
    var offset = 36;
    for (var i = 0; i < messageContainers.length; i++) {
        var container = messageContainers[i];
        container.style.top = offset + 'px';
        offset += container.offsetHeight + containerSpacing;
    }
}

var boardSize = 0;
var playerfirstFlag = '';
var playersecondFlag = '';
var playerfirstName = '';
var playersecondName = '';
var playerfirstColor = '';
var playersecondColor = '';

function showRules() {
    showCard('基本规则', 'Othello（黑白棋）的规则很简单。开始时，在棋盘正中有分属双方的各两个棋子交叉放置。\n' +
        '轮到自己时，把自己颜色的棋子放在棋盘的空格上，新落下的棋子与棋盘上已有的同色棋子间，对方被夹住的所有棋子都会翻转过来成为自己的棋子。', () => {
        showCard('落子规则', '只有在可以翻转棋子的地方才可以下子。\n' +
            '夹住的位置上必须全部是对手的棋子，不能有空格。', () => {
            showDialog('输入棋盘大小', '下面，请输入希望的棋盘大小（6到16之间的偶数）',  "8",validateBoardSize, (boardSizeValue) => {
                boardSize=parseInt(boardSizeValue);
                askForPlayerName(playerfirstFlag,"先手", "Player 1",() => {
                    pickColor ("选择颜色", "请先手玩家选择一个代表色，\n两个玩家的颜色不能相同。", "#4c97ef", (color)=> {
                        playerfirstColor = color;
                        askForPlayerName(playersecondFlag,"后手", "Player 2",() => {
                            pickColor ("选择颜色", "请后手玩家选择一个代表色，\n两个玩家的颜色不能相同。", "#086e24", (color)=> {
                                playersecondColor = color;
                                showCard('回合规则', '除非至少翻转了对手的一个棋子，否则就不能落子，由对手继续落子直到自己可以落子为止。\n' +
                                    '可以落子时就必须落子，不得弃权。', () => {
                                    showCard('胜负规则', '棋局持续下去，直到棋盘填满或者双方都无合法棋步可下。\n' +
                                        '结束后棋子数量多的一方获胜。', () => {
                                        showCard('开始游戏', '那么现在，游戏正式开始！', () => {
                                            startGame();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function askForPlayerName(playerFlag, playerType, defaultValue, callback) {
    showDialog(`输入${playerType}玩家名称`, `请输入${playerType}玩家的用户名（以“AI”开头的名称能召唤AI哦）。\n不超过20个字符，两玩家不能重名。`, defaultValue, validateUsername, (username) => {
        if (playerType === "先手") {
            playerfirstName = username;
            if (username.startsWith('AI')) {
                playerfirstFlag = "lowAI";
            } else if (username.startsWith('AI')) {
                playerfirstFlag = "AI";
            } else {
                playerfirstFlag = "human";
            }
        } else {
            playersecondName = username;
            if (username.startsWith('AI')) {
                playersecondFlag = "lowAI";
            } else if (username.startsWith('AI')) {
                playersecondFlag = "AI";
            } else {
                playersecondFlag = "human";
            }
        }
        if (callback) {
            callback();
        }
    });
}

function validateUsername(input) {
    return input.length <= 20 && input.trim().length > 0 && input !== playerfirstName && input !== playersecondName;
}

function validateBoardSize(input) {
    const boardSizeValue = parseInt(input);
    const isValid = !isNaN(boardSizeValue) && boardSizeValue >= 6 && boardSizeValue <= 16 && boardSizeValue % 2 === 0;
    return isValid;
}

function generateChessboard(boardSize) {
    const chessboardArea = document.getElementById('chessboard-area');

    // 创建棋盘容器
    const chessboardContainer = document.createElement('div');
    chessboardContainer.classList.add('chessboard-container');
    chessboardContainer.id = 'chessboard-container';

    const gridTemplate = `repeat(${boardSize}, 1fr)`;
    chessboardContainer.style.gridTemplateColumns = gridTemplate;
    chessboardContainer.style.gridTemplateRows = gridTemplate;
    chessboardContainer.style.gridAutoRows = '1fr';
    chessboardContainer.style.gridAutoColumns = '1fr';
    chessboardContainer.style.display = 'grid';

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            // 创建网格
            const grid = document.createElement('div');
            grid.classList.add('grid');
            grid.id = `${i}-${j}-grid`;

            // 创建实际棋子
            const chessPiece = document.createElement('div');
            chessPiece.classList.add('pattern');
            chessPiece.id = `${i}-${j}-pattern`;

            // 将实际棋子添加到网格中
            grid.appendChild(chessPiece);

            // 将网格添加到棋盘容器中
            chessboardContainer.appendChild(grid);
        }
    }

    // 将棋盘容器添加到棋盘区域内
    chessboardArea.appendChild(chessboardContainer);
}

function errorFall(i, j) {
    const element = document.getElementById(`${i}-${j}-pattern`);
    if (element) {
        element.style.backgroundColor = "#ef4444";
        createMessageContainer("错误", "这里不能落子，请换一个位置重试！", "error");
        element.classList.add("shake-lr");

        setTimeout(() => {
            element.style.backgroundColor = element.style.backgroundColor = getColorForBoardElement(board[i][j]);
            element.classList.remove("shake-lr");
        }, 800);
    }
}

function couldFallTips(coordinates) {

    // 遍历坐标数组
    coordinates.forEach((coord) => {
        const [i, j] = coord;
        const element = document.getElementById(`${i}-${j}-pattern`);

        element.style.backgroundColor = '#fdfd03';
        element.classList.add('jello-vertical');

        // 等待动画结束后恢复原始颜色并移除 jello-vertical 类
        setTimeout(() => {
            element.style.backgroundColor = getColorForBoardElement(board[i][j]);
            element.classList.remove('jello-vertical');
        }, 1000);

    });
}

function successFall(i, j, color) {
    const element = document.getElementById(`${i}-${j}-pattern`);

    if (element) {

        // 设置新颜色和动画效果
        element.style.backgroundColor = color;
        element.classList.add('pulsate-fwd','board');

        // 等待动画结束
        setTimeout(() => {
            element.classList.remove('pulsate-fwd');
        }, 1000);

    }
}

function startGame(){
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'inline';
    generateChessboard(boardSize);
    const gameScreen = document.getElementById('game-screen');
    gameScreen.style.display = 'flex';
    gameScreen.style.flexWrap = 'wrap';
    boardInit();
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const pattern = document.getElementById(`${i}-${j}-pattern`);
            pattern.addEventListener('click', (function () {
                    getHumanMove(i, j);
            }));
        }
    }
    document.documentElement.style.setProperty('--board-size', boardSize);
    document.getElementById('first-score-color').style.backgroundColor = playerfirstColor;
    document.getElementById('second-score-color').style.backgroundColor = playersecondColor;
    showScoreNumber();
    setTurnNotice();
    createMessageContainer("获取提示","点击右下角按钮可以获取提示","tips");
    if (playerfirstFlag === "lowAI" || playersecondFlag === "lowAI") {
        generateWeight();
    }
    noticeAIPlayer();
}

var boardWeight = [];

function getRandomInt(min, max) {
    // 生成 min 和 max 之间的随机整数，包括 min 和 max
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getLowAIMove(player) {
    document.getElementById('floating-div').style.display = 'block';
    let legalPositions = getLegalPositions(player);

    // 寻找最小权重
    let minWeight = Infinity;
    for (let i = 0; i < legalPositions.length; i++) {
        const position = legalPositions[i];
        const [row, col] = position;

        // 检查当前位置的权重
        if (boardWeight[row][col] < minWeight) {
            minWeight = boardWeight[row][col];
        }
    }

    // 收集所有最小权重的位置
    const bestMoves = [];
    for (let i = 0; i < legalPositions.length; i++) {
        const position = legalPositions[i];
        const [row, col] = position;

        // 如果当前位置的权重等于最小权重，将其添加到最佳移动列表中
        if (boardWeight[row][col] === minWeight) {
            bestMoves.push(position);
        }
    }

    // 随机选择一个最佳移动
    const randomIndex = getRandomInt(0, bestMoves.length - 1);
    const [row, col] = bestMoves[randomIndex];

    makeMove(row, col, player);
    player = -player;
    legalPositions = getLegalPositions(player);
    if (legalPositions.length === 0) {
        player = -player;
        legalPositions = getLegalPositions(player);
        if (legalPositions.length === 0) {
            document.getElementById('floating-div').style.display = 'none';
            gameOver();
            return;
        }
        createMessageContainer("连动！","lowAI杀疯了，还是它的回合！","tips");
        noticeAIPlayer();
        return;
    }
    gameState = gameState === "First" ? "Second" : "First"; //转换持方
    noticeAIPlayer();
    setTurnNotice();

    document.getElementById('floating-div').style.display = 'none';
}

function getAIMove(player) {
    getLowAIMove(player);
}

function setCircle(index, u, power) {
    let start = u / 2 - 1 - index;
    let end = u / 2 + index;

    for (let i = start; i <= end; i++) {
        boardWeight[i][start] = power;
        boardWeight[i][end] = power;
        boardWeight[start][i] = power;
        boardWeight[end][i] = power;
    }
}

function setCorner(x, y, n, power) {
    boardWeight[x][y] = n / 2 + 1;
    boardWeight[x][y + 1] = n / 2 + 1;
    boardWeight[x + 1][y] = n / 2 + 1;
}

function generateWeight() {
    boardWeight = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

    let halfSize = boardSize / 2;
    let power = Math.floor(halfSize) + 2;

    for (let i = 0; i < halfSize; i++) {
        setCircle(i, boardSize, power);
        power = 2;
    }

    setCorner(0, 0, boardSize, 1);
    setCorner(0, boardSize - 2, boardSize, 1);
    setCorner(boardSize - 2, 0, boardSize, 1);
    setCorner(boardSize - 2, boardSize - 2, boardSize, 1);
    boardWeight[0][0] = 1;
    boardWeight[0][boardSize - 1] = 1;
    boardWeight[boardSize - 1][0] = 1;
    boardWeight[boardSize - 1][boardSize - 1] = 1;
}

function showScoreNumber() {
    document.getElementById('first-score-number').textContent = playerfirstScore;
    document.getElementById('second-score-number').textContent = playersecondScore;
}

// 全局变量二维数组作为棋盘
var board = [];
var playerfirstScore = 2;
var playersecondScore = 2;

// 初始化棋盘
function boardInit() {
    board = Array.from(Array(boardSize), () => new Array(boardSize).fill(0));
    playerfirstScore = 2;
    playersecondScore = 2;
    const center = boardSize / 2;

    board[center - 1][center - 1] = 1;
    board[center][center] = 1;
    board[center - 1][center] = -1;
    board[center][center - 1] = -1;

    // 给对应ID的pattern元素添加类，并设置背景颜色
    document.getElementById(`${center - 1}-${center - 1}-pattern`).classList.add('board');
    document.getElementById(`${center - 1}-${center - 1}-pattern`).style.backgroundColor = playerfirstColor;

    document.getElementById(`${center}-${center}-pattern`).classList.add('board');
    document.getElementById(`${center}-${center}-pattern`).style.backgroundColor = playerfirstColor;

    document.getElementById(`${center - 1}-${center}-pattern`).classList.add('board');
    document.getElementById(`${center - 1}-${center}-pattern`).style.backgroundColor = playersecondColor;

    document.getElementById(`${center}-${center - 1}-pattern`).classList.add('board');
    document.getElementById(`${center}-${center - 1}-pattern`).style.backgroundColor = playersecondColor;
}

// 获取先手或后手可以下的合法位置列表
function getLegalPositions(player) {
    const legalPositions = [];

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === 0) {
                if (isValidMove(i, j, player)) {
                    legalPositions.push([i, j]);
                }
            }
        }
    }

    return legalPositions;
}

// 判断落子是否合法
function isValidMove(row, col, player) {
    if (board[row][col] !== 0) {
        return false;
    }
    const opponent = -player;
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];

    for (const [dx, dy] of directions) {
        let x = row + dx;
        let y = col + dy;
        let foundOpponent = false;

        while (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
            if (board[x][y] === opponent) {
                foundOpponent = true;
            } else if (board[x][y] === player) {
                if (foundOpponent) {
                    return true;
                }
                break;
            } else {
                break;
            }

            x += dx;
            y += dy;
        }
    }

    return false;
}

var gameState = "First"; // 游戏状态，该先手还是后手

function noticeAIPlayer() {
    let player = gameState === "First" ? 1 : -1;
    if (gameState === "First") {
        if (playerfirstFlag === "human") {
            return;
        } else if (playerfirstFlag === "AI") {
            getAIMove(player);
        } else {
            setTimeout(() => {
                getLowAIMove(player);
            }, 1500);
        }
    } else {
        if (playersecondFlag === "human") {
            return;
        } else if (playersecondFlag === "AI") {
            getAIMove(player);
        } else {
            setTimeout(() => {
                getLowAIMove(player);
            }, 1500);
        }
    }
}

function getHumanMove(i,j) {
    if ((gameState !== "First" && gameState !== "Second") || (gameState === "First" && playerfirstFlag !== "human") || (gameState === "Second" && playersecondFlag !== "human")) {
        return;
    }
    let player = gameState === "First" ? 1 : -1;
    let legalPositions = getLegalPositions(player);
    if (legalPositions.some(([x, y]) => x === i && y === j)) {
        makeMove(i, j, player);
        player = -player;
        legalPositions = getLegalPositions(player);
        if (legalPositions.length === 0) {
            player = -player;
            legalPositions = getLegalPositions(player);
            if (legalPositions.length === 0) {
                gameOver();
                return;
            }
            createMessageContainer("连动！","对方无处下子，还是你的回合！","tips");
            return;
        }
        gameState = gameState === "First" ? "Second" : "First"; //转换持方
        noticeAIPlayer();
        setTurnNotice();
    } else {
        // 提示非法落子
        errorFall(i, j);
    }
}

var colorPicked = "#000000";

function pickColor (title, content, defaultColor, callback) {
    colorPicked = defaultColor;
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const dialog = document.createElement('div');
    dialog.classList.add(
        'color-dialog',
    );

    const dialogTitle = document.createElement('h2');
    dialogTitle.classList.add('text-lg', 'font-bold', 'mb-4');
    dialogTitle.textContent = title;

    const dialogContent = document.createElement('p');
    dialogContent.classList.add('mb-6');
    dialogContent.textContent = content;

    const color = document.createElement('div');
    color.id = 'color-picker';

    const closeButton = document.createElement('button');
    closeButton.classList.add(
        'justify-center',
        'float-right',
        'rounded-md',
        'bg-indigo-600',
        'px-3',
        'py-1.5',
        'mt-2',
        'text-sm',
        'font-semibold',
        'leading-6',
        'text-white',
        'shadow-sm',
        'focus:outline-none',
        'hover:bg-indigo-500',
        'focus-visible:outline',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
        'focus-visible:outline-indigo-600'
    );
    closeButton.textContent = '确定';

    closeButton.addEventListener('click', () => {
        checkInput();
    });

    function checkInput() {
        value = colorPicked;
        const inputValid = (value !== playerfirstColor && value !== playersecondColor && value !== "#000000" && value !== "#fdfd03" && value !== "#fdfd03")
        if (inputValid) {
            closeDialog(callback);
        } else {
            createMessageContainer("错误", "您选择的颜色不符合要求，请重试！", "error");
        }
    }

    dialog.appendChild(dialogTitle);
    dialog.appendChild(dialogContent);
    dialog.appendChild(color);
    dialog.appendChild(closeButton);
    overlay.appendChild(dialog);

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    closeButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkInput();
        }
    });

    // 添加按键事件监听器
    document.body.addEventListener('keydown', handleKeyDown);

    function closeDialog(callback) {
        overlayElements = document.getElementsByClassName('overlay');
        while (overlayElements.length > 0) {
            overlayElements[0].remove();
        }
        document.body.style.overflow = 'auto';
        document.body.removeEventListener('keydown', handleKeyDown);
        if (callback) {
            callback(colorPicked);
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            document.querySelector('.dialog button').click();
        }
    }

    var colorPicker = new iro.ColorPicker("#color-picker", {
        //设置颜色选择器的大小
        //width: 320,
        //初始颜色设置
        color: colorPicked
    });

    colorPicker.on('input:end', function(color) {
        colorPicked = color.hexString;
    });

    closeButton.focus();
}

function getTips() {
    if ((gameState !== "First" && gameState !== "Second" && gameState !== "Over") || (gameState === "First" && playerfirstFlag !== "human") || (gameState === "Second" && playersecondFlag !== "human")) {
        return;
    }
    if (gameState === "Over") {

        const elements = document.getElementsByClassName('pattern');

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.style.backgroundColor = "white";
            element.classList.remove('board');
        }
        boardInit();
        showScoreNumber();
        setTurnNotice();
        gameState = "First";
        noticeAIPlayer();
        document.getElementById('turn-notice').textContent = "当前行动";
        document.getElementById('tips-btn').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">' +
            '<path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />' +
            '</svg>';
        return;
    }
    let player = gameState === "First" ? 1 : -1;
    let legalPositions = getLegalPositions(player);
    if (legalPositions.length === 0) {
        createMessageContainer("温馨提示","你现在无处下子！","error");
        return;
    }
    createMessageContainer("提示","已显示当前所有可下位置","tips");
    couldFallTips(legalPositions);
}

// 在指定位置落子，并翻转对方棋子
function makeMove(row, col, player) {
    if (player === 1) {
        successFall(row, col, playerfirstColor);
    } else {
        successFall(row, col, playersecondColor);
    }

    const opponent = -player;
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];

    board[row][col] = player;
    let flippedPieces = [];

    for (const [dx, dy] of directions) {
        let x = row + dx;
        let y = col + dy;
        let foundOpponent = false;
        let currentFlippedPieces = [];

        while (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
            if (board[x][y] === opponent) {
                foundOpponent = true;
                currentFlippedPieces.push([x, y]);
            } else if (board[x][y] === player) {
                if (foundOpponent) {
                    flippedPieces.push(...currentFlippedPieces);
                }
                break;
            } else {
                break;
            }

            x += dx;
            y += dy;
        }
    }

    for (const [i, j] of flippedPieces) {
        board[i][j] = player;
        const patternId = `${i}-${j}-pattern`;
        const patternElement = document.getElementById(patternId);

        if (patternElement) {
            patternElement.style.backgroundColor = (player === 1) ? playerfirstColor : playersecondColor;
        }
    }

    if (player === 1) {
        playerfirstScore += flippedPieces.length + 1;
        playersecondScore -= flippedPieces.length;
    } else {
        playerfirstScore -= flippedPieces.length;
        playersecondScore += flippedPieces.length + 1;
    }

    showScoreNumber();
}

function setTurnNotice() {
    document.getElementById('turn-player').classList.remove('fade-in-game');
    document.getElementById('turn-player').classList.add('fade-out-game');
    setTimeout(() => {
        // 将特效类重新添加到元素上
        const turnPlayerElement = document.getElementById('turn-player');
        if(gameState === "First") {
            turnPlayerElement.textContent = playerfirstName;
            turnPlayerElement.style.color = playerfirstColor;
        } else {
            turnPlayerElement.textContent = playersecondName;
            turnPlayerElement.style.color = playersecondColor;
        }
        turnPlayerElement.classList.add('fade-in-game');
        turnPlayerElement.classList.remove('fade-out-game');
    }, 10);
}

function changeColorForPatterns(color) {
    const elements = document.getElementsByClassName('pattern');

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.style.backgroundColor = color;
    }

    setTimeout(() => {
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const id = element.id;
            const [row, col] = id.split('-').map(Number);
            element.style.backgroundColor = getColorForBoardElement(board[row][col]);
        }
    }, 3000);
}

function getColorForBoardElement(value) {
    if (value === 1) {
        return playerfirstColor;
    } else if (value === -1) {
        return playersecondColor;
    } else {
        return 'white';
    }
}

// 计算得分等逻辑
function gameOver() {
    gameState = "Over";
    // 这里需要根据棋盘状态计算得分等逻辑
    document.getElementById('turn-notice').textContent = "获胜者";
    document.getElementById('turn-player').classList.remove('fade-in-game');
    document.getElementById('turn-player').classList.add('fade-out-game');
    createMessageContainer("游戏结束","胜负已分！可点击右下角按钮再来一局！","success");
    setTimeout(() => {
        // 将特效类重新添加到元素上
        const turnPlayerElement = document.getElementById('turn-player');
        if (playerfirstScore > playersecondScore) {
            turnPlayerElement.textContent = playerfirstName;
            turnPlayerElement.style.color = playerfirstColor;
            changeColorForPatterns(playerfirstColor);
        } else if (playerfirstScore < playersecondScore) {
            turnPlayerElement.textContent = playersecondName;
            turnPlayerElement.style.color = playersecondColor;
            changeColorForPatterns(playersecondColor);
        } else {
            turnPlayerElement.textContent = "平局";
            turnPlayerElement.style.color = "#374151";
            changeColorForPatterns("#374151");
        }
        turnPlayerElement.classList.add('fade-in-game');
        turnPlayerElement.classList.remove('fade-out-game');
    }, 10);
    document.getElementById('tips-btn').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">' +
        '<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />' +
        '</svg>';
}



