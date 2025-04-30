// startGame.js
import { Board } from "./board.js";

window.onload = () => {
    const startButton = document.getElementById('start-game');
    const instructions = document.getElementById('instructions');
    const instructionText = document.getElementById('instruction'); // Refers to the paragraph for instructions
    const boardContainer = document.getElementById('board');
    const numpadInstructions = document.getElementById('numpad-instructions');
    const numpadControls = document.getElementById('numpad-controls');

    let board = null;

    startButton.addEventListener("click", () => {
        console.log("Start button clicked!");

        // Update instruction
        instructionText.innerText = "Click on a tile to choose starting position for the player.";


        // Hide start button and show UI elements
        startButton.style.display = "none";
        instructions.classList.remove("hidden");
        numpadInstructions.classList.remove("hidden");
        numpadControls.classList.remove("hidden");

        
        // Initialize board
        board = new Board(20, 20);
        board.createBoard();
        boardContainer.style.display = "grid";
        boardContainer.classList.remove("hidden");

        // Place the player on click
        boardContainer.addEventListener("click", function placePlayerFirst(event) {
            if (event.target.classList.contains("tile")) {
                const x = parseInt(event.target.dataset.x);
                const y = parseInt(event.target.dataset.y);

                board.placePlayer(x, y);

                instructionText.innerText = "Use Numpad to move. Click empty tile to add an organism.";
                boardContainer.removeEventListener("click", placePlayerFirst);

                board.enableGame(); // Allows movement
            }
        });

        // Numpad controls
        document.addEventListener("keydown", (event) => {
            const directionMap = {
                "Numpad7": [-1, -1], "Numpad8": [0, -1], "Numpad9": [1, -1],
                "Numpad4": [-1, 0],  "Numpad5": [0, 0],  "Numpad6": [1, 0],
                "Numpad1": [-1, 1],  "Numpad2": [0, 1],  "Numpad3": [1, 1],
            };

            if (board?.player && directionMap[event.code]) {
                const [dx, dy] = directionMap[event.code];
                board.player.setNextMove(dx, dy);
                board.makeTurn();
            }
        });
    });
};
