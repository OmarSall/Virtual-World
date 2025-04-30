//organism.js
export class Organism {
    constructor(strength, initiative, board, age = 0) {
        this.strength = strength;
        this.initiative = initiative;
        this.age = age;
        this.board = board;
        this.x = null;
        this.y = null;
    }

    setPostition(x, y) {
        this.x = x;
        this.y = y;
    }

    incrementAge() {
        this.age++;
    }

    action() {
        // overridden in subclasses
    }

    getIcon() {
        return "?"; // default icon
    }
}