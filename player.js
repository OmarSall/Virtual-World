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
        if (!this.alive) {
            return
        }
        const [dx, dy] = this.moveDirection;
        const newX = this.x + dx;
        const newY = this.y + dy;

        console.log(`Player action: current pos (${this.x},${this.y}), moving to (${newX},${newY})`);

         // If staying in place, do nothing
        if (newX === this.x && newY === this.y) {
                this.moveDirection = [0, 0];
                return;
         }

        const targetTile = this.board.getTile(newX, newY);

        if (!targetTile) return;

        if (!targetTile.organism) {
            const currentTile = this.board.getTile(this.x, this.y);
            if (currentTile) {
                currentTile.removeOrganism();
                targetTile.setOrganism(this);
                this.setPosition(newX, newY);

            }
        } else if (targetTile.organism instanceof Animal) {
            const otherAnimal = targetTile.organism;
            if (this.strength >= otherAnimal.strength) {
                otherAnimal.alive = false;
                const currentTile = this.board.getTile(this.x, this.y);
                if (currentTile) {
                    currentTile.removeOrganism();
                    targetTile.removeOrganism();
                    targetTile.setOrganism(this);
                    this.setPosition(newX, newY);
                }
            } else {
                this.alive = false;
                const currentTile = this.board.getTile(this.x, this.y);
                if (currentTile) {
                    currentTile.removeOrganism();
                }
                // Remove player from the board's organism list
                const index = this.board.organisms.indexOf(this);
                if (index > -1) {
                    this.board.organisms.splice(index, 1);
                }
            }
        } else if (targetTile.organism instanceof Plant) {
            // Let the plant apply its effects first
            targetTile.organism.consume(this);
        }

        // Check if player died from consuming the plant
        if (!this.alive) {
            // Remove player from their current tile if they died
            const currentTile = this.board.getTile(this.x, this.y);
            if (currentTile) {
                currentTile.removeOrganism();
            }
            // Remove player from the board's organism list
            const index = this.board.organisms.indexOf(this);
            if (index > -1) {
                this.board.organisms.splice(index, 1);
            }
            return
        }
        // If player is still alive, proceed with movement
        const currentTile = this.board.getTile(this.x, this.y);
        if (currentTile) {
            currentTile.removeOrganism();
            targetTile.removeOrganism();
            targetTile.setOrganism(this);
            this.setPosition(newX, newY);
        }
        
        this.moveDirection = [0, 0]; // Reset direction after moving
    }
}
