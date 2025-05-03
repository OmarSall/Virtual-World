import { Tile } from "./tile.js";
import { Player } from "./player.js";
import { getRandomOrganism } from "./organismCreation.js";

/**
 * Represents the game board and manages game state
 */
export class Board {
    /** @type {Object.<string, number[]>} Mapping of numpad keys to movement vectors */
    static directionMap = {
        "Numpad7": [-1, -1], "Numpad8": [0, -1], "Numpad9": [1, -1],
        "Numpad4": [-1, 0],  "Numpad5": [0, 0],  "Numpad6": [1, 0],
        "Numpad1": [-1, 1],  "Numpad2": [0, 1],  "Numpad3": [1, 1]
    };

    /**
     * Creates a new game board
     * @param {number} rows - Number of rows in the board
     * @param {number} columns - Number of columns in the board
     * @throws {Error} If dimensions are invalid or board element is missing
     */
    constructor(rows, columns) {
        try {
            if (rows <= 0 || columns <= 0) {
                throw new Error('Board dimensions must be positive');
            }

            this.rows = rows;
            this.columns = columns;
            this.grid = [];
            this.organisms = [];
            this.player = null;
        this.boardContainer = document.getElementById("board");
            
            if (!this.boardContainer) {
                throw new Error('Board container element not found');
            }

            this._keydownListener = null;
            this._keyupListener = null;
            this._keyHeld = false;
        } catch (error) {
            console.error('Error creating board:', error);
            throw error;
        }
    }

    /**
     * Initializes the board with tiles and random organisms
     */
    createBoard() {
        try {
            this.grid = [];
            this.boardContainer.innerHTML = "";
            this.boardContainer.style.gridTemplateColumns = `repeat(${this.columns}, 30px)`;
            this.boardContainer.style.gridTemplateRows = `repeat(${this.rows}, 30px)`;

            // Create tiles
            for (let y = 0; y < this.rows; y++) {
                const row = [];
                for (let x = 0; x < this.columns; x++) {
                    const tile = new Tile(x, y);
                    row.push(tile);
                    this.boardContainer.appendChild(tile.element);
                }
                this.grid.push(row);
            }

            // Add random organisms
            for (let i = 0; i < 20; i++) {
                const org = getRandomOrganism(this);
                const emptyTile = this.getRandomEmptyTile();
                if (emptyTile) {
                    emptyTile.setOrganism(org);
                    this.organisms.push(org);
                }
            }
        } catch (error) {
            console.error('Error creating board layout:', error);
            throw error;
        }
    }

    /**
     * Gets a tile at specified coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {Tile|null} The tile at the coordinates or null if invalid
     */
    getTile(x, y) {
        if (x < 0 || x >= this.columns || y < 0 || y >= this.rows) return null;
        return this.grid[y][x];
    }

    /**
     * Gets a random empty tile on the board
     * @returns {Tile|null} Random empty tile or null if none available
     */
    getRandomEmptyTile() {
        try {
            const emptyTiles = this.grid.flat().filter(tile => tile.isEmpty());
            if (emptyTiles.length === 0) return null;
            return emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        } catch (error) {
            console.error('Error getting random empty tile:', error);
            return null;
        }
    }

    /**
     * Places the player at specified coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {boolean} True if player was placed successfully
     */
    placePlayer(x, y) {
        try {
            const tile = this.getTile(x, y);
            if (!tile || !tile.isEmpty()) return false;

            this.player = new Player(this);
            tile.setOrganism(this.player);
            this.organisms.push(this.player);
            this.sortOrganismsByInitiative();
            return true;
        } catch (error) {
            console.error('Error placing player:', error);
            return false;
        }
    }

    /**
     * Enables game controls and movement
     */
    enableGame() {
        try {
            // Remove existing listeners
            if (this._keydownListener) {
                document.removeEventListener("keydown", this._keydownListener);
            }
            if (this._keyupListener) {
                document.removeEventListener("keyup", this._keyupListener);
            }

            this._keyHeld = false;

            // Create keydown listener
            this._keydownListener = (event) => {
                try {
                    if (!this.player?.alive || this._keyHeld) return;
                    
                    const key = event.code;
                    if (this.constructor.directionMap[key]) {
                        this._keyHeld = true;
                        const [dx, dy] = this.constructor.directionMap[key];
                        console.log(`Moving with dx: ${dx}, dy: ${dy}`);
                        this.player.setNextMove(dx, dy);
                        this.makeTurn();
                    }
                } catch (error) {
                    console.error("Error processing key event:", error);
                }
            };

            // Create keyup listener
            this._keyupListener = (event) => {
                const key = event.code;
                if (this.constructor.directionMap[key]) {
                    this._keyHeld = false;
                }
            };

            // Add listeners
            document.addEventListener("keydown", this._keydownListener);
            document.addEventListener("keyup", this._keyupListener);
        } catch (error) {
            console.error('Error enabling game controls:', error);
        }
    }

    /**
     * Executes a game turn
     */
    makeTurn() {
        try {
            console.log("Making turn...");
            
            this.sortOrganismsByInitiative();

            // Process actions for alive organisms
            for (const org of [...this.organisms]) {
                if (org.alive) {
                    org.action();
                }
            }

            // Clean up dead organisms
            this.organisms = this.organisms.filter(o => o.alive);
        } catch (error) {
            console.error('Error making turn:', error);
        }
    }

    /**
     * Sorts organisms by initiative and age
     */
    sortOrganismsByInitiative() {
        try {
            this.organisms.sort((a, b) => {
                if (b.initiative === a.initiative) {
                    return b.age - a.age;
                }
                return b.initiative - a.initiative;
            });
        } catch (error) {
            console.error('Error sorting organisms:', error);
        }
    }

    /**
     * Moves an organism to a new position
     * @param {Organism} organism - The organism to move
     * @param {number} newX - Target X coordinate
     * @param {number} newY - Target Y coordinate
     * @returns {boolean} True if movement was successful
     */
    moveOrganism(organism, newX, newY) {
        try {
            if (!organism?.alive) return false;

            const oldTile = this.getTile(organism.x, organism.y);
            const newTile = this.getTile(newX, newY);

            if (!newTile || !oldTile) return false;

            oldTile.removeOrganism();
            newTile.setOrganism(organism);
            organism.setPosition(newX, newY);
            return true;
        } catch (error) {
            console.error('Error moving organism:', error);
            return false;
        }
    }

    /**
     * Finds an empty tile adjacent to the specified coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {Tile|null} An empty adjacent tile or null if none found
     */
    getAdjacentEmptyTile(x, y) {
        try {
            const dirs = [
                [-1, -1], [0, -1], [1, -1],
                [-1, 0],           [1, 0],
                [-1, 1], [0, 1], [1, 1]
            ];
            
            for (const [dx, dy] of dirs) {
                const tile = this.getTile(x + dx, y + dy);
                if (tile?.isEmpty()) return tile;
            }
            return null;
        } catch (error) {
            console.error('Error finding adjacent empty tile:', error);
            return null;
        }
    }
}
