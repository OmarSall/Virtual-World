export class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.organism = null;

        this.element = document.createElement("div");
        this.element.className = "tile";
        this.element.dataset.x = x;
        this.element.dataset.y = y;
    }

    setOrganism(organism) {
        this.organism = organism;
        if (organism) {
            organism.setPosition(this.x, this.y);
        }
        this.refresh();
    }

    removeOrganism() {
        this.organism = null;
        this.refresh();
    }

    isEmpty() {
        return this.organism === null;
    }

    refresh() {
        this.element.innerHTML = '';
        if (this.organism) {
            this.element.appendChild(this.organism.render());
        }
    }
}