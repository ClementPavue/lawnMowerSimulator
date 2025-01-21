export interface MowerInstructions {
    initialPosition: {x: number, y: number, orientation: CardinalPoints};
    movements: Movements[];
}

export enum CardinalPoints {
    N = "N",
    E = "E",
    S = "S",
    W = "W"
}

export enum Movements {
    L = "L",
    R = "R",
    F = "F"
}