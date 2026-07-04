const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function initializeGame() {
    console.log("Kingdom Defense has started!");

    draw();
}

function draw() {
    // Background
    ctx.fillStyle = "#4d7c43";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Kingdom Defense", canvas.width / 2, 120);

    // Subtitle
    ctx.font = "24px Arial";
    ctx.fillText("Game Engine Initialized", canvas.width / 2, 180);
}

initializeGame();
