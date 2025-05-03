import { Organism } from "./organism.js";

/**
 * Base class for all plant organisms in the game
 * @extends Organism
 */
export class Plant extends Organism {
    /**
     * Creates a new plant with 0 strength and initiative
     * @param {Board} board - Reference to the game board
     */
    /**
     * Creates a new plant
     * @param {number} strength - The plant's strength (usually 0)
     * @param {number} initiative - The plant's initiative (usually 0)
     * @param {Board} board - Reference to the game board
     * @param {string} imagePath - Path to plant image
     */
    constructor(strength, initiative, board, imagePath = null) {
        super(strength, initiative, board, imagePath);
    }

    /**
     * Attempts to spread to an adjacent empty tile
     * Plants have a 10% chance to spread each turn
     * @returns {boolean} True if spreading was successful
     */
    spread() {
        try {
            if (!this.alive) return false;

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

                if (targetTile?.isEmpty()) {
                    const plant = this.clone();
                    targetTile.setOrganism(plant);
                    this.board.organisms.push(plant);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Error during plant spreading:', error);
            return false;
        }
    }

    /**
     * Creates a copy of this plant
     * @returns {Plant} A new instance of the same plant type
     */
    clone() {
        try {
            return new Plant(this.board);
        } catch (error) {
            console.error('Error cloning plant:', error);
            throw error;
        }
    }

    /**
     * Applies plant's effect when consumed by an organism
     * @param {Organism} organism - The organism consuming this plant
     */
    consume(organism) {
        try {
            if (!this.alive || !organism?.alive) return;
            // By default, plants have no special effect when consumed
            console.log(`${organism.constructor.name} consumed ${this.constructor.name}`);
        } catch (error) {
            console.error('Error during plant consumption:', error);
        }
    }

    /**
     * Performs the plant's turn action
     * @override
     */
    action() {
        try {
            if (!this.alive) return;
            super.action(); // Increment age
            this.spread();
        } catch (error) {
            console.error('Error in plant action:', error);
        }
    }

    /**
     * Removes this plant from the board's organism list
     */
    removeFromBoard() {
        try {
            const index = this.board.organisms.indexOf(this);
            if (index > -1) {
                this.board.organisms.splice(index, 1);
            }
        } catch (error) {
            console.error("Error removing plant from board:", error);
        }
    }
}
