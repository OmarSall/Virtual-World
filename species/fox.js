// species/fox.js
import { Animal } from "../animal.js";

export class Fox extends Animal {
    /**
     * Creates a new Fox
     * @param {Board} board - The game board
     * @param {string} imagePath - Path to fox image
     */
    constructor(board, imagePath = null) {
        super(3, 7, board, imagePath);  // Strength 3, Initiative 7
    }

    action() {
        if (!this.alive) return;
        super.action(); // Increment age
        this.move();
        this.mate();
    }

    // Fox only moves to empty tiles or tiles with weaker organisms
    move() {
        if (!this.alive) return;

        const directions = [
            { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
            { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
            { dx: -1, dy: 1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 1 }
        ];

        // Shuffle directions for random movement
        for (let i = directions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [directions[i], directions[j]] = [directions[j], directions[i]];
        }

        for (const dir of directions) {
            const newX = this.x + dir.dx;
            const newY = this.y + dir.dy;
            const targetTile = this.board.getTile(newX, newY);

            if (!targetTile) continue;

            // Fox only moves to empty tiles or tiles with weaker organisms
            if (targetTile.isEmpty() || 
                (targetTile.organism instanceof Animal && 
                 targetTile.organism.strength <= this.strength)) {
                if (targetTile.organism) {
                    this.fight(targetTile.organism);
                } else {
                    this.board.moveOrganism(this, newX, newY);
                }
                return;
            }
        }
    }

    clone() {
        // Clone should use the same image as the parent
        return new Fox(this.board, this.imagePath);
    }

    /**
     * Gets the name of the organism
     * @returns {string} The display name
     */
    getName() {
        return 'Fox';
    }

    /**
     * Gets the default image path if none provided
     * @returns {string} Path to the default image
     */
    getDefaultImagePath() {
        return 'images/fox.svg';
    }
}
