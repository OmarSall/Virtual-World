import { Board } from "./board.js";

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

                // Remove any existing click listener first
                boardContainer.removeEventListener("click", onBoardClick);
                // Add listener for adding organisms on empty tile click
                boardContainer.addEventListener("click", onBoardClick);
                console.log("Added click listener for organism creation");
            }
        });
    });

    function onBoardClick(event) {
        console.log("Board clicked!");
        if (!event.target.classList.contains("tile")) {
            console.log("Click target is not a tile");
            return;
        }

        const x = parseInt(event.target.dataset.x);
        const y = parseInt(event.target.dataset.y);
        console.log(`Clicked tile at (${x}, ${y})`);
        
        const tile = board.getTile(x, y);
        if (!tile) {
            console.log("Could not get tile from board");
            return;
        }

        if (!tile.isEmpty()) {
            console.log("Tile is not empty");
            return;
        }

        console.log("Setting selected tile and showing popup");
        selectedTile = tile;
        showOrganismPopup();
    }

    function showOrganismPopup() {
        try {
            console.log("Showing organism popup");
            
            // Create the popup content
            const organisms = [
                // Animals
                { name: "Wolf", image: "images/wolf.svg" },
                { name: "Sheep", image: "images/sheep.svg" },
                { name: "Fox", image: "images/fox.svg" },
                { name: "Antelope", image: "images/antelope.svg" },
                { name: "Turtle", image: "images/turtle.svg" },
                // Plants
                { name: "Grass", image: "images/grass.svg" },
                { name: "Guarana", image: "images/guarana.svg" },
                { name: "PoisonBerry", image: "images/poison-berry.svg" },
                { name: "SowThistle", image: "images/sow-thistle.svg" }
            ];

            organismPopup.innerHTML = `
                <button class="close-button" id="closePopup">×</button>
                <h2>Choose organism to create</h2>
                <div class="organism-options">
                    ${organisms.map(org => `
                        <button data-org="${org.name}" data-image="${org.image}">
                            <img src="${org.image}" alt="${org.name}">
                            <span>${org.name.replace(/([A-Z])/g, " $1").trim()}</span>
                        </button>
                    `).join("")}
                </div>
            `;

            // Function to handle organism selection
            const handleOrganismClick = async (event) => {
                const button = event.target;
                if (button.hasAttribute("data-org")) {
                    const orgName = button.getAttribute("data-org");
                    await addOrganism(orgName);
                    hidePopup();
                }
            };

            // Function to hide popup and clean up listeners
            const hidePopup = () => {
                organismPopup.classList.add("hidden");
                organismPopup.querySelector(".organism-options")
                    .removeEventListener("click", handleOrganismClick);
                organismPopup.querySelector("#closePopup")
                    .removeEventListener("click", hidePopup);
            };

            // Add event listeners
            organismPopup.querySelector(".organism-options")
                .addEventListener("click", handleOrganismClick);
            organismPopup.querySelector("#closePopup")
                .addEventListener("click", hidePopup);

            // Show the popup
            organismPopup.classList.remove("hidden");
        } catch (error) {
            console.error("Error showing organism popup:", error);
        }
    }

    async function addOrganism(orgName) {
        try {
            const module = await import(`./species/${orgName.toLowerCase()}.js`);
            const OrgClass = module[orgName];
            const organism = new OrgClass(board);
            selectedTile.setOrganism(organism);
            board.organisms.push(organism);
            board.sortOrganismsByInitiative();
        } catch (error) {
            console.error(`Error adding organism ${orgName}:`, error);
        }
    }
};
