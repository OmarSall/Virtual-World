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

    /**
     * Gets the default image path if none provided
     * @returns {string} Path to the default image
     */
    getDefaultImagePath() {
        return "images/sow-thistle.svg";
    }

    /**
     * Spreads more aggressively than other plants
     * @returns {boolean} True if spreading was successful
     */
    spread() {
        // 10% chance to spread in each of three attempts
        if (Math.random() < CONFIG.SPREAD_CHANCE) {
            return super.spread();
        }
        return false;
    }
}
