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

const organismClasses = [
    Wolf, Sheep, Fox, Turtle, Antelope,
    Grass, Guarana, PoisonBerry, SowThistle
];

export function getRandomOrganism() {
    const OrgClass = organismClasses[Math.floor(Math.random() * organismClasses.length)];
    return new OrgClass();
}
