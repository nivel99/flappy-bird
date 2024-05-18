const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Cargar imágenes
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = 'bird.png';
bg.src = 'bg.png';
fg.src = 'fg.png';
pipeNorth.src = 'pipeNorth.png';
pipeSouth.src = 'pipeSouth.png';

// Algunas variables
let gap = 85;
let constant;

let bX = 10;
let bY = 150;

let gravity = 0.5;
let score = 0;

// Archivos de audio
const fly = new Audio();
const scor = new Audio();

fly.src = 'https://www.soundjay.com/button/sounds/button-16.mp3';
scor.src = 'https://www.soundjay.com/button/sounds/button-20.mp3';

// Al presionar una tecla
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        moveUp();
    }
});

function moveUp() {
    bY -= 25;
    fly.play();
}

// Coordenadas de las tuberías
let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
};

// Variable para controlar el bucle del juego
let gameRunning = true;

// Dibujar imágenes
function draw() {
    if (!gameRunning) return;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el fondo
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // Detectar colisión
        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && 
            (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) ||
            bY + bird.height >= canvas.height - fg.height) {
            gameRunning = false; // Detener el bucle del juego
            alert('¡Juego terminado! Puntuación: ' + score);
            document.location.reload();
        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height);
    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = '#000';
    ctx.font = '20px Verdana';
    ctx.fillText('Puntuación : ' + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw();
