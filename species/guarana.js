// species/guarana.js
import { Plant } from "../plant.js";

export class Guarana extends Plant {
    /**
     * Creates a new Guarana plant
     * @param {Board} board - The game board
     * @param {string} imagePath - Path to guarana image
     */
    constructor(board, imagePath = null) {
        super(0, 0, board, imagePath);
    }

    action() {
        if (!this.alive) {
            return;
        }
        super.action(); // Increment age
        this.spread();
    }

    clone() {
        // Clone should use the same image as the parent
        return new Guarana(this.board, this.imagePath);
    }

    /**
     * Increases the strength of the consuming organism by 3
     * @param {Animal} organism - The organism consuming this plant
     */
    consume(organism) {
        if (organism?.alive && typeof organism.strength === "number") {
            organism.strength += CONFIG.STRENGTH_BOOST;
            console.log(`${organism.getName()}'s strength increased to ${organism.strength}`);
        }
    }

    /**
     * Gets the name of the organism
     * @returns {string} The display name
     */
    getName() {
        return "Guarana";
    }

    /**
     * Gets the default image path if none provided
     * @returns {string} Path to the default image
     */
    getDefaultImagePath() {
        return "images/guarana.svg";
    }
}
