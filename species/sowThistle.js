// species/sowThistle.js
import { Plant } from "../plant.js";

export class SowThistle extends Plant {
    constructor(board) {
        super(board);
    }

    getIcon() {
        return 'ST';
    }

    clone() {
        return new SowThistle(this.board);
    }

    // Overridden to spread 3x more often
    spread() {
        const chance = Math.random();
        if (chance > 0.67) { // 33% chance to spread
            super.spread();
        }
    }
}