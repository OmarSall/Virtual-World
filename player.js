// player.js
import { Animal } from "./animal.js";

export class Player extends Animal {
    constructor(board, x, y) {
        super("P", 5, 4, board, x, y);
        this.moveDirection = [0, 0];
    }

    setNextMove(dx, dy) {
        this.setMoveDirection = ([dx, dy]);
    }

    action() {
        const [dx, dy] = this.moveDirection;
        const newX = this.x + dx;
        const newY = this.y + dy;
        const targetTile = this.board.getTile(newX, newY);

        if (!targetTile) return;

        if (!targetTile.organism) {
            this.moveTo(targetTile);
        } else if (targetTile.organism instanceof Animal) {
            this.fight(targetTile.organism);
        } else if (targetTile.organism instanceof Plant) {
            targetTile.organism.consume(this);
            targetTile.removeOrganism();
            this.moveTo(targetTile);
        }
        this.moveDirection = [0, 0]; // Reset direction after moving
    }
}