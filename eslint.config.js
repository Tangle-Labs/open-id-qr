const eslintPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = {
    plugins: { "@typescript-eslint": eslintPlugin },
    ignores: ["dist/**/*", "jest.config.js", "src/scripts/generate-docs.js"],
};
