// species/sheep.js
import { Animal } from "../animal.js";

export class Sheep extends Animal {
    constructor(board) {
        super(3, 4, board);
    }

    getIcon() {
        return 'SH';
    }

    action() {
        this.move(); // Sheep move randomly
        this.mate(); // Sheep can mate if nearby sheep are found
    }

    clone() {
        return new Sheep(this.board);
    }
}