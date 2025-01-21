import * as fs from "fs";
import { CardinalPoints, Movements, MowerInstructions } from "./instruction.model";
import { InstructionError } from "./instructions.error";

const INTEGER_REGEX = /^[0-9]$/;
const CARDINAL_REGEX = /^[NESW]$/;
const MOVEMENT_REGEX = /^[LRF]$/;

export class InstructionParser {
  private filepath: string;

  private lawnSize: number[];
  private mowersInstruction: MowerInstructions[];
  constructor(filepath: string) {
    this.filepath = filepath;
    this.mowersInstruction = [];
    this._parseFile();
  }

  private _readFile() {
    if (!fs.existsSync(this.filepath)) {
      throw new Error(InstructionError.FILE_NOT_FOUND);
    }
    return fs.readFileSync(this.filepath);
  }

  private _parseFile() {
    const instructions = this._readFile().toString().split("\n");

    if (instructions.length < 3 || instructions.length % 2 !== 1) {
      throw new Error(InstructionError.INVALID_FILE);
    }

    this._parseLawnSize(instructions[0]);
    for (let i = 1; i < instructions.length; i += 2) {
      this.mowersInstruction.push(
        this._parseMowerInstructions(instructions.slice(i, i + 2))
      );
    }
  }

  private _parseLawnSize(instruction: string) {
    const rawLawnSize = instruction.split(" ");
    if (rawLawnSize.length !== 2) {
      throw new Error(InstructionError.INVALID_LAWN_SIZE);
    }

    if(rawLawnSize.some(s => !s.match(INTEGER_REGEX))){
        throw new Error(InstructionError.INVALID_LAWN_SIZE);
    }

    this.lawnSize = rawLawnSize.map(s => parseInt(s));
  }

  private _parseMowerInstructions(rawInstructions: string[]) {
    const rawInitialPosition = rawInstructions[0].split(" ");
    if (rawInitialPosition.length !== 3) {
      throw new Error(InstructionError.INVALID_MOWER_POSITION);
    }

    if (
      !rawInitialPosition[0].match(INTEGER_REGEX) ||
      !rawInitialPosition[1].match(INTEGER_REGEX) ||
      !rawInitialPosition[2].match(CARDINAL_REGEX)
    ) {
      throw new Error(InstructionError.INVALID_MOWER_POSITION);
    }

    const rawMovements = rawInstructions[1].split("");

    if(rawMovements.length === 0){
        throw new Error(InstructionError.NO_MOVEMENTS);
    }

    if(rawMovements.some(movement => !movement.match(MOVEMENT_REGEX))){
        throw new Error(InstructionError.INVALID_MOVEMENTS);
    }
    return {
      initialPosition: {
        x: parseInt(rawInitialPosition[0]),
        y: parseInt(rawInitialPosition[1]),
        orientation: CardinalPoints[rawInitialPosition[2]],
      },
      movements: rawMovements.map(movement => Movements[movement]),
    };
  }

  public getLawnSize() {
    return this.lawnSize;
  }

  public getMowersInstruction() {
    return this.mowersInstruction;
  }
}
