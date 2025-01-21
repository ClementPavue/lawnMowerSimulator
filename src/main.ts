import { InstructionParser } from "instructions/instructionParser";
import { MowerController } from "mowers/mowerController";
import path from "path";

function main(argc: number, argv: string[]) {
    try {
        let instructionFilePath = "instructions";
        if (argc > 2 && typeof argv[2] === "string") {
            instructionFilePath = path.isAbsolute(argv[2]) ? argv[2] : path.join(process.cwd(), argv[2]);
        }

        console.log("Parsing instruction file...");
        const parser = new InstructionParser(instructionFilePath);
        const controller = new MowerController(parser.getMowersInstruction(), parser.getLawnSize());
        controller.executeInstructions();
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main(process.argv.length, process.argv);
