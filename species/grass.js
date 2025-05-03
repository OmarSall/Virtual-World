// species/grass.js
import { Plant } from "../plant.js";

export class Grass extends Plant {
    /**
     * Creates a new Grass plant
     * @param {Board} board - The game board
     * @param {string} imagePath - Path to grass image
     */
    constructor(board, imagePath = null) {
        super(0, 0, board, imagePath);
    }

    action() {
        if (!this.alive) return;
        super.action(); // Increment age
        this.spread();
    }

    clone() {
        // Clone should use the same image as the parent
        return new Grass(this.board, this.imagePath);
    }

    /**
     * Gets the name of the organism
     * @returns {string} The display name
     */
    getName() {
        return 'Grass';
    }

    /**
     * Gets the default image path if none provided
     * @returns {string} Path to the default image
     */
    getDefaultImagePath() {
        return 'images/grass.svg';
    }
}
