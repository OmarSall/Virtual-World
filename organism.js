// organism.js
export class Organism {
    /**
     * Creates a new organism
     * @param {number} strength - The organism's strength in combat
     * @param {number} initiative - The organism's turn priority
     * @param {Board} board - Reference to the game board
     * @param {string} imagePath - Path to the organism's image
     * @param {number} age - Starting age of the organism
     */
    constructor(strength, initiative, board, imagePath = null, age = 0) {
        if (!board) {
            throw new Error("Board reference is required");
        }
        if (typeof strength !== "number" || typeof initiative !== "number") {
            throw new Error("Strength and initiative must be numbers");
        }

        this.strength = strength;
        this.initiative = initiative;
        this.board = board;
        this.age = age;
        this.imagePath = imagePath;
        this.alive = true;
        this.x = null;
        this.y = null;
    }

    /**
     * Sets the organism's position on the board
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    setPosition(x, y) {
        if (typeof x !== "number" || typeof y !== "number") {
            throw new Error("Coordinates must be numbers");
        }
        if (x < 0 || y < 0) {
            throw new Error("Coordinates cannot be negative");
        }
        this.x = x;
        this.y = y;
    }

    /**
     * Gets the name of the organism's class
     * @returns {string} Class name
     */
    getName() {
        return this.constructor.name;
    }

    /**
     * Creates a DOM element to represent the organism
     * @returns {HTMLDivElement} The DOM element
     */
    render() {
        try {
            const div = document.createElement("div");
            div.className = "organism";
            
            if (this.imagePath) {
                console.log(`Attempting to render ${this.getName()} with image path: ${this.imagePath}`);
                const img = document.createElement("img");
                img.src = this.imagePath;  // Use the provided path as-is
                img.alt = this.getName();
                
                // Add onload handler to confirm successful loading
                img.onload = () => {
                    console.log(`✅ Image loaded successfully for ${this.getName()}: ${this.imagePath}`);
                };
                
                // Enhanced error handling with detailed logging
                img.onerror = () => {
                    console.error(`❌ Failed to load image for ${this.getName()}: ${this.imagePath}`);
                    console.log(`💡 Debug info for ${this.getName()}:`);
                    console.log(`   - Class name: ${this.constructor.name}`);
                    console.log(`   - Current path: ${this.imagePath}`);
                    console.log(`   - Window location: ${window.location.href}`);
                    console.log('Attempting to load image with absolute path...');
                    
                    // Try with absolute path (remove any existing ./ prefix)
                    const cleanPath = this.imagePath.replace(/^\.\//, '');
                    const absolutePath = window.location.origin + '/' + cleanPath;
                    console.log(`   - Trying absolute path: ${absolutePath}`);
                    img.src = absolutePath;
                    
                    // If absolute path also fails, fall back to text
                    img.onerror = () => {
                        console.error(`❌ Failed to load image with absolute path for ${this.getName()}: ${absolutePath}`);
                        console.log(`⚠️ Falling back to text representation for ${this.getName()}`);
                        div.textContent = this.getName().charAt(0);
                    };
                };
                
                div.appendChild(img);
            } else {
                console.warn(`No image path provided for ${this.getName()}`);
                div.textContent = this.getName().charAt(0);
            }
            
            return div;
        } catch (error) {
            console.error("Error rendering organism:", error);
            const fallback = document.createElement("div");
            fallback.className = "organism";
            fallback.textContent = "?";
            return fallback;
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
}
