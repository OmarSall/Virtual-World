//animal.js
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

        const direction = directions[Math.floor(Math.random() * directions.length)];

        const newX = this.x + direction.dx;
        const newY = this.y + direction.dy;

        const targetTile = this.board.getTile(newX, newY);

        if (targetTile && targetTile.isEmpty()) {
            this.board.getTile(this.x, this.y).removeOrganism();
            targetTile.setOrganism(this);
        }

        // Default figh behavior - stronger wins

    }

    fight(other) {
        if (this.strength > other.strength) {
            this.board.getTile(other.x, other.y).removeOrganism();
        } else if (this.strength < other.strength) {
            this.board.getTile(this.x, this.y).removeOrganism();
        }
        // If equal, nothing happens
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
                // Mate: Create a new offspring of the same type
                const offspring = this.clone();
                targetTile.setOrganism(offspring);
                return; // Only one offspring per turn
            }
        }
    }

    clone() {
        return new Animal(this.strength, this.initiative, this.board);
    }

    // action method, called each turn
    action() {
        this.move();
        this.mate();
    }
}