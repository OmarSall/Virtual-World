// organismCreation.js
import { Wolf } from "./species/wolf.js";
import { Sheep } from "./species/sheep.js";
import { Fox } from "./species/fox.js";
import { Turtle } from "./species/turtle.js";
import { Antelope } from "./species/antelope.js";
import { Grass } from "./species/grass.js";
import { Guarana } from "./species/guarana.js";
import { PoisonBerry } from "./species/poisonBerry.js";
import { SowThistle } from "./species/sowThistle.js";

/**
 * Array of available organism classes for random generation
 * @type {Array<typeof import("./organism.js").Organism>}
 */
const organismClasses = [
    Wolf, Sheep, Fox, Turtle, Antelope,
    Grass, Guarana, PoisonBerry, SowThistle
];

/**
 * Creates a random organism instance
 * @param {import("./board.js").Board} board - The game board
 * @returns {import("./organism.js").Organism} A new random organism instance
 * @throws {Error} If board is invalid or organism creation fails
 */
export function getRandomOrganism(board) {
    try {
        if (!board) {
            throw new Error('Board reference is required');
        }

        const OrgClass = organismClasses[Math.floor(Math.random() * organismClasses.length)];
        return new OrgClass(board);
    } catch (error) {
        console.error('Error creating random organism:', error);
        throw error;
    }
}

/**
 * Gets all available organism types
 * @returns {Array<string>} Array of organism class names
 */
export function getAvailableOrganisms() {
    return organismClasses.map(OrgClass => OrgClass.name);
}

/**
 * Creates a specific organism by name
 * @param {string} name - Name of the organism class
 * @param {import("./board.js").Board} board - The game board
 * @returns {import("./organism.js").Organism|null} The created organism or null if not found
 */
export function createOrganism(name, board) {
    try {
        if (!board) {
            throw new Error("Board reference is required");
        }

        const OrgClass = organismClasses.find(cls => cls.name === name);
        return OrgClass ? new OrgClass(board) : null;
    } catch (error) {
        console.error(`Error creating ${name}:`, error);
        return null;
    }
}
