import { CardinalPoints, Movements } from "instructions/instruction.model";
import { InstructionParser } from "instructions/instructionParser";
import { InstructionError } from "instructions/instructions.error";

const FIXTURE_PATH = "./src/instructions/__tests__/__fixtures__/";
describe("Instruction Parser", () => {
    test("Given instructions are parsed as expected", () => {
        const mowersInstructions = [
            {
                initialPosition: { x: 1, y: 2, orientation: CardinalPoints.N },
                movements: [
                    Movements.L,
                    Movements.F,
                    Movements.L,
                    Movements.F,
                    Movements.L,
                    Movements.F,
                    Movements.L,
                    Movements.F,
                    Movements.F,
                ],
            },
            {
                initialPosition: { x: 3, y: 3, orientation: CardinalPoints.E },
                movements: [
                    Movements.F,
                    Movements.F,
                    Movements.R,
                    Movements.F,
                    Movements.F,
                    Movements.R,
                    Movements.F,
                    Movements.R,
                    Movements.R,
                    Movements.F,
                ],
            },
        ];

        const parser = new InstructionParser("./instructions");
        expect(parser.getMowersInstruction()).toStrictEqual(mowersInstructions);
        expect(parser.getLawnSize()).toStrictEqual({maxX: 5, maxY: 5});
    });

    test("Throwing error on file not found", () => {
        try {
            new InstructionParser("./notAValidPath");
            throw new Error("Should throw error");
        } catch (e) {
            expect(e.message).toBe(InstructionError.FILE_NOT_FOUND);
        }
    });

    test("Throwing error on invalid instructions", () => {
        try {
            new InstructionParser(`${FIXTURE_PATH}invalidInstructions`);
            throw new Error("Should throw error");
        } catch (e) {
            expect(e.message).toBe(InstructionError.INVALID_FILE);
        }
    });

    test("Throwing error on incomplete instructions", () => {
        try {
            new InstructionParser(`${FIXTURE_PATH}incompleteInstructions`);
            throw new Error("Should throw error");
        } catch (e) {
            expect(e.message).toBe(InstructionError.INVALID_FILE);
        }
    });

    test("Throwing error on invalid lawn size", () => {
        try {
            new InstructionParser(`${FIXTURE_PATH}invalidLawnSize`);
            throw new Error("Should throw error");
        } catch (e) {
            expect(e.message).toBe(InstructionError.INVALID_LAWN_SIZE);
        }
    });

    test("Throwing error on invalid lawn size characters", () => {
        try {
            new InstructionParser(`${FIXTURE_PATH}invalidLawnCharacter`);
            throw new Error("Should throw error");
        } catch (e) {
            expect(e.message).toBe(InstructionError.INVALID_LAWN_SIZE);
        }
    });

    test("Throwing error on incomplete initial position", () => {
        try {
            new InstructionParser(`${FIXTURE_PATH}incompleteInitialPosition`);
            throw new Error("Should throw error");
        } catch (e) {
            expect(e.message).toBe(InstructionError.INVALID_MOWER_POSITION);
        }
    });

    test("Throwing error on wrong char in initial position", () => {
        try {
            new InstructionParser(`${FIXTURE_PATH}badCharInInitialPosition`);
            throw new Error("Should throw error");
        } catch (e) {
            expect(e.message).toBe(InstructionError.INVALID_MOWER_POSITION);
        }
    });

    test("Throwing error on wrong int in initial position", () => {
        try {
            new InstructionParser(`${FIXTURE_PATH}badIntInInitialPosition`);
            throw new Error("Should throw error");
        } catch (e) {
            expect(e.message).toBe(InstructionError.INVALID_MOWER_POSITION);
        }
    });

    test("Throwing error on mower with no instructions", () => {
        try {
            new InstructionParser(`${FIXTURE_PATH}noInstructionForMower`);
            throw new Error("Should throw error");
        } catch (e) {
            expect(e.message).toBe(InstructionError.NO_MOVEMENTS);
        }
    });

    test("Throwing error on invalid movement", () => {
        try {
            new InstructionParser(`${FIXTURE_PATH}invalidMovement`);
            throw new Error("Should throw error");
        } catch (e) {
            expect(e.message).toBe(InstructionError.INVALID_MOVEMENTS);
        }
    });
});
