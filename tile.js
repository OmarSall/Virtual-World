export class Tile {
    constructor(x, y, div) {
        this.x = x;
        this.y = y;
        this.div = div;
        this.organism = null;
    }

    setOrganism(organism) {
        this.organism = organism;
        if (organism) {
            organism.setPosition(this.x, this.y);
            this.div.innerHTML = `<div class="organism">${organism.getIcon()}</div>`;
        } else {
            this.div.innerHTML = '';
        }
    }

    removeOrganism() {
        this.organism = null;
        this.div.innerHTML = '';
    }

    isEmpty() {
        return this.organism === null;
    }
}