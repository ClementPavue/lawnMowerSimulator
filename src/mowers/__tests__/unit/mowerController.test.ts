import { CardinalPoints, Movements } from "instructions/instruction.model";
import { MowerController } from "mowers/mowerController";

describe('MowerController', () => {
    test("Given instructions behave as expected", () => {
        const maxLawnSize = [5, 5];
        const mowersInstructions = [
            {
                initialPosition: { x: 1, y: 2, orientation: CardinalPoints.N },
                movements: [Movements.L, Movements.F, Movements.L, Movements.F, Movements.L, Movements.F, Movements.L, Movements.F, Movements.F],
            },
            {
                initialPosition: { x: 3, y: 3, orientation: CardinalPoints.E },
                movements: [Movements.F, Movements.F, Movements.R, Movements.F, Movements.F, Movements.R, Movements.F, Movements.R, Movements.R, Movements.F],
            },
        ];
        const controller = new MowerController(mowersInstructions, maxLawnSize);
        controller.executeInstructions();

        const mowers = controller.getMowers();
        expect(mowers[0].getPosition()).toEqual({ x: 1, y: 3, orientation: CardinalPoints.N });
        expect(mowers[1].getPosition()).toEqual({ x: 5, y: 1, orientation: CardinalPoints.E });
    });

    test("Negative X coordinates are not allowed", () => {
        const maxLawnSize = [5, 5];
        const mowersInstructions = [
            {
                initialPosition: { x: 0, y: 0, orientation: CardinalPoints.N },
                movements: [Movements.L, Movements.F, Movements.F, Movements.F, Movements.F, Movements.F, Movements.F],
            },
        ];
        const controller = new MowerController(mowersInstructions, maxLawnSize);
        controller.executeInstructions();

        const mowers = controller.getMowers();
        expect(mowers[0].getPosition()).toEqual({ x: 0, y: 0, orientation: CardinalPoints.W });
    });

    test("Negative Y coordinates are not allowed", () => {
        const maxLawnSize = [5, 5];
        const mowersInstructions = [
            {
                initialPosition: { x: 0, y: 0, orientation: CardinalPoints.N },
                movements: [Movements.L, Movements.L, Movements.F, Movements.F, Movements.F, Movements.F, Movements.F, Movements.F],
            },
        ];
        const controller = new MowerController(mowersInstructions, maxLawnSize);
        controller.executeInstructions();

        const mowers = controller.getMowers();
        expect(mowers[0].getPosition()).toEqual({ x: 0, y: 0, orientation: CardinalPoints.S });
    });

    test("X coordinates outside of the lawn are not allowed", () => {
        const maxLawnSize = [5, 5];
        const mowersInstructions = [
            {
                initialPosition: { x: maxLawnSize[0], y: maxLawnSize[1], orientation: CardinalPoints.N },
                movements: [Movements.F, Movements.F, Movements.F, Movements.F, Movements.F, Movements.F],
            },
        ];
        const controller = new MowerController(mowersInstructions, maxLawnSize);
        controller.executeInstructions();

        const mowers = controller.getMowers();
        expect(mowers[0].getPosition()).toEqual({ x: maxLawnSize[0], y: maxLawnSize[1], orientation: CardinalPoints.N });
    });

    test("Y coordinates outside of the lawn are not allowed", () => {
        const maxLawnSize = [5, 5];
        const mowersInstructions = [
            {
                initialPosition: { x: maxLawnSize[0], y: maxLawnSize[1], orientation: CardinalPoints.N },
                movements: [Movements.R, Movements.F, Movements.F, Movements.F, Movements.F, Movements.F, Movements.F],
            },
        ];
        const controller = new MowerController(mowersInstructions, maxLawnSize);
        controller.executeInstructions();

        const mowers = controller.getMowers();
        expect(mowers[0].getPosition()).toEqual({ x: maxLawnSize[0], y: maxLawnSize[1], orientation: CardinalPoints.E });
    });
});
