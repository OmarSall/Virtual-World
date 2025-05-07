import { Player } from "./player.js";
import { Wolf } from "./species/wolf.js";
import { Sheep } from "./species/sheep.js";
import { Fox } from "./species/fox.js";
import { Turtle } from "./species/turtle.js";
import { Antelope } from "./species/antelope.js";
import { Grass } from "./species/grass.js";
import { Guarana } from "./species/guarana.js";
import { PoisonBerry } from "./species/poisonBerry.js";
import { SowThistle } from "./species/sowThistle.js";

// Keep Player class separate as it's handled differently
export const playerClass = { name: "Player", classRef: Player, image: "./images/player.svg" };

export const organismClasses = [
    { name: "Wolf", classRef: Wolf, image: "./images/wolf.svg" },
    { name: "Sheep", classRef: Sheep, image: "./images/sheep.svg" },
    { name: "Fox", classRef: Fox, image: "./images/fox.svg" },
    { name: "Turtle", classRef: Turtle, image: "./images/turtle.svg" },
    { name: "Antelope", classRef: Antelope, image: "./images/antelope.svg" },
    { name: "Grass", classRef: Grass, image: "./images/grass.svg" },
    { name: "Guarana", classRef: Guarana, image: "./images/guarana.svg" },
    { name: "PoisonBerry", classRef: PoisonBerry, image: "./images/poison-berry.svg" },
    { name: "SowThistle", classRef: SowThistle, image: "./images/sow-thistle.svg" }
];

/**
 * Creates a random organism instance
 * @param {import("./board.js").Board} board - The game board
 * @returns {import("./organism.js").Organism} A new random organism instance
 * @throws {Error} If board is invalid or organism creation fails
 */
export function getRandomOrganism(board) {
    if (!board) {
        throw new Error("Board reference is required");
    }

    const { classRef, image } = organismClasses[Math.floor(Math.random() * organismClasses.length)];
    return new classRef(board, image);
}

/**
 * Gets all available organism types
 * @returns {Array<string>} Array of organism class names
 */
export function getAvailableOrganisms() {
    return organismClasses.map(({ name }) => name);
}

/**
 * Creates a specific organism by name
 * @param {string} name - Name of the organism class
 * @param {import("./board.js").Board} board - The game board
 * @returns {import("./organism.js").Organism|null} The created organism or null if not found
 */
export function createOrganism(name, board) {
    if (!board) {
        throw new Error("Board reference is required");
    }

    const entry = organismClasses.find(({ name: n }) => n === name);
    return entry ? new entry.classRef(board, entry.image) : null;
}
