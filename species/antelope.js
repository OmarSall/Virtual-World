import { Animal } from "../animal.js";

export class Antelope extends Animal {
    constructor(board) {
        super(4, 4, board);
    }

    getIcon() {
        return 'A';
    }

    // Override move to have double range movement
    move() {
        const directions = [
            { dx: -2, dy: -2 }, { dx: -1, dy: -2 }, { dx: 0, dy: -2 }, { dx: 1, dy: -2 }, { dx: 2, dy: -2 },
            { dx: -2, dy: -1 }, { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 }, { dx: 2, dy: -1 },
            { dx: -2, dy: 0 },  { dx: -1, dy: 0 },  { dx: 1, dy: 0 },  { dx: 2, dy: 0 },
            { dx: -2, dy: 1 },  { dx: -1, dy: 1 },  { dx: 0, dy: 1 },  { dx: 1, dy: 1 },  { dx: 2, dy: 1 },
            { dx: -2, dy: 2 },  { dx: -1, dy: 2 },  { dx: 0, dy: 2 },  { dx: 1, dy: 2 },  { dx: 2, dy: 2 }
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

    action() {
        // 50% chance to flee (move), else stay put
        if (Math.random() < 0.5) {
            this.move();
        }
        this.mate();
    }

    clone() {
        return new Antelope(this.board);
    }
}
