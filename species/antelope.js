// species/antelope.js
import { Animal } from "../animal.js";
import { ANIMAL_CONFIG } from "./config.js";

const CONFIG = ANIMAL_CONFIG.Antelope;

export class Antelope extends Animal {
    /**
     * Creates a new Antelope
     * @param {Board} board - The game board
     * @param {string} imagePath - Path to antelope image
     */

    constructor(board, imagePath = null) {
        super(CONFIG.STRENGTH, CONFIG.INITIATIVE, board, imagePath);  // Strength 4, Initiative 4
    }

    action() {
        if (!this.alive) {
            return;
        }
        super.action(); // Increment age
        // Antelope moves twice per turn
        this.move();
        if (this.alive) {
            this.move();
            this.mate();
        }
    }

    // Antelope can move two tiles at once
    move() {
        if (!this.alive) {
            return;
        }

        const directions = [
            { dx: -2, dy: -2 }, { dx: 0, dy: -2 }, { dx: 2, dy: -2 },
            { dx: -2, dy: 0 }, { dx: 2, dy: 0 },
            { dx: -2, dy: 2 }, { dx: 0, dy: 2 }, { dx: 2, dy: 2 }
        ];

        // Shuffle directions for random movement
        for (let i = directions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [directions[i], directions[j]] = [directions[j], directions[i]];
        }

        for (const dir of directions) {
            const newX = this.x + dir.dx;
            const newY = this.y + dir.dy;
            const targetTile = this.board.getTile(newX, newY);

            if (!targetTile) {
                continue;
            }

            if (targetTile.isEmpty()) {
                this.board.moveOrganism(this, newX, newY);
                return;
            } else if (targetTile.organism instanceof Animal) {
                if (targetTile.organism.strength <= this.strength) {
                    this.fight(targetTile.organism);
                    return;
                }
            }
        }
    }

    fight(opponent) {
        if (Math.random() < CONFIG.FLEE_CHANCE) {
            // Try to escape
            const escapeDirs = [
                { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
                { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
                { dx: -1, dy: 1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 1 }
            ];
    
            // Shuffle escape directions
            for (let i = escapeDirs.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [escapeDirs[i], escapeDirs[j]] = [escapeDirs[j], escapeDirs[i]];
            }
    
            for (const dir of escapeDirs) {
                const newX = this.x + dir.dx;
                const newY = this.y + dir.dy;
                const tile = this.board.getTile(newX, newY);
    
                if (tile && tile.isEmpty()) {
                    this.board.moveOrganism(this, newX, newY);
                    console.log(`${this.getName()} fled from ${opponent.getName()}`);
                    return false; // Fight was avoided
                }
            }
    
            console.log(`${this.getName()} tried to flee but was cornered.`);
        }
    
        // Could not flee or didn't attempt — do normal fight
        return super.fight(opponent);
    }

    clone() {
        // Clone should use the same image as the parent
        return new Antelope(this.board, this.imagePath);
    }

    /**
     * Gets the name of the organism
     * @returns {string} The display name
     */
    getName() {
        return "Antelope";
    }
}
