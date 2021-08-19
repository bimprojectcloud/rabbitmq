module.exports = {
    reporters: [
        "default",
        "jest-junit",
    ],
    projects: [
        {
            displayName: "unit",
            testPathIgnorePatterns: [
                "<rootDir>/node_modules/",
                "<rootDir>/test/",
            ],
        },
        {
            displayName: "integration",
            testPathIgnorePatterns: [
                "<rootDir>/lib/",
                "<rootDir>/node_modules/",
            ],
        },
    ],
};
