// organism.js
export class Organism {
    constructor(strength, initiative, board, icon = "?", age = 0) {
        this.strength = strength;
        this.initiative = initiative;
        this.board = board;
        this.age = age;
        this.icon = icon;
        this.alive = true;
        this.x = null;
        this.y = null;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getIcon() {
        return this.icon;
    }

    render() {
        const div = document.createElement("div");
        div.className = "organism";
        div.textContent = this.getIcon();
        return div;
    }

    action(board) {
        this.age++;
    }
}
