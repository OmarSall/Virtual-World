// species/fox.js
import { Animal } from "../animal.js";

export class Fox extends Animal {
    constructor(board) {
        super(4, 7, board);  // Fox strength: 4, initiative: 7
    }

    getIcon() {
        return 'F';
    }

    action() {
        console.log("Fox action this.board:", this.board);
        // Fox moves randomly, but it will avoid stronger organisms
        const directions = [
            { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
            { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
            { dx: -1, dy: 1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 1 }
        ];

        let moved = false;

        // Try moving in each direction until we find a valid spot
        for (let dir of directions) {
            const newX = this.x + dir.dx;
            const newY = this.y + dir.dy;
            const targetTile = this.board.getTile(newX, newY);

            if (targetTile) {
                const targetOrganism = targetTile.organism;

                // If the target tile is empty or has an organism weaker than or equal to the fox
                if (targetTile.isEmpty() || (targetOrganism && targetOrganism.strength <= this.strength)) {
                    // Move to the tile
                    this.board.getTile(this.x, this.y).removeOrganism();
                    targetTile.setOrganism(this);
                    moved = true;
                    break;  // Move to the first valid tile and stop looking
                }
            }
        }

        // If Fox didn't move, it may mate with another Fox if possible
        if (!moved) {
            this.mate();
        }
    }

    clone() {
        return new Fox(this.board);
    }
}
