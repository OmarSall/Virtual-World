/**
 * Represents a single tile on the game board
 */
export class Tile {
    /**
     * Creates a new tile
     * @param {number} x - X coordinate on the board
     * @param {number} y - Y coordinate on the board
     * @throws {Error} If coordinates are invalid
     */
    constructor(x, y) {
        try {
            if (typeof x !== 'number' || typeof y !== 'number') {
                throw new Error('Coordinates must be numbers');
            }
            if (x < 0 || y < 0) {
                throw new Error('Coordinates cannot be negative');
            }

            this.x = x;
            this.y = y;
            this.organism = null;

            this.element = document.createElement("div");
            this.element.className = "tile";
            this.element.dataset.x = x;
            this.element.dataset.y = y;
        } catch (error) {
            console.error('Error creating tile:', error);
            throw error;
        }
    }

    /**
     * Places an organism on this tile
     * @param {Organism|null} organism - The organism to place, or null to clear
     * @throws {Error} If organism position update fails
     */
    setOrganism(organism) {
        try {
            this.organism = organism;
            if (organism) {
                organism.setPosition(this.x, this.y);
            }
            this.refresh();
        } catch (error) {
            console.error('Error setting organism:', error);
            throw error;
        }
    }

    /**
     * Removes any organism from this tile
     */
    removeOrganism() {
        try {
            this.organism = null;
            this.refresh();
        } catch (error) {
            console.error('Error removing organism:', error);
        }
    }

    /**
     * Checks if the tile has no organism
     * @returns {boolean} True if the tile is empty
     */
    isEmpty() {
        return this.organism === null;
    }

    /**
     * Updates the tile's visual representation
     */
    refresh() {
        try {
            this.element.innerHTML = '';
            if (this.organism) {
                this.element.appendChild(this.organism.render());
            }
        } catch (error) {
            console.error('Error refreshing tile:', error);
        }
    }

    /**
     * Gets the tile's coordinates
     * @returns {{x: number, y: number}} The tile's coordinates
     */
    getPosition() {
        return { x: this.x, y: this.y };
    }

    /**
     * Gets the tile's DOM element
     * @returns {HTMLDivElement} The tile's DOM element
     */
    getElement() {
        return this.element;
    }
}
