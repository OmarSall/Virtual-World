/**
 * Base class for all organisms in the game
 */
export class Organism {
    /**
     * Creates a new organism
     * @param {number} strength - The organism's strength in combat
     * @param {number} initiative - The organism's turn priority
     * @param {Board} board - Reference to the game board
     * @param {string} [icon="?"] - Visual representation of the organism
     * @param {number} [age=0] - Starting age of the organism
     * @throws {Error} If board is missing or parameters are invalid
     */
    constructor(strength, initiative, board, icon = "?", age = 0) {
        if (!board) {
            throw new Error('Board reference is required');
        }
        if (typeof strength !== 'number' || typeof initiative !== 'number') {
            throw new Error('Strength and initiative must be numbers');
        }

        this.strength = strength;
        this.initiative = initiative;
        this.board = board;
        this.age = age;
        this.icon = icon;
        this.alive = true;
        this.x = null;
        this.y = null;
    }

    /**
     * Sets the organism's position on the board
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @throws {Error} If coordinates are invalid
     */
    setPosition(x, y) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw new Error('Coordinates must be numbers');
        }
        if (x < 0 || y < 0) {
            throw new Error('Coordinates cannot be negative');
        }
        this.x = x;
        this.y = y;
    }

    /**
     * Gets the organism's visual representation
     * @returns {string} The icon representing this organism
     */
    getIcon() {
        return this.icon;
    }

    /**
     * Creates a DOM element to represent the organism
     * @returns {HTMLDivElement} The DOM element representing this organism
     * @throws {Error} If there's an error creating the element
     */
    render() {
        try {
            const div = document.createElement("div");
            div.className = "organism";
            div.textContent = this.getIcon();
            return div;
        } catch (error) {
            console.error('Error rendering organism:', error);
            throw error;
        }
    }

    /**
     * Performs the organism's turn action
     * Increments age if organism is alive
     */
    action() {
        if (this.alive) {
            this.age++;
        }
    }

    /**
     * Checks if the organism is at a valid position
     * @returns {boolean} True if the organism has valid coordinates
     */
    hasValidPosition() {
        return typeof this.x === 'number' && 
               typeof this.y === 'number' && 
               this.x >= 0 && 
               this.y >= 0;
    }

    /**
     * Gets the organism's current position
     * @returns {{x: number, y: number}|null} The coordinates or null if position not set
     */
    getPosition() {
        return this.hasValidPosition() ? { x: this.x, y: this.y } : null;
    }
}
