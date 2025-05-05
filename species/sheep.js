// species/sheep.js
import { Animal } from "../animal.js";
import { ANIMAL_CONFIG } from "./config.js";

const CONFIG = ANIMAL_CONFIG.Sheep;

export class Sheep extends Animal {
    /**
     * Creates a new Sheep
     * @param {Board} board - The game board
     * @param {string} imagePath - Path to sheep image
     */
    constructor(board, imagePath = null) {
        super(CONFIG.STRENGTH, CONFIG.INITIATIVE, board, imagePath);  // Strength 4, Initiative 4
    }

    action() {
        if (!this.alive) {
            return;
        }
        super.action(); // Increment age
        this.move();
        this.mate();
    }

    clone() {
        // Clone should use the same image as the parent
        return new Sheep(this.board, this.imagePath);
    }

    /**
     * Gets the name of the organism
     * @returns {string} The display name
     */
    getName() {
        return "Sheep";
    }

    /**
     * Gets the default image path if none provided
     * @returns {string} Path to the default image
     */
    getDefaultImagePath() {
        return "images/sheep.svg";
    }
}
