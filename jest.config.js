const fs = require("fs");

/** @type {Partial<import('@jest/types').Config.ProjectConfig>} */
const commonProjectsConfig = {
    moduleDirectories: ["node_modules"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "mjs", "cjs", "node"],
    moduleNameMapper: fs.readdirSync("./src/", { withFileTypes: true }).reduce((map, file) => {
        if (file.isDirectory()) {
            map[`^${file.name}/(.*)$`] = `<rootDir>/src/${file.name}/$1`;
        } else if (["ts", "tsx", "js", "jsx", "json", "mjs", "cjs", "node"].find(item => file.name.endsWith(`.${item}`))) {
            const fileName = file.name.slice(0, file.name.lastIndexOf("."));
            map[`^${fileName}$`] = `<rootDir>/src/${fileName}`;
        }
        return map;
    }, Object.create(null)),
    rootDir: "./",
    roots: ["<rootDir>/", "<rootDir>/src/"],
    testEnvironment: "node",
    testPathIgnorePatterns: [".husky/", ".vscode/", "dist/", "coverage/", "node_modules/"],
    // The following is now automatically handled by babel-jest since a babel config file exists
    // transform: {
    //     "^.+\\.[tj]sx?$": [
    //         "ts-jest/legacy",
    //         {
    //             tsconfig: "./tsconfig.json",
    //             isolatedModules: true,
    //             compiler: "typescript",
    //             babelConfig: { retainLines: true, sourceMaps: "inline" },
    //         },
    //     ],
    // },
    transformIgnorePatterns: [],
};

/** @type {Omit<import('@jest/types').Config.GlobalConfig, "projects"> & { projects: Array<import('@jest/types').Config.ProjectConfig> }} */
module.exports = {
    maxWorkers: 3,
    projects: [
        {
            displayName: "unit",
            testMatch: ["<rootDir>/src/**/__tests__/**/unit/**/*.(spec|test).[tj]s?(x)"],
        }
    ].map(obj => ({ ...commonProjectsConfig, ...obj })),
    cache: false,
    forceExit: true,
    passWithNoTests: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{js,jsx,ts,tsx}",
        "!**/node_modules/**",
        "!**/.husky/**",
        "!**/.vscode/**",
        "!**/dist/**",
        "!**/coverage/**",
        "!**/__tests__/**",
        "!**/__mocks__/**",
        "!jest.config.js",
        "!babel.config.js"
    ],
    coverageDirectory: "<rootDir>/coverage",
    verbose: true,
};
