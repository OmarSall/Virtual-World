// species/poisonBerry.js
import { Plant } from "../plant.js";
import { Animal } from "../animal.js";



export class PoisonBerry extends Plant {
    constructor(board) {
        super(board);
    }

    getIcon() {
        return 'PB';
    }

    clone() {
        return new PoisonBerry(this.board);
    }

    consume(organism) {
        organism.alive = false;
    }

    // Overridden to remove organisms that eat the poison berry
    spread() {
        super.spread();
        const targetTile = this.board.getTile(this.x, this.y);
        if (targetTile && targetTile.organism) {
            const organism = targetTile.organism;
            if (organism instanceof Animal) {
                // Kill the animal
                targetTile.removeOrganism();
            }
        }
    }
}
