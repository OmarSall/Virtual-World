import { Plant } from "../plant.js";

export class Guarana extends Plant {
    constructor(board) {
        super(board);
    }

    getIcon() {
        return 'GU';
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
