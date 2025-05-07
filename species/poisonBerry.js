// species/poisonBerry.js
import { Plant } from "../plant.js";
import { Animal } from "../animal.js";
import { PLANT_CONFIG } from "./config.js";

const CONFIG = PLANT_CONFIG.PoisonBerry;

export class PoisonBerry extends Plant {
    /**
     * Creates a new PoisonBerry plant
     * @param {Board} board - The game board
     * @param {string} imagePath - Path to poison berry image
     */
    constructor(board, imagePath = null) {
        super(CONFIG.STRENGTH, CONFIG.INITIATIVE, board, imagePath);
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
        return new PoisonBerry(this.board, this.imagePath);
    }

    consume(organism) {
        if (organism?.alive) {
            organism.alive = false;
        }
    }

    // Overridden to remove organisms that eat the poison berry
    spread() {
        super.spread();
        const targetTile = this.board.getTile(this.x, this.y);
        if (targetTile?.organism instanceof Animal) {
            targetTile.organism.alive = false;
            targetTile.removeOrganism();
        }
    }

    /**
     * Gets the name of the organism
     * @returns {string} The display name
     */
    getName() {
        return "Poison Berry";
    }
}
