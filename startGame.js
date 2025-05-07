import { Board } from "./board.js";
import { organismClasses, playerClass } from "./organismCreation.js";
import { showBoardContainer, initializeGameUI } from "./UI.js";

window.onload = () => {
    const startButton = document.getElementById("start-game");
    const instructions = document.getElementById("instructions");
    const instructionText = document.getElementById("instruction");
    const boardContainer = document.getElementById("board");
    const numpadInstructions = document.getElementById("numpad-instructions");
    const numpadControls = document.getElementById("numpad-controls");
    const organismPopup = document.getElementById("organismPopup");

    let board = null;
    let selectedTile = null;
    let placePlayerFirstHandler = null;

    startButton.addEventListener("click", () => {
        console.log("Start button clicked!");

        initializeGameUI(instructionText, startButton, instructions, numpadInstructions, numpadControls);

        try {
            board = new Board(20, 20);
            board.createBoard();
        } catch (error) {
            console.error("Failed to initialize the board:", error);
            alert("Board failed to load. Check the console for details.");
        }
        
        showBoardContainer(boardContainer);

        placePlayerFirstHandler = (event) => 
            placePlayerFirst(event, board, boardContainer, instructionText, onBoardClick, placePlayerFirstHandler);

        boardContainer.addEventListener("click", placePlayerFirstHandler);
    });

    // Handle organism creation popup clicks
    organismPopup.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-org]");
        if (button) {
            const orgName = button.getAttribute("data-org");
            addOrganism(orgName);
            hidePopup();
        } else if (event.target.id === "closePopup") {
            hidePopup();
        }
    });

    function onBoardClick(event) {
        if (!event.target.classList.contains("tile")) {
            return;
        }
        const x = parseInt(event.target.dataset.x);
        const y = parseInt(event.target.dataset.y);
        const tile = board.getTile(x, y);

        if (!tile || !tile.isEmpty()) {
            return;
        }
        selectedTile = tile;
        showOrganismPopup();
    }

    function showOrganismPopup() {
        try {
            console.log("Showing organism popup");

            organismPopup.innerHTML = `
                <button class="close-button" id="closePopup">×</button>
                <h2>Choose organism to create</h2>
                <div id="organism-error" class="error-message hidden"></div>
                <div class="organism-options">
                    ${organismClasses.map(({ name, classRef, image }) => `
                        <button data-org="${name}" data-image="${image}">
                            <img src="${image}" alt="${name}">
                            <span>${name.replace(/([A-Z])/g, " $1").trim()}</span>
                        </button>
                    `).join("")}
                </div>
            `;

            organismPopup.classList.remove("hidden");
        } catch (error) {
            console.error("Error showing organism popup:", error);
        }
    }

    function hidePopup() {
        organismPopup.classList.add("hidden");
        const errorElement = document.getElementById("organism-error");
        if (errorElement) {
            errorElement.classList.add("hidden");
            errorElement.textContent = "";
        }
    }

    function showError(message) {
        const errorElement = document.getElementById("organism-error");
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove("hidden");
            setTimeout(() => {
                errorElement.classList.add("hidden");
            }, 3000);
        }
    }

    function addOrganism(orgName) {
        try {
            const entry = organismClasses.find(({ name }) => name === orgName);
            if (!entry) {
                console.error(`Organism class not found for ${orgName}`);
                showError("Selected organism type not found.");
                return;
            }
            
            if (!selectedTile || !selectedTile.isEmpty()) {
                console.error("Invalid tile selection or tile is not empty");
                showError("Please select an empty tile first.");
                return;
            }

            const organism = new entry.classRef(board, entry.image);
            selectedTile.setOrganism(organism);
            board.organisms.push(organism);
            // board.sortOrganismsByInitiative();
        } catch (error) {
            console.error(`Error adding organism ${orgName}:`, error);
        }
    }
};

function placePlayerFirst(event, board, boardContainer, instructionText, onBoardClick, handler) {
    if (!event.target.classList.contains("tile")) return;

    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);

    const tile = board.getTile(x, y);
    if (!tile || !tile.isEmpty()) return;

    if (board.player) return;

    const player = new playerClass.classRef(board, "./images/player.svg");
    tile.setOrganism(player);
    board.organisms.push(player);
    board.player = player;

    instructionText.innerText = "Use Numpad to move. Click empty tile to add an organism.";

    boardContainer.removeEventListener("click", handler); // This line now works via the stored reference

    board.enableGame();

    setTimeout(() => {
        boardContainer.addEventListener("click", onBoardClick);
        console.log("Added click listener for organism creation");
    }, 100);
}