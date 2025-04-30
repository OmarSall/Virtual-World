// species/turtle.js
import { Animal } from "../animal.js";

export class Turtle extends Animal {
    constructor(board) {
        super(2, 1, board);
    }

    getIcon() {
        return 'T';
    }

    action() {
        // Turtle won't move 75% of the time
        if (Math.random() > 0.75) {
            super.move(); // Move 25% of the time
        }
        this.mate();
    }

    clone() {
        return new Turtle(this.board);
    }
}
