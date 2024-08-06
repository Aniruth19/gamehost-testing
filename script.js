const box = document.getElementById('box');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');

let score = 0;
let timer;
let timeLeft = 10;

function startGame() {
    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    box.style.display = 'block';
    moveBox();
    startButton.disabled = true;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function moveBox() {
    const container = document.getElementById('game-container');
    const maxX = container.clientWidth - box.clientWidth;
    const maxY = container.clientHeight - box.clientHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    box.style.left = `${randomX}px`;
    box.style.top = `${randomY}px`;
}

box.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    moveBox();
});

function endGame() {
    clearInterval(timer);
    box.style.display = 'none';
    startButton.disabled = false;
    alert(`Game Over! Your final score is ${score}`);
}

startButton.addEventListener('click', startGame);
