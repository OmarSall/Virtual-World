import { Board } from "board.js";

window.onload = () => {
    const board = new Board(20, 20);
    board.initialize();
    board.render();

    document.getElementById("board").style.display = "grid";

    document.addEventListener("keydown", (event) => {
        const directionMap = {
            "Numpad7" : [-1, -1], "Numpad8": [0, -1], "Numpad9": [1, -1],
            "Numpad4": [-1, 0],  "Numpad5": [0, 0],  "Numpad6": [1, 0],
            "Numpad1": [-1, 1],  "Numpad2": [0, 1],  "Numpad3": [1, 1],
        };

        if (directionMap[event.code]) {
            board.handlePlayerTurn(directionMap[event.code]);
        }
    });
};



