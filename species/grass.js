// species/grass.js
import { Plant } from "../plant.js";

export class Grass extends Plant {
    constructor(board) {
        super(board);
    }

    getIcon() {
        return 'Gr';
    }

    clone() {
        return new Grass(this.board);
    }

    action() {
        this.spread();
    }
}
