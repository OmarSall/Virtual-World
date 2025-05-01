// player.js
import { Animal } from "./animal.js";
import { Plant } from "./plant.js";

export class Player extends Animal {
    constructor(board) {
        super(5, 4, board);
        this.moveDirection = [0, 0];
        this.icon = "P";
    }

    getIcon() {
        return "P";
    }

    setNextMove(dx, dy) {
        this.moveDirection = [dx, dy];
    }

    action() {
        const [dx, dy] = this.moveDirection;
        const newX = this.x + dx;
        const newY = this.y + dy;

         // If staying in place, do nothing
        if (newX === this.x && newY === this.y) {
                this.moveDirection = [0, 0];
                return;
         }

        const targetTile = this.board.getTile(newX, newY);

        if (!targetTile) return;

        if (!targetTile.organism) {
            this.board.moveOrganism(this, newX, newY);
        } else if (targetTile.organism instanceof Animal) {
            this.fight(targetTile.organism);
        } else if (targetTile.organism instanceof Plant) {
            targetTile.organism.consume(this);
            targetTile.removeOrganism();
            this.board.moveOrganism(this, newX, newY);
        }
        this.moveDirection = [0, 0]; // Reset direction after moving
    }
}
