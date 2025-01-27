module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current",
                },
            },
        ],
        "@babel/preset-typescript",
        [
            "@babel/preset-react",
            {
                runtime: "automatic",
            },
        ],
    ],
    plugins: [
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-syntax-import-assertions", { deprecatedImportAssert: true }],
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
};