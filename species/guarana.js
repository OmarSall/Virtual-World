// species/guarana.js
import { Plant } from "../plant.js";

export class Guarana extends Plant {
    constructor(board) {
        super(board);
    }

    getIcon() {
        return 'Gu';
    }

    clone() {
        return new Guarana(this.board);
    }

    consume(organism) {
        if (organism.strength !== undefined) {
            organism.strength += 3;
        }
    }
}
