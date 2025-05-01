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
            this.move(); // Move 25% of the time
        }
        this.mate();
    }

    fight(other) {
        // Defend against organisms with strength lower than 5
        if (other.strength < 5) {
            // Turtle blocks the attack, attacker fails
            return;
        } else {
            // Otherwise, normal fight
            super.fight(other);
        }
    }

    clone() {
        return new Turtle(this.board);
    }
}
