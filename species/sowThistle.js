// species/sowThistle.js
import { Plant } from "../plant.js";
import { PLANT_CONFIG } from "./config.js";

const CONFIG = PLANT_CONFIG.SowThistle;

export class SowThistle extends Plant {
    /**
     * Creates a new Sow Thistle plant
     * @param {Board} board - The game board
     * @param {string} imagePath - Path to sow thistle image
     */
    constructor(board, imagePath = null) {
        super(CONFIG.STRENGTH, CONFIG.INITIATIVE, board, imagePath);
    }

    action() {
        if (!this.alive) {
            return;
        }
        super.action(); // Increment age
        
        // Sow Thistle attempts to spread three times
        for (let i = 0; i < CONFIG.SPREAD_ATTEMPTS; i++) {
            if (this.alive) {
                this.spread();
            }
        }
    }

    clone() {
        // Clone should use the same image as the parent
        return new SowThistle(this.board, this.imagePath);
    }

    /**
     * Gets the name of the organism
     * @returns {string} The display name
     */
    getName() {
        return "Sow Thistle";
    }
}
