// board.js
// Board class handles the grid, turn order, and interactions
import { Tile } from "./tile.js";
import { Player } from "player.js";
import { getRandomOrganism } from "organismCreation.js";

export class Board {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.organisms = [];
        this.turnCount = 0;
    }

    initialize() {

    }
}




// document.addEventListener("keydown", (event) => {
    // const directionMap = {
    //     "Numpad7" : [-1, -1], "Numpad8": [0, -1], "Numpad9": [1, -1],
    //     "Numpad4": [-1, 0],  "Numpad5": [0, 0],  "Numpad6": [1, 0],
    //     "Numpad1": [-1, 1],  "Numpad2": [0, 1],  "Numpad3": [1, 1],
    // };