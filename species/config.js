export const ANIMAL_CONFIG = {
    Antelope: {
        STRENGTH: 4,
        INITIATIVE: 4,
        FLEE_CHANCE: 0.5
    },
    Fox: {
        STRENGTH: 3,
        INITIATIVE: 7
    },
    Sheep: {
        STRENGTH: 4,
        INITIATIVE: 4
    },
    Turtle: {
        STRENGTH: 2,
        INITIATIVE: 1,
        MOVE_CHANCE: 0.25, // 25% chance to move
        REFLECT_STRENGTH_THRESHOLD: 5
    },
    Wolf: {
        STRENGTH: 9,
        INITIATIVE: 5
    }
};

export const PLANT_CONFIG = {
    Grass: {
        STRENGTH: 0,
        INITIATIVE: 0,
        SPREAD_CHANCE: 0.1
    },
    Guarana: {
        STRENGTH: 0,
        INITIATIVE: 0,
        STRENGTH_BOOST: 3
    },
    PoisonBerry: {
        STRENGTH: 0,
        INITIATIVE: 0
        // Instant death — no extra config needed
    },
    SowThistle: {
        STRENGTH: 0,
        INITIATIVE: 0,
        SPREAD_ATTEMPTS: 3,
        SPREAD_CHANCE: 0.1 // Chance per attempt
    }
};