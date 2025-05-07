import { Organism } from "./organism.js";

/**
 * Base class for all animal organisms in the game
 * @extends Organism
 */
export class Animal extends Organism {
    /**
     * Creates a new animal
     * @param {number} strength - The animal's strength in combat
     * @param {number} initiative - The animal's turn priority
     * @param {Board} board - Reference to the game board
     */
    constructor(strength, initiative, board, imagePath = null) {
        super(strength, initiative, board, imagePath);
    }

    /**
     * Attempts to move the animal in a random valid direction
     * @returns {boolean} True if movement was successful
     */
    move() {
        try {
            if (!this.alive) {
                return false;
            }

            const directions = [
                { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
                { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
                { dx: -1, dy: 1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 1 }
            ];

            // Shuffle directions to randomize movement attempts
            for (let i = directions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [directions[i], directions[j]] = [directions[j], directions[i]];
            }

            for (const dir of directions) {
                const newX = this.x + dir.dx;
                const newY = this.y + dir.dy;
                const targetTile = this.board.getTile(newX, newY);

                if (!targetTile) continue;

                if (targetTile.isEmpty()) {
                    this.board.moveOrganism(this, newX, newY);
                    return true;
                } else if (targetTile.organism instanceof Animal) {
                    if (targetTile.organism.strength <= this.strength) {
                        this.fight(targetTile.organism);
                        return true;
                    }
                }
            }
            return false; // No valid move found
        } catch (error) {
            console.error("Error during animal movement:", error);
            return false;
        }
    }

    /**
     * Initiates combat with another animal
     * @param {Animal} other - The animal to fight with
     * @returns {boolean} True if the fight was successful
     */
    fight(other) {
        try {
            if (!this.alive || !other.alive) return false;

            const myTile = this.board.getTile(this.x, this.y);
            const otherTile = this.board.getTile(other.x, other.y);

            if (!myTile || !otherTile) {
                throw new Error("Invalid tile positions for combat");
            }

            if (this.strength >= other.strength) {
                other.alive = false;
                otherTile.removeOrganism();
                this.board.moveOrganism(this, other.x, other.y);
            } else {
                this.alive = false;
                myTile.removeOrganism();
                this.removeFromBoard();
            }
            return true;
        } catch (error) {
            console.error("Error during combat:", error);
            return false;
        }
    }

    /**
     * Attempts to create offspring in an adjacent empty tile
     * @returns {boolean} True if mating was successful
     */
    mate() {
        try {
            if (!this.alive) {
                return false;
            }

            const emptyTile = this.board.getAdjacentEmptyTile(this.x, this.y);
            if (emptyTile) {
                const offspring = this.clone();
                emptyTile.setOrganism(offspring);
                return true;
            }

            return false;
        } catch (error) {
            console.error("Error during mating:", error);
            return false;
        }
    }

    /**
     * Creates a copy of this animal
     * @returns {Animal} A new instance of the same animal type
     */
    clone() {
        return new Animal(this.strength, this.initiative, this.board);
    }

    /**
     * Removes this animal from the board's organism list
     */
    removeFromBoard() {
        try {
            const index = this.board.organisms.indexOf(this);
            if (index > -1) {
                this.board.organisms.splice(index, 1);
            }
        } catch (error) {
            console.error('Error removing from board:', error);
        }
    }

    /**
     * Performs the animal's turn actions
     * @override
     */
    action() {
        try {
            if (!this.alive) {
                return;
            }
            super.action(); // Increment age
            this.move();
            this.mate();
        } catch (error) {
            console.error("Error in animal action:", error);
        }
    }
}
