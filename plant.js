// plant.js
import { Organism } from "./organism.js";

export class Plant extends Organism {
    constructor(board) {
        super(0, 0, board);
    }

    // Default spreading behavior (10% chance each turn)
    spread() {
        const directions = [
            { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
            { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
            { dx: -1, dy: 1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 1 }
        ];

        const chance = Math.random();
        if (chance > 0.9) { // 10% chance to spread
            const dir = directions[Math.floor(Math.random() * directions.length)];
            const newX = this.x + dir.dx;
            const newY = this.y + dir.dy;
            const targetTile = this.board.getTile(newX, newY);

            if (targetTile && targetTile.isEmpty()) {
                const plant = this.clone();
                targetTile.setOrganism(plant);
            }
        }
    }

    // Clone method to be overridden
    clone() {
        return new Plant(this.board); // Base plant clone (to be extended)
    }

    consume(organism) {
        // By default, plants have no special effect when consumed
        console.log(`${organism.constructor.name} consumed ${this.constructor.name}`);
    }

    // Action method for plants
    action() {
        this.spread();
    }
}
