// species/wolf.js
import { Animal } from "../animal.js";
import { ANIMAL_CONFIG } from "./config.js";

const CONFIG = ANIMAL_CONFIG.Wolf;

export class Wolf extends Animal {
    /**
     * Creates a new Wolf
     * @param {Board} board - The game board
     * @param {string} imagePath - Path to wolf image
     */
    constructor(board, imagePath = null) {
        super(CONFIG.STRENGTH, CONFIG.INITIATIVE, board, imagePath);  // Pass imagePath to Animal constructor
    }

    action() {
        if (!this.alive) return;
        this.move(); // Wolves move randomly
        this.mate(); // Wolves can mate if nearby wolves are found
    }

    clone() {
        // Clone should use the same image as the parent
        return new Wolf(this.board, this.imagePath);
    }

    /**
     * Gets the name of the organism
     * @returns {string} The display name
     */
    getName() {
        return "Wolf";
    }
}
