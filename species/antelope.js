// species/antelope.js
import { Animal } from "../animal.js";

export class Antelope extends Animal {
    constructor(board) {
        super(4, 4, board);
    }

    getIcon() {
        return '🦌';
    }

    action() {
        // Antelope moves with a double range and has a 50% chance of fleeing
        const fleeChance = Math.random() > 0.5;

        if (fleeChance) {
            this.move(); // Antelope flees
        } else {
            super.move(); // Regular movement
        }

        this.mate();
    }

    clone() {
        return new Antelope(this.board);
    }
}
