import { CardinalPoints, LawnSize } from "instructions/instruction.model";

export class Mower {
    private x: number;
    private y: number;
    private orientation: CardinalPoints;
    private lawnSize: LawnSize

    constructor(x: number, y: number, orientation: CardinalPoints, lawnSize: LawnSize) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.lawnSize = lawnSize;
    }

    public getPosition() {
        return { x: this.x, y: this.y, orientation: this.orientation };
    }

    public rotateLeft() {
        switch (this.orientation) {
            case CardinalPoints.N:
                this.orientation = CardinalPoints.W;
                break;
            case CardinalPoints.E:
                this.orientation = CardinalPoints.N;
                break;
            case CardinalPoints.S:
                this.orientation = CardinalPoints.E;
                break;
            case CardinalPoints.W:
                this.orientation = CardinalPoints.S;
                break;
        }
    }

    public rotateRight() {
        switch (this.orientation) {
            case CardinalPoints.N:
                this.orientation = CardinalPoints.E;
                break;
            case CardinalPoints.E:
                this.orientation = CardinalPoints.S;
                break;
            case CardinalPoints.S:
                this.orientation = CardinalPoints.W;
                break;
            case CardinalPoints.W:
                this.orientation = CardinalPoints.N;
                break;
        }
    }

    public move() {
        switch (this.orientation) {
            case CardinalPoints.N:
                this._registerMovement(this.x, this.y + 1);
                break;
            case CardinalPoints.E:
                this._registerMovement(this.x + 1, this.y);
                break;
            case CardinalPoints.S:
                this._registerMovement(this.x, this.y - 1);
                break;
            case CardinalPoints.W:
                this._registerMovement(this.x - 1, this.y);
                break;
        }
    }

    private _registerMovement(newX: number, newY: number): void {
        if (newX >= 0 && newX <= this.lawnSize.maxX && newY >= 0 && newY <= this.lawnSize.maxY) {
            this.x = newX;
            this.y = newY;
        }
    }
}
