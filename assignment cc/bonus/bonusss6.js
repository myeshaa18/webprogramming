// Define RGB colors
const colors = [
    "rgb(255, 0, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 0, 255)",
    "rgb(255, 255, 0)",
    "rgb(255, 0, 255)",
    "rgb(0, 255, 255)",
];

let correctColor;
let score = 0;
let lives = 3;

// Function to generate a random number
function randomNum(num) {
    return Math.floor(Math.random() * num);
}

// Function to generate RGB value
function generateRGB() {
    return colors[randomNum(colors.length)];
}

// Function to generate random color options
function generateOptions() {
    const options = [];
    while (options.length < 3) {
        const color = generateRGB();
        if (!options.includes(color)) {
            options.push(color);
        }
    }
    return options;
}

// Function to display RGB value and color options
function displayGame() {
    correctColor = generateRGB();
    const options = generateOptions();
    options.splice(randomNum(options.length + 1), 0, correctColor);

    const rgbValue = document.getElementById("rgb-value");
    rgbValue.textContent = correctColor;

    const colorOptions = document.getElementById("color-options");
    colorOptions.innerHTML = "";
    options.forEach(option => {
        const div = document.createElement("div");
        div.style.backgroundColor = option;
        div.classList.add("option");
        div.addEventListener("click", () => {
            if (option === correctColor) {
                score++;
                document.getElementById("score-value").textContent = score;
                displayGame();
                showMessage("Correct!", "green");
            } else {
                lives--;
                if (lives === 0) {
                    endGame();
                } else {
                    showMessage(`Wrong! Lives left: ${lives}`, "red");
                }
            }
        });
        colorOptions.appendChild(div);
    });
}

// Function to show message
function showMessage(text, color) {
    const message = document.getElementById("message");
    message.textContent = text;
    message.style.color = color;
}

// Function to end the game
function endGame() {
    const message = `Game Over! Final Score: ${score}`;
    showMessage(message, "black");
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.style.display = "block";
}

// Event listener for restart button
document.getElementById("restart-btn").addEventListener("click", () => {
    score = 0;
    lives = 3;
    document.getElementById("score-value").textContent = score;
    document.getElementById("message").textContent = "";
    document.getElementById("restart-btn").style.display = "none";
    displayGame();
});

// Start the game
displayGame();