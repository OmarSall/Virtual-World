// board.js
// Board class handles the grid, turn order, and interactions
import { Tile } from "./tile.js";
import { Player } from "./player.js";
import { getRandomOrganism } from "./organismCreation.js";

export class Board {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.organisms = [];
        this.player = null;
        this.boardContainer = document.getElementById("board");
    }

    // grid creation and random placement of the organisms
    createBoard() {
        this.grid = []; // Clear old grid
        this.boardContainer.innerHTML = ""; // Clear old tiles
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
    
        // Generate initial random organisms
        for (let i = 0; i < 20; i++) {
            const org = getRandomOrganism();
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
        document.addEventListener("keydown", (event) => {
            if (!this.player) return;

            const directionMap = {
                "7": [-1, -1], "8": [0, -1], "9": [1, -1],
                "4": [-1, 0],  "5": [0, 0],  "6": [1, 0],
                "1": [-1, 1],  "2": [0, 1],  "3": [1, 1],
            };

            const key = event.key;
            if (directionMap[key]) {
                const [dx, dy] = directionMap[key];
                this.player.setNextMove(dx, dy);
                this.executeTurn();
            }
        });
    }

    executeTurn() {
        this.sortOrganismsByInitiative();

        for (const org of [...this.organisms]) {
            if (org.alive) {
                org.action(this);
            }
        }

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
        const oldTile = this.getTile(organism.x, organism.y);
        const newTile = this.getTile(newX, newY);

        if (!newTile || !oldTile || !organism.alive) return;

        const other = newTile.organism;
        if (other) {
            if (organism.constructor === other.constructor) {
                // Mating logic
                const emptyAdjacent = this.getAdjacentEmptyTile(newX, newY);
                if (emptyAdjacent) {
                    const child = new organism.constructor();
                    emptyAdjacent.setOrganism(child);
                    this.organisms.push(child);
                }
            } else {
                // Fight
                if (organism.strength >= other.strength) {
                    other.alive = false;
                    newTile.setOrganism(organism);
                    oldTile.removeOrganism();
                } else if (organism.strength < other.strength) {
                    organism.alive = false;
                    oldTile.removeOrganism();
                }
            }
        } else {
            newTile.setOrganism(organism);
            oldTile.removeOrganism();
        }
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