// species/turtle.js
import { Animal } from "../animal.js";
import { ANIMAL_CONFIG } from "./config.js";

const CONFIG = ANIMAL_CONFIG.Turtle;

export class Turtle extends Animal {
    /**
     * Creates a new Turtle
     * @param {Board} board - The game board
     * @param {string} imagePath - Path to turtle image
     */
    constructor(board, imagePath = null) {
        super(CONFIG.STRENGTH, CONFIG.INITIATIVE, board, imagePath);  // Strength 2, Initiative 1
    }

    action() {
        if (!this.alive) {
            return;
        }
        super.action(); // Increment age
        
        // Turtle has 75% chance to stay in place
        if (Math.random() < CONFIG.MOVE_CHANCE) {
            this.move();
        }
        this.mate();
    }

    /**
     * Turtle reflects attacks from animals with strength 5 or less
     * @param {Animal} attacker - The attacking animal
     * @returns {boolean} True if attack was reflected
     */
    reflectAttack(attacker) {
        return attacker.strength <= CONFIG.REFLECT_THRESHOLD;
    }

    clone() {
        // Clone should use the same image as the parent
        return new Turtle(this.board, this.imagePath);
    }

    /**
     * Gets the name of the organism
     * @returns {string} The display name
     */
    getName() {
        return "Turtle";
    }
}
