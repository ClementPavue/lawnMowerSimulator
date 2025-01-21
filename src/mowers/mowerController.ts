import { LawnSize, Movements, MowerInstructions } from "instructions/instruction.model";
import { Mower } from "./mower";

export class MowerController {
    private mowersInstructions: MowerInstructions[];
    private mowers: Mower[];

    constructor(mowersInstructions: MowerInstructions[], lawnSize: LawnSize) {
        this.mowersInstructions = mowersInstructions;
        this.mowers = mowersInstructions.map(
            mowerInstructions =>
                new Mower(
                    mowerInstructions.initialPosition.x,
                    mowerInstructions.initialPosition.y,
                    mowerInstructions.initialPosition.orientation,
                    lawnSize
                )
        );
    }

    executeInstructions(): void {
        console.log(`${this.mowersInstructions.length} mowers to move`);
        this.mowersInstructions.forEach((mowerInstructions, index) => {
            const mower = this.mowers[index];
            mowerInstructions.movements.forEach(movement => {
                switch (movement) {
                    case Movements.L:
                        mower.rotateLeft();
                        break;
                    case Movements.R:
                        mower.rotateRight();
                        break;
                    case Movements.F:
                        mower.move();
                        break;
                }
            });
            const finalPosition = mower.getPosition();
            console.log(
                `Mower ${index + 1} final position: ${finalPosition.x} ${finalPosition.y} ${finalPosition.orientation}`
            );
        });
    }

    getMowers() {
        return this.mowers;
    }
}
