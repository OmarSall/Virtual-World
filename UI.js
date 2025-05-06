// Graphics manipulation

export function showBoardContainer(boardContainer) {
    boardContainer.style.display = "grid";
    boardContainer.classList.remove("hidden"); 
}

// Graphics manipulation

export function initializeGameUI(instructionText, startButton, instructions, numpadInstructions, numpadControls) {
    instructionText.innerText = "Click on a tile to choose starting position for the player.";
    startButton.style.display = "none";
    instructions.classList.remove("hidden");
    numpadInstructions.classList.remove("hidden");
    numpadControls.classList.remove("hidden");
}