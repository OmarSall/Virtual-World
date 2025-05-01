import { Organism } from "./organism.js";

export class Animal extends Organism {
    constructor(strength, initiative, board) {
        super(strength, initiative, board);
        
    }

    // Default move behavior (random direction)
    move() {
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
                return;
            } else if (targetTile.organism instanceof Animal) {
                if (targetTile.organism.strength <= this.strength) {
                    this.fight(targetTile.organism);
                    return;
                }
            }
        }
        // If no move possible, stay put
    }

    fight(other) {
        const myTile = this.board.getTile(this.x, this.y);
        const otherTile = this.board.getTile(other.x, other.y);

        if (this.strength >= other.strength) {
            other.alive = false;
            otherTile.removeOrganism();
            this.board.moveOrganism(this, other.x, other.y);
        } else {
            this.alive = false;
            myTile.removeOrganism();
        }
    }

    mate() {
        const adjacentTiles = [
            { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
            { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
            { dx: -1, dy: 1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 1 }
        ];

        for (let dir of adjacentTiles) {
            const newX = this.x + dir.dx;
            const newY = this.y + dir.dy;
            const targetTile = this.board.getTile(newX, newY);

            if (targetTile && targetTile.isEmpty()) {
                const offspring = this.clone();
                targetTile.setOrganism(offspring);
                return; // Only one offspring per turn
            }
        }
    }

    clone() {
        return new Animal(this.strength, this.initiative, this.board);
    }

    action() {
        this.move();
        this.mate();
    }
}
