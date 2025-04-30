// species/wolf.js
import { Animal } from "../animal.js";

export class Wolf extends Animal {
    constructor(board) {
        super(9, 5, board);
    }

    getIcon() {
        return "🐺";
    }

    action() {
        this.move(); // Wolves move randomly
        this.mate(); // Wolves can mate if nearby wolves are found
    }

    clone() {
        return new Wolf(this.board);
    }
}