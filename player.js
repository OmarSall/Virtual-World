// player.js
import { Animal } from "./animal.js";
import { Plant } from "./plant.js";

export class Player extends Animal {
    constructor(board, imagePath = "./images/player.svg") {
        super(5, 4, board, imagePath);
        this.moveDirection = [0, 0];
    }

    setNextMove(dx, dy) {
        this.moveDirection = [dx, dy];
    }

    /**
     * Moves player to a new position
     * @param {number} newX - Target X coordinate
     * @param {number} newY - Target Y coordinate
     * @returns {boolean} - True if movement was successful
     */
    moveToPosition(newX, newY) {
        try {
            const currentTile = this.board.getTile(this.x, this.y);
            const targetTile = this.board.getTile(newX, newY);

            if (!currentTile || !targetTile) {
                console.warn("Invalid tile coordinates");
                return false;
            }

            currentTile.removeOrganism();
            targetTile.setOrganism(this);
            this.setPosition(newX, newY);
            return true;
        } catch (error) {
            console.error("Error during movement:", error);
            return false;
        }
    }

    /**
     * Removes the player from the board's organism list
     */
    removeFromBoard() {
        try {
            const index = this.board.organisms.indexOf(this);
            if (index > -1) {
                this.board.organisms.splice(index, 1);
            }
        } catch (error) {
            console.error("Error removing from board:", error);
        }
    }

    /**
     * Main action method for the player
     */
    action() {
        try {
            if (!this.alive) {
                return;
            }

            const [dx, dy] = this.moveDirection;
            if (dx === 0 && dy === 0) {
                return;
            }

            const newX = this.x + dx;
            const newY = this.y + dy;

            console.log(`Player action: current pos (${this.x},${this.y}), moving to (${newX},${newY})`);

            const targetTile = this.board.getTile(newX, newY);
            if (!targetTile) {
                this.moveDirection = [0, 0];
                return;
            }

            if (!targetTile.organism) {
                this.moveToPosition(newX, newY);
            } else if (targetTile.organism instanceof Animal) {
                const currentTile = this.board.getTile(this.x, this.y)
                const otherAnimal = targetTile.organism;
                if (currentTile) {
                    currentTile.removeOrganism();
                }
                this.fight(otherAnimal);
            } else if (targetTile.organism instanceof Plant) {
                // Handle plant interaction
                targetTile.organism.consume(this);

                if (!this.alive) {
                    const currentTile = this.board.getTile(this.x, this.y);
                    if (currentTile) {
                        currentTile.removeOrganism();
                    }
                    this.removeFromBoard();
                    return;
                }

                targetTile.removeOrganism();
                this.moveToPosition(newX, newY);
            }

            this.moveDirection = [0, 0];
        } catch (error) {
            console.error("Error in player action:", error);
            this.moveDirection = [0, 0];
        }
    }
}
