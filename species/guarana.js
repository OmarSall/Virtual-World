// species/guarana.js
import { Plant } from "../plant.js";

export class Guarana extends Plant {
    constructor(board) {
        super(board);
    }

    getIcon() {
        return '🍃';
    }

    clone() {
        return new Guarana(this.board);
    }
}
