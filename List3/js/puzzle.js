let canvas;
let stage;
let rows;
let columns;
let img;
let pieces;
let puzzleWidth;
let puzzleHeight;
let pieceWidth;
let pieceHeight;
let blankPiece;
let highlightedPiece;
let scale;
let running = false;
let TYPE = {
    BLANK: "blank",
    ADJACENT: "adjacent",
    DISTANT: "distant"
};

function init() {
    let url = new URLSearchParams(window.location.search);
    let c = url.get("columns");
    let r = url.get("rows");
    columns = c > 30 ? 30 : (c < 2 ? 2 : c);
    rows = r > 30 ? 30 : (r < 2 ? 2 : r);
    img = new Image();
    img.src = "img/" + url.get("img");
    img.addEventListener('load', initCanvas, false);
    window.onresize = setCanvas;
}

function initCanvas() {
    canvas = document.getElementById('canvas');
    stage = canvas.getContext('2d');
    canvas.style.border = "1px solid black";
    setCanvas();
}

function setCanvas() {
    let targetWidth = window.innerWidth - 100;
    if (targetWidth > 1000) {
        targetWidth = 1000;
    }
    scale = (img.width > targetWidth) ? targetWidth / img.width : 1;
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    pieceWidth = Math.floor(canvas.width / columns);
    pieceHeight = Math.floor(canvas.height / rows);
    puzzleWidth = pieceWidth * columns;
    puzzleHeight = pieceHeight * rows;
    canvas.width = puzzleWidth;
    canvas.height = puzzleHeight;
    running ? drawPuzzle() : drawImage();
}

function drawImage() {
    stage.globalAlpha = 1.0;
    stage.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}

function run() {
    running = true;
    highlightedPiece = null;
    buildPuzzle();
    shufflePuzzle();
    drawPuzzle();
    checkWin();
    canvas.onmousedown = onPuzzleClick;
    canvas.onmousemove = onPuzzleHover;
    canvas.onmouseleave = onPuzzleHover;
}

function buildPuzzle() {
    pieces = Array(rows);
    for (let i = 0; i < rows; i++) {
        pieces[i] = new Array(columns);
        for (let j = 0; j < columns; j++) {
            let piece = {};
            piece.targetX = j;
            piece.targetY = i;
            pieces[i][j] = piece;
            if (i === 0 && j === 0) {
                blankPiece = piece;
            }
        }
    }
}

function shufflePuzzle() {
    pieces = shuffleArray(pieces);
    stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let piece = pieces[i][j];
            piece.x = j;
            piece.y = i;
        }
    }
    setTypes();
}

function shuffleArray(array) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let k = parseInt((Math.random() * rows) + "");
            let l = parseInt((Math.random() * columns) + "");
            let tmp = array[i][j];
            array[i][j] = array[k][l];
            array[k][l] = tmp;
        }
    }
    return array;
}

function setTypes() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            pieces[i][j].type = TYPE.DISTANT;
        }
    }
    let x = blankPiece.x;
    let y = blankPiece.y;
    pieces[y][x].type = TYPE.BLANK;
    if (y !== rows - 1) {
        pieces[y + 1][x].type = TYPE.ADJACENT;
    }
    if (y !== 0) {
        pieces[y - 1][x].type = TYPE.ADJACENT;
    }
    if (x !== columns - 1) {
        pieces[y][x + 1].type = TYPE.ADJACENT;
    }
    if (x !== 0) {
        pieces[y][x - 1].type = TYPE.ADJACENT;
    }
}

function drawPuzzle() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            drawPiece(pieces[i][j]);
        }
    }
}

function drawPiece(piece) {
    if (piece.type === TYPE.BLANK) {
        stage.globalAlpha = .8;
        stage.fillStyle = "#ff0000";
        stage.fillRect(piece.x * pieceWidth, piece.y * pieceHeight, pieceWidth, pieceHeight);
    } else {
        stage.globalAlpha = 1.0;
        stage.drawImage(img, piece.targetX * pieceWidth / scale, piece.targetY * pieceHeight / scale, pieceWidth / scale, pieceHeight / scale,
            piece.x * pieceWidth, piece.y * pieceHeight, pieceWidth, pieceHeight);
    }
    stage.strokeRect(piece.x * pieceWidth, piece.y * pieceHeight, pieceWidth, pieceHeight);
}

function onPuzzleClick(e) {
    swapPieces(getCurrentPiece(e));
}

function getCurrentPiece(e) {
    let x = Math.floor(e.offsetX * columns / canvas.width);
    let y = Math.floor(e.offsetY * rows / canvas.height);
    return 0 <= y && y < rows && 0 <= x && x < columns ? pieces[y][x] : null;

}

function swapPieces(piece) {
    if (piece == null || piece.type !== TYPE.ADJACENT) {
        return;
    }
    stage.clearRect(piece.x * pieceWidth, piece.y * pieceHeight, pieceWidth, pieceHeight);
    pieces[piece.y][piece.x] = blankPiece;
    pieces[blankPiece.y][blankPiece.x] = piece;
    let tmpX = blankPiece.x;
    let tmpY = blankPiece.y;
    blankPiece.x = piece.x;
    blankPiece.y = piece.y;
    piece.x = tmpX;
    piece.y = tmpY;
    drawPiece(piece);
    drawPiece(blankPiece);
    setTypes();
    checkWin();
}


function checkWin() {
    let win = true;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let piece = pieces[i][j];
            if (piece.x !== piece.targetX || piece.y !== piece.targetY) {
                win = false;
            }
        }
    }
    if (win) {
        setTimeout(merge, 500);
    }
}

function merge() {
    running = false;
    canvas.onmousedown = null;
    canvas.onmousemove = null;
    canvas.onmouseleave = null;
    drawImage();
}

function onPuzzleHover(e) {
    let piece = getCurrentPiece(e);
    if (highlightedPiece !== null) {
        drawPiece(highlightedPiece);
    }
    if (piece !== null && piece.type === TYPE.ADJACENT) {
        stage.globalAlpha = 0.1;
        stage.fillStyle = '#ffffff';
        stage.fillRect(piece.x * pieceWidth, piece.y * pieceHeight, pieceWidth, pieceHeight);
        stage.strokeRect(piece.x * pieceWidth, piece.y * pieceHeight, pieceWidth, pieceHeight);
        highlightedPiece = piece;
    } else {
        highlightedPiece = null;
    }
}


