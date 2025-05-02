import { Tile } from "./tile.js";
import { Player } from "./player.js";
import { getRandomOrganism } from "./organismCreation.js";

export class Board {
    static directionMap = {
        "Numpad7": [-1, -1], "Numpad8": [0, -1], "Numpad9": [1, -1],
        "Numpad4": [-1, 0],  "Numpad5": [0, 0],  "Numpad6": [1, 0],
        "Numpad1": [-1, 1],  "Numpad2": [0, 1],  "Numpad3": [1, 1],
    };

    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.organisms = [];
        this.player = null;
        this.boardContainer = document.getElementById("board");
        this._keydownListener = null;
    }

    createBoard() {
        this.grid = [];
        this.boardContainer.innerHTML = "";
        this.boardContainer.style.gridTemplateColumns = `repeat(${this.columns}, 30px)`;
        this.boardContainer.style.gridTemplateRows = `repeat(${this.rows}, 30px)`;

        for (let y = 0; y < this.rows; y++) {
            const row = [];
            for (let x = 0; x < this.columns; x++) {
                const tile = new Tile(x, y);
                row.push(tile);
                this.boardContainer.appendChild(tile.element);
            }
            this.grid.push(row);
        }

        for (let i = 0; i < 20; i++) {
            const org = getRandomOrganism(this);
            const emptyTile = this.getRandomEmptyTile();
            if (emptyTile) {
                emptyTile.setOrganism(org);
                this.organisms.push(org);
            }
        }
    }

    getTile(x, y) {
        if (x < 0 || x >= this.columns || y < 0 || y >= this.rows) return null;
        return this.grid[y][x];
    }

    getRandomEmptyTile() {
        const emptyTiles = this.grid.flat().filter(tile => tile.isEmpty());
        if (emptyTiles.length === 0) return null;
        return emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    }

    placePlayer(x, y) {
        const tile = this.getTile(x, y);
        if (!tile || !tile.isEmpty()) return;
        this.player = new Player(this);
        tile.setOrganism(this.player);
        this.organisms.push(this.player);
        this.sortOrganismsByInitiative();
    }

    enableGame() {
        // Remove any existing listeners
        if (this._keydownListener) {
            document.removeEventListener("keydown", this._keydownListener);
        }
        if (this._keyupListener) {
            document.removeEventListener("keyup", this._keyupListener);
        }

        // Track if key is being held down
        this._keyHeld = false;

        // Create keydown listener
        this._keydownListener = (event) => {
            try {
                if (!this.player || !this.player.alive || this._keyHeld) return;
                
                const key = event.code;
                if (this.constructor.directionMap[key]) {
                    this._keyHeld = true;
                    const [dx, dy] = this.constructor.directionMap[key];
                    console.log(`Moving with dx: ${dx}, dy: ${dy}`);
                    this.player.setNextMove(dx, dy);
                    this.makeTurn();
                }
            } catch (error) {
                console.error("Error while processing key event:", error);
            }
        };

        // Create keyup listener
        this._keyupListener = (event) => {
            const key = event.code;
            if (this.constructor.directionMap[key]) {
                this._keyHeld = false;
            }
        };

        // Add the event listeners
        // document.addEventListener("keydown", this._keydownListener);
        // document.addEventListener("keyup", this._keyupListener);
    }

    makeTurn() {
        console.log("Making turn...");
        
        this.sortOrganismsByInitiative();

        // Make actions only for alive organisms
        for (const org of [...this.organisms]) {
            if (org.alive) {
                org.action();
            }
        }

        // Clean up dead organisms after turn
        this.organisms = this.organisms.filter(o => o.alive);
    }

    sortOrganismsByInitiative() {
        this.organisms.sort((a, b) => {
            if (b.initiative === a.initiative) {
                return b.age - a.age;
            }
            return b.initiative - a.initiative;
        });
    }

    moveOrganism(organism, newX, newY) {
        // Don't move if organism is not alive
        if (!organism.alive) return;

        const oldTile = this.getTile(organism.x, organism.y);
        const newTile = this.getTile(newX, newY);

        if (!newTile || !oldTile) return;

        // Simple movement - the target tile should be empty at this point
        oldTile.removeOrganism();
        newTile.setOrganism(organism);
        organism.setPosition(newX, newY);
    }

    getAdjacentEmptyTile(x, y) {
        const dirs = [
            [-1, -1], [0, -1], [1, -1],
            [-1, 0],           [1, 0],
            [-1, 1], [0, 1], [1, 1]
        ];
        for (const [dx, dy] of dirs) {
            const tile = this.getTile(x + dx, y + dy);
            if (tile && tile.isEmpty()) return tile;
        }
        return null;
    }
}
