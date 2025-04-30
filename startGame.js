// startGame.js
// Entry point script that initializes the game
import { Board } from "board.js";

window.onload = () => {
    const startButton = document.getElementById('start-game');
    const instructions = document.getElementById('instructions');
    const instructionText = document.getElementById('instruction'); // Refers to the paragraph for instructions
    const boardContainer = document.getElementById('board');
    const numpadInstructions = document.getElementById('numpad-instructions');
    const numpadControls = document.getElementById('numpad-controls');

    // Initializing the board container as null, will be assigned later
    let board = null;

    startButton.addEventListener("click", () => {
        // Hide the start button and show instructions
        startButton.style.display = "none";  // Hide start button
        instructions.classList.remove("hidden");  // Show instructions
        numpadInstructions.classList.remove("hidden");
        numpadControls.classList.remove("hidden");

        // Update the instruction text
        instructionText.innerText = "Click on a tile to choose starting position for the player.";

        // Initialize the board
        board = new Board(20, 20); // Assuming Board constructor takes the size of the grid
        board.createBoard();

        // Show the board
        boardContainer.style.display = "grid"; // Make board visible
        boardContainer.classList.remove("hidden");

        // Set up click event to place the player
        boardContainer.addEventListener("click", function placePlayerFirst(event) {
            if (event.target.classList.contains("tile")) {
                const x = parseInt(event.target.dataset.x);
                const y = parseInt(event.target.dataset.y);

                // Place the player at the chosen coordinates
                board.placePlayer(x, y);

                // Update instruction after placing the player
                instructionText.innerText = "Use Numpad to move the player. Click empty tile to add an organism.";

                // Remove the click event listener for placing the player
                boardContainer.removeEventListener("click", placePlayerFirst);

                // Enable the game (allow movement)
                board.enableGame();
            }
        });
    });
};
